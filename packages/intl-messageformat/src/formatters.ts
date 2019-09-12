import {
  isArgumentElement,
  MessageFormatElement,
  isLiteralElement,
  isDateElement,
  isTimeElement,
  isNumberElement,
  isSelectElement,
  isPluralElement,
} from 'intl-messageformat-parser';
import IntlMessageFormat from './core';

export interface Formats {
  number: Record<string, Intl.NumberFormatOptions>;
  date: Record<string, Intl.DateTimeFormatOptions>;
  time: Record<string, Intl.DateTimeFormatOptions>;
}

export interface Patterns {
  // parseNumberPattern(style: any): Intl.NumberFormatOptions;
  parseDatePattern(style: any): Intl.DateTimeFormatOptions;
}

export interface FormatterCache {
  number: Record<string, Intl.NumberFormat>;
  dateTime: Record<string, Intl.DateTimeFormat>;
  pluralRules: Record<string, Intl.PluralRules>;
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

export const enum PART_TYPE {
  literal,
  argument,
}

export interface LiteralPart {
  type: PART_TYPE.literal;
  value: string;
}

export interface ArgumentPart {
  type: PART_TYPE.argument;
  value: any;
}

export type MessageFormatPart = LiteralPart | ArgumentPart;

export type PrimitiveType = string | number | boolean | null | undefined | Date;

const ESCAPE_HASH_REGEX = /\\#/g;

class FormatError extends Error {
  public readonly variableId?: string;
  constructor(msg?: string, variableId?: string) {
    super(msg);
    this.variableId = variableId;
  }
}

export const LONG = 'long';
export const SHORT = 'short';
export const NARROW = 'narrow';
export const NUMERIC = 'numeric';
export const TWODIGIT = '2-digit';

export const patterns = {
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

function mergeLiteral(parts: MessageFormatPart[]): MessageFormatPart[] {
  if (parts.length < 2) {
    return parts;
  }
  return parts.reduce(
    (all, part) => {
      const lastPart = all[all.length - 1];
      if (
        !lastPart ||
        lastPart.type !== PART_TYPE.literal ||
        part.type !== PART_TYPE.literal
      ) {
        all.push(part);
      } else {
        lastPart.value += part.value;
      }
      return all;
    },
    [] as MessageFormatPart[]
  );
}

// TODO(skeleton): add skeleton support
export function formatToParts(
  els: MessageFormatElement[],
  locales: string | string[],
  formatters: Formatters,
  formats: Formats,
  values?: Record<string, any>,
  // For debugging
  originalMessage?: string
): MessageFormatPart[] {
  // Hot path for straight simple msg translations
  if (els.length === 1 && isLiteralElement(els[0])) {
    return [
      {
        type: PART_TYPE.literal,
        value: els[0].value.replace(ESCAPE_HASH_REGEX, '#'),
      },
    ];
  }
  const result: MessageFormatPart[] = [];
  for (const el of els) {
    // Exit early for string parts.
    if (isLiteralElement(el)) {
      result.push({
        type: PART_TYPE.literal,
        value: el.value.replace(ESCAPE_HASH_REGEX, '#'),
      });
      continue;
    }
    const {value: varName} = el;

    // Enforce that all required values are provided by the caller.
    if (!(values && varName in values)) {
      throw new FormatError(
        `The intl string context variable "${varName}" was not provided to the string "${originalMessage}"`
      );
    }

    let value = values[varName];
    if (isArgumentElement(el)) {
      if (!value || typeof value === 'string' || typeof value === 'number') {
        value =
          typeof value === 'string' || typeof value === 'number'
            ? String(value)
            : '';
      }
      result.push({
        type: PART_TYPE.argument,
        value,
      });
      continue;
    }

    // Recursively format plural and select parts' option — which can be a
    // nested pattern structure. The choosing of the option to use is
    // abstracted-by and delegated-to the part helper object.
    if (isDateElement(el)) {
      const style =
        typeof el.style === 'string'
          ? formats.date[el.style] || patterns.parseDatePattern(el.style)
          : formats.date.default;
      result.push({
        type: PART_TYPE.literal,
        value: formatters
          .getDateTimeFormat(locales, style)
          .format(value as number),
      });
      continue;
    }
    if (isTimeElement(el)) {
      const style =
        typeof el.style === 'string'
          ? formats.time[el.style] || patterns.parseDatePattern(el.style)
          : formats.time.default;
      result.push({
        type: PART_TYPE.literal,
        value: formatters
          .getDateTimeFormat(locales, style)
          .format(value as number),
      });
      continue;
    }
    if (isNumberElement(el)) {
      const style =
        typeof el.style === 'string'
          ? formats.number[el.style]
          : formats.number.default;
      result.push({
        type: PART_TYPE.literal,
        value: formatters
          .getNumberFormat(locales, style)
          .format(value as number),
      });
      continue;
    }
    if (isSelectElement(el)) {
      const opt = el.options[value as string] || el.options.other;
      if (!opt) {
        throw new RangeError(
          `Invalid values for "${
            el.value
          }": "${value}". Options are "${Object.keys(el.options).join('", "')}"`
        );
      }
      result.push(
        ...formatToParts(opt.value, locales, formatters, formats, values)
      );
      continue;
    }
    if (isPluralElement(el)) {
      let opt = el.options[`=${value}`];
      if (!opt) {
        const rule = formatters
          .getPluralRules(locales, {type: el.pluralType})
          .select((value as number) - (el.offset || 0));
        opt = el.options[rule] || el.options.other;
      }
      if (!opt) {
        throw new RangeError(
          `Invalid values for "${
            el.value
          }": "${value}". Options are "${Object.keys(el.options).join('", "')}"`
        );
      }
      result.push(
        ...formatToParts(opt.value, locales, formatters, formats, values)
      );
      continue;
    }
  }
  return mergeLiteral(result);
}

export function formatToString(
  els: MessageFormatElement[],
  locales: string | string[],
  formatters: Formatters,
  formats: Formats,
  values?: Record<string, PrimitiveType>,
  // For debugging
  originalMessage?: string
): string {
  const parts = formatToParts(
    els,
    locales,
    formatters,
    formats,
    values,
    originalMessage
  );
  // Hot path for straight simple msg translations
  if (parts.length === 1) {
    return parts[0].value;
  }
  return parts.reduce((all, part) => (all += part.value), '');
}

export type FormatXMLElementFn = (...args: any[]) => string | object;

// Singleton
let domParser: DOMParser;
const TOKEN_DELIMITER = '@@';
const TOKEN_REGEX = /@@(.*?)@@/g;
let counter = 0;
function generateId() {
  return `${Date.now()}_${++counter}`;
}

function restoreRichPlaceholderMessage(
  text: string,
  objectParts: Record<string, any>
): Array<string | object> {
  return text
    .split(TOKEN_REGEX)
    .filter(Boolean)
    .map(c => (objectParts[c] != null ? objectParts[c] : c))
    .reduce((all, c) => {
      if (!all.length) {
        all.push(c);
      } else if (
        typeof c === 'string' &&
        typeof all[all.length - 1] === 'string'
      ) {
        all[all.length - 1] += c;
      } else {
        all.push(c);
      }
      return all;
    }, []);
}

/**
 * Not exhaustive, just for sanity check
 */
const SIMPLE_XML_REGEX = /(<([0-9a-zA-Z-_]*?)>(.*?)<\/([0-9a-zA-Z-_]*?)>)|(<[0-9a-zA-Z-_]*?\/>)/;

const TEMPLATE_ID = Date.now() + '@@';

const VOID_ELEMENTS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

function formatHTMLElement(
  el: Element,
  objectParts: Record<string, any>,
  values: Record<string, PrimitiveType | object | FormatXMLElementFn>
): Array<PrimitiveType | object> {
  let {tagName, outerHTML, textContent, childNodes} = el;
  // Regular text
  if (!tagName) {
    return restoreRichPlaceholderMessage(textContent || '', objectParts);
  }

  tagName = tagName.toLowerCase();
  const isVoidElement = ~VOID_ELEMENTS.indexOf(tagName);
  const formatFnOrValue = values[tagName];

  if (formatFnOrValue && isVoidElement) {
    throw new FormatError(
      `${tagName} is a self-closing tag and can not be used, please use another tag name.`
    );
  }

  if (!childNodes.length) {
    return [outerHTML];
  }

  const chunks: any[] = (Array.prototype.slice.call(
    childNodes
  ) as ChildNode[]).reduce(
    (all: any[], child) =>
      all.concat(formatHTMLElement(child as HTMLElement, objectParts, values)),
    []
  );

  // Legacy HTML
  if (!formatFnOrValue) {
    return [`<${tagName}>`, ...chunks, `</${tagName}>`];
  }
  // HTML Tag replacement
  if (typeof formatFnOrValue === 'function') {
    return [formatFnOrValue(...chunks)];
  }
  return [formatFnOrValue];
}

export function formatHTMLMessage(
  els: MessageFormatElement[],
  locales: string | string[],
  formatters: Formatters,
  formats: Formats,
  values?: Record<string, PrimitiveType | object | FormatXMLElementFn>,
  // For debugging
  originalMessage?: string
): Array<string | object> {
  const parts = formatToParts(
    els,
    locales,
    formatters,
    formats,
    values,
    originalMessage
  );
  const objectParts: Record<string, ArgumentPart['value']> = {};
  const formattedMessage = parts.reduce((all, part) => {
    if (part.type === PART_TYPE.literal) {
      return (all += part.value);
    }
    const id = generateId();
    objectParts[id] = part.value;
    return (all += `${TOKEN_DELIMITER}${id}${TOKEN_DELIMITER}`);
  }, '');

  // Not designed to filter out aggressively
  if (!SIMPLE_XML_REGEX.test(formattedMessage)) {
    return restoreRichPlaceholderMessage(formattedMessage, objectParts);
  }
  if (!values) {
    throw new FormatError('Message has placeholders but no values was given');
  }
  if (typeof DOMParser === 'undefined') {
    throw new FormatError('Cannot format XML message without DOMParser');
  }
  if (!domParser) {
    domParser = new DOMParser();
  }

  const content = domParser
    .parseFromString(
      `<formatted-message id="${TEMPLATE_ID}">${formattedMessage}</formatted-message>`,
      'text/html'
    )
    .getElementById(TEMPLATE_ID);

  if (!content) {
    throw new FormatError(`Malformed HTML message ${formattedMessage}`);
  }
  const tagsToFormat = Object.keys(values).filter(
    varName => !!content.getElementsByTagName(varName).length
  );

  // No tags to format
  if (!tagsToFormat.length) {
    return restoreRichPlaceholderMessage(formattedMessage, objectParts);
  }

  const caseSensitiveTags = tagsToFormat.filter(
    tagName => tagName !== tagName.toLowerCase()
  );
  if (caseSensitiveTags.length) {
    throw new FormatError(
      `HTML tag must be lowercased but the following tags are not: ${caseSensitiveTags.join(
        ', '
      )}`
    );
  }

  // We're doing this since top node is `<formatted-message/>` which does not have a formatter
  return Array.prototype.slice
    .call(content.childNodes)
    .reduce(
      (all, child) => all.concat(formatHTMLElement(child, objectParts, values)),
      []
    );
}
