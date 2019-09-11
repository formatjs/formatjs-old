/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

const LONG = 'long';
const SHORT = 'short';
const NARROW = 'narrow';
const NUMERIC = 'numeric';
const TWODIGIT = '2-digit';

import {
  parse,
  isArgumentElement,
  MessageFormatElement,
  isLiteralElement,
  isDateElement,
  isTimeElement,
  isNumberElement,
  isSelectElement,
  isPluralElement,
} from 'intl-messageformat-parser';
import memoizeIntlConstructor from 'intl-format-cache';
import {
  FormatterCache,
  Formatters,
  Formats,
  formatToString,
  formatToParts,
  FormatXMLElementFn,
  formatHTMLMessage,
  PrimitiveType,
} from './formatters';

// -- MessageFormat --------------------------------------------------------

function resolveLocale(locales: string | string[]): string {
  if (typeof locales === 'string') {
    locales = [locales];
  }
  try {
    return Intl.NumberFormat.supportedLocalesOf(locales, {
      // IE11 localeMatcher `lookup` seems to convert `en` -> `en-US`
      // but not other browsers,
      localeMatcher: 'best fit',
    })[0];
  } catch (e) {
    return IntlMessageFormat.defaultLocale;
  }
}

// TODO(skeleton): add skeleton support
function prewarmFormatters(
  els: MessageFormatElement[],
  locales: string | string[],
  formatters: Formatters,
  formats: Formats
) {
  els
    .filter(el => !isArgumentElement(el) && !isLiteralElement(el))
    .forEach(el => {
      // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.
      if (isDateElement(el)) {
        const style =
          typeof el.style === 'string'
            ? formats.date[el.style] ||
              IntlMessageFormat.patterns.parseDatePattern(el.style)
            : formats.date.default;
        formatters.getDateTimeFormat(locales, style);
      }
      if (isTimeElement(el)) {
        const style =
          typeof el.style === 'string'
            ? formats.time[el.style] ||
              IntlMessageFormat.patterns.parseDatePattern(el.style)
            : formats.time.default;

        formatters.getDateTimeFormat(locales, style);
      }
      if (isNumberElement(el)) {
        const style =
          typeof el.style === 'string'
            ? formats.number[el.style]
            : // || formats.parseNumberPattern(el.style)
              formats.number.default;
        formatters.getNumberFormat(locales, style);
      }
      if (isSelectElement(el)) {
        Object.keys(el.options).forEach(id =>
          prewarmFormatters(el.options[id].value, locales, formatters, formats)
        );
      }
      if (isPluralElement(el)) {
        formatters.getPluralRules(locales, {type: el.pluralType});
        Object.keys(el.options).forEach(id =>
          prewarmFormatters(el.options[id].value, locales, formatters, formats)
        );
      }
    });
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
        ...(c2[k] || {}),
      };
      return all;
    }, {}),
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
    {...defaultConfig}
  );
}

export interface Options {
  formatters?: Formatters;
}

export function createDefaultFormatters(
  cache: FormatterCache = {
    number: {},
    dateTime: {},
    pluralRules: {},
  }
): Formatters {
  return {
    getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat, cache.number),
    getDateTimeFormat: memoizeIntlConstructor(
      Intl.DateTimeFormat,
      cache.dateTime
    ),
    getPluralRules: memoizeIntlConstructor(Intl.PluralRules, cache.pluralRules),
  };
}

export class IntlMessageFormat {
  private readonly ast: MessageFormatElement[];
  private readonly locale: string;
  private readonly formatters: Formatters;
  private readonly formats: Formats;
  private readonly message: string | undefined;
  private readonly formatterCache: FormatterCache = {
    number: {},
    dateTime: {},
    pluralRules: {},
  };
  constructor(
    message: string | MessageFormatElement[],
    locales: string | string[] = IntlMessageFormat.defaultLocale,
    overrideFormats?: Partial<Formats>,
    opts?: Options
  ) {
    if (typeof message === 'string') {
      this.message = message;
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

    this.formatters =
      (opts && opts.formatters) || createDefaultFormatters(this.formatterCache);
    prewarmFormatters(this.ast, this.locale, this.formatters, this.formats);
  }

  format = (values?: Record<string, PrimitiveType>) =>
    formatToString(
      this.ast,
      this.locale,
      this.formatters,
      this.formats,
      values,
      this.message
    );

  formatToParts = (values?: Record<string, any>) =>
    formatToParts(
      this.ast,
      this.locale,
      this.formatters,
      this.formats,
      values,
      this.message
    );
  formatHTMLMessage = (
    values?: Record<string, PrimitiveType | object | FormatXMLElementFn>
  ) =>
    formatHTMLMessage(
      this.ast,
      this.locale,
      this.formatters,
      this.formats,
      values,
      this.message
    );

  resolvedOptions = () => ({locale: this.locale});
  getAst = () => this.ast;
  static defaultLocale = 'en';
  static __parse: typeof parse | undefined = parse;
  // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.
  static formats = {
    number: {
      decimal: {
        style: 'decimal',
      },
      integer: {
        style: 'decimal',
        maximumFractionDigits: 0,
      },
      currency: {
        style: 'currency',
        currency: 'USD',
      },
      percent: {
        style: 'percent',
      },
      default: {
        style: 'decimal',
      },
    },
    date: {
      short: {
        month: NUMERIC,
        day: NUMERIC,
        year: TWODIGIT,
      },
      medium: {
        month: SHORT,
        day: NUMERIC,
        year: NUMERIC,
      },
      long: {
        month: LONG,
        day: NUMERIC,
        year: NUMERIC,
      },
      full: {
        month: LONG,
        day: NUMERIC,
        year: NUMERIC,
        weekday: LONG,
      },
      default: {
        month: SHORT,
        day: NUMERIC,
        year: NUMERIC,
      },
    },
    time: {
      short: {
        hour: NUMERIC,
        minute: NUMERIC,
      },
      medium: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
      },
      long: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
        timeZoneName: SHORT,
      },
      full: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
        timeZoneName: SHORT,
      },
      default: {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
      },
    },
    duration: {
      default: {
        hours: {
          minimumIntegerDigits: 1,
          maximumFractionDigits: 0,
        },
        minutes: {
          minimumIntegerDigits: 2,
          maximumFractionDigits: 0,
        },
        seconds: {
          minimumIntegerDigits: 2,
          maximumFractionDigits: 3,
        },
      },
    },
  };
  static patterns = {
    // parseNumberPattern: function(
    //   pattern: any /*: ?string */
    // ): Intl.NumberFormatOptions | undefined
    //  {
    //   if (!pattern) return;
    //   const options = {};
    //   const currency = pattern.match(/\b[A-Z]{3}\b/i);
    //   let syms = pattern.replace(/[^¤]/g, '').length;
    //   if (!syms && currency) syms = 1;
    //   if (syms) {
    //     options.style = 'currency';
    //     options.currencyDisplay =
    //       syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
    //     options.currency = currency ? currency[0].toUpperCase() : 'USD';
    //   } else if (pattern.indexOf('%') >= 0) {
    //     options.style = 'percent';
    //   }
    //   if (!/[@#0]/.test(pattern)) return options.style ? options : undefined;
    //   options.useGrouping = pattern.indexOf(',') >= 0;
    //   if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
    //     const size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
    //     options.minimumSignificantDigits = Math.min(
    //       Math.max(size.replace(/[^@0]/g, '').length, 1),
    //       21
    //     );
    //     options.maximumSignificantDigits = Math.min(
    //       Math.max(size.length, 1),
    //       21
    //     );
    //   } else {
    //     const parts = pattern.replace(/[^#0.]/g, '').split('.');
    //     const integer = parts[0];
    //     let n = integer.length - 1;
    //     while (integer[n] === '0') --n;
    //     options.minimumIntegerDigits = Math.min(
    //       Math.max(integer.length - 1 - n, 1),
    //       21
    //     );
    //     const fraction = parts[1] || '';
    //     n = 0;
    //     while (fraction[n] === '0') ++n;
    //     options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);
    //     while (fraction[n] === '#') ++n;
    //     options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    //   }
    //   return options;
    // },
    parseDatePattern: function(
      pattern: any /*: ?string */
    ): Intl.DateTimeFormatOptions | undefined {
      if (!pattern) return;
      const options: Intl.DateTimeFormatOptions = {};
      for (let i = 0; i < pattern.length; ) {
        const current = pattern[i];
        let n = 1;
        while (pattern[++i] === current) ++n;
        switch (current) {
          case 'G':
            options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
            break;
          case 'y':
          case 'Y':
            options.year = n === 2 ? TWODIGIT : NUMERIC;
            break;
          case 'M':
          case 'L':
            n = Math.min(Math.max(n - 1, 0), 4);
            options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
            break;
          case 'E':
          case 'e':
          case 'c':
            options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
            break;
          case 'd':
          case 'D':
            options.day = n === 2 ? TWODIGIT : NUMERIC;
            break;
          case 'h':
          case 'K':
            options.hour12 = true;
            options.hour = n === 2 ? TWODIGIT : NUMERIC;
            break;
          case 'H':
          case 'k':
            options.hour12 = false;
            options.hour = n === 2 ? TWODIGIT : NUMERIC;
            break;
          case 'm':
            options.minute = n === 2 ? TWODIGIT : NUMERIC;
            break;
          case 's':
          case 'S':
            options.second = n === 2 ? TWODIGIT : NUMERIC;
            break;
          case 'z':
          case 'Z':
          case 'v':
          case 'V':
            options.timeZoneName = n === 1 ? SHORT : LONG;
            break;
        }
      }
      return Object.keys(options).length ? options : undefined;
    },
  };
}

export default IntlMessageFormat;
