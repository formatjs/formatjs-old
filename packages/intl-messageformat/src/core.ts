/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

import { parse, isArgumentElement, MessageFormatElement, isLiteralElement, isDateElement, isTimeElement, isNumberElement, isSelectElement, isPluralElement } from 'intl-messageformat-parser';


export interface Formats {
  number: Record<string, Intl.NumberFormatOptions>;
  date: Record<string, Intl.DateTimeFormatOptions>;
  time: Record<string, Intl.DateTimeFormatOptions>;
}

export interface Formatters {
  getNumberFormat(
    ...args: ConstructorParameters<typeof Intl.NumberFormat>
  ): Intl.NumberFormat;
  getDateTimeFormat(
    ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
  ): Intl.DateTimeFormat;
  getPluralRules(
    ...args: ConstructorParameters<typeof Intl.PluralRules>
  ): Intl.PluralRules;
}

// -- MessageFormat --------------------------------------------------------

function resolveLocale(locales: string | string[]): string {
  if (typeof locales === 'string') {
    locales = [locales];
  }
  try {
    return Intl.NumberFormat.supportedLocalesOf(locales, {
      // IE11 localeMatcher `lookup` seems to convert `en` -> `en-US`
      // but not other browsers,
      localeMatcher: 'best fit'
    })[0];
  } catch (e) {
    return IntlMessageFormat.defaultLocale;
  }
}

function formatPatterns(
  els: MessageFormatElement[],
  locales: string | string[],
  formatters: Formatters,
  formats: Formats,
  values?: Record<string, string | number | boolean | null | undefined>,
  // For debugging
  originalMessage?: string
): string {
  let result = '';
  for (const el of els) {
    // Exist early for string parts.
    if (isLiteralElement(el)) {
      result += el.value;
      continue;
    }
    const { value: varName } = el;

    // Enforce that all required values are provided by the caller.
    if (!(values && varName in values)) {
      throw new FormatError(`The intl string context variable '${varName}' was not provided to the string '${originalMessage}'`);
    }

    const value = values[varName];
    if (isArgumentElement(el)) {
      result += typeof value === 'string' || typeof value === 'number' ? value : ''
      continue;
    }

    // Recursively format plural and select parts' option — which can be a
    // nested pattern structure. The choosing of the option to use is
    // abstracted-by and delegated-to the part helper object.
    if (isDateElement(el)) {
      const style = el.style ? formats.date[el.style] : undefined
      result += formatters.getDateTimeFormat(locales, style).format(value as number)
      continue;
    }
    
    if (isTimeElement(el)) {
      const style = el.style ? formats.time[el.style] : undefined
      result += formatters.getDateTimeFormat(locales, style).format(value as number)
      continue;
    }
    
    if (isNumberElement(el)) {
      const style = el.style ? formats.number[el.style] : undefined
      result += formatters.getNumberFormat(locales, style).format(value as number)
      continue;
    } 
    
    if (isSelectElement(el)) {
      const opt = el.options.find(opt => opt.id === value) || el.options.find(opt => opt.id === 'other')
      if (!opt) {
        throw new RangeError(`Invalid values for "${el.value}": "${value}". Options are "${el.options.map(opt => opt.id).join('", "')}"`)
      }
      result += formatPatterns(opt.value, locales, formatters, formats, values)
      continue;
    } 

    if (isPluralElement(el)) {
      const rule = formatters.getPluralRules(locales, { type: el.pluralType }).select((value as number) - (el.offset || 0))
      const opt = el.options.find(opt => opt.id === `=${value}` || opt.id === rule) || el.options.find(opt => opt.id === 'other')
      if (!opt) {
        throw new RangeError(`Invalid values for "${el.value}": "${value}". Options are "${el.options.map(opt => opt.id).join('", "')}"`)
      }
      result += formatPatterns(opt.value, locales, formatters, formats, values)
      continue;
    }

    throw new Error(`Unsupported Message Format AST Element ${JSON.stringify(el)}`)
  }

  return result;
}

function mergeConfig(c1: Record<string, object>, c2?: Record<string, object>) {
  if (!c2) {
    return c1;
  }
  return {
    ...(c1 || {}),
    ...(c2 || {}),
    ...Object.keys(c1).reduce((all: Record<string, object>, k) => {
      all[k] = {
        ...c1[k],
        ...(c2[k] || {})
      };
      return all;
    }, {})
  };
}

function mergeConfigs(
  defaultConfig: Formats,
  configs?: Partial<Formats>
): Formats {
  if (!configs) {
    return defaultConfig;
  }

  return (Object.keys(defaultConfig) as Array<keyof Formats>).reduce(
    (all: Formats, k: keyof Formats) => {
      all[k] = mergeConfig(defaultConfig[k], configs[k]);
      return all;
    },
    { ...defaultConfig }
  );
}

class FormatError extends Error {
  public readonly variableId?: string;
  constructor(msg?: string, variableId?: string) {
    super(msg);
    this.variableId = variableId;
  }
}

export interface Options {
  formatters?: Formatters;
}

export function createDefaultFormatters(): Formatters {
  return {
    getNumberFormat(...args) {
      return new Intl.NumberFormat(...args);
    },
    getDateTimeFormat(...args) {
      return new Intl.DateTimeFormat(...args);
    },
    getPluralRules(...args) {
      return new Intl.PluralRules(...args);
    }
  };
}

export class IntlMessageFormat {
  private readonly ast: MessageFormatElement[];
  private readonly locale: string;
  private readonly formatters: Formatters
  private readonly formats: Formats
  private readonly message: string | undefined
  constructor(
    message: string | MessageFormatElement[],
    locales: string | string[] = IntlMessageFormat.defaultLocale,
    overrideFormats?: Partial<Formats>,
    opts?: Options
  ) {
    if (typeof message === 'string') {
      this.message = message
      if (!IntlMessageFormat.__parse) {
        throw new TypeError(
          'IntlMessageFormat.__parse must be set to process `message` of type `string`'
        );
      }
      // Parse string messages into an AST.
      this.ast = IntlMessageFormat.__parse(message);
    } else {
      this.ast = message;
    }

    if (!Array.isArray(this.ast)) {
      throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    this.formats = mergeConfigs(IntlMessageFormat.formats, overrideFormats);

    // Defined first because it's used to build the format pattern.
    this.locale = resolveLocale(locales || []);

    this.formatters = (opts && opts.formatters) || createDefaultFormatters();
  }

  format = (
    values?: Record<string, string | number | boolean | null | undefined>
  ) => {
    return formatPatterns(this.ast, this.locale, this.formatters, this.formats, values, this.message);
  };
  resolvedOptions() {
    return { locale: this.locale };
  }
  getAst() {
    return this.ast;
  }
  static defaultLocale = 'en';
  static __parse: typeof parse | undefined = undefined;
  // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.
  static formats = {
    number: {
      currency: {
        style: 'currency'
      },

      percent: {
        style: 'percent'
      }
    },

    date: {
      short: {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
      },

      medium: {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      },

      long: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      },

      full: {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
    },

    time: {
      short: {
        hour: 'numeric',
        minute: 'numeric'
      },

      medium: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },

      long: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      },

      full: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      }
    }
  };
}

export default IntlMessageFormat;
