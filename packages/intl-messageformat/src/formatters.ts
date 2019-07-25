import {
  isArgumentElement,
  MessageFormatElement,
  isLiteralElement,
  isDateElement,
  isTimeElement,
  isNumberElement,
  isSelectElement,
  isPluralElement
} from 'intl-messageformat-parser';

export interface Formats {
  number: Record<string, Intl.NumberFormatOptions>;
  date: Record<string, Intl.DateTimeFormatOptions>;
  time: Record<string, Intl.DateTimeFormatOptions>;
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
  argument
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

export type PrimitiveType = string | number | boolean | null | undefined;

const ESCAPE_HASH_REGEX = /\\#/g;

class FormatError extends Error {
  public readonly variableId?: string;
  constructor(msg?: string, variableId?: string) {
    super(msg);
    this.variableId = variableId;
  }
}

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
        value: els[0].value.replace(ESCAPE_HASH_REGEX, '#')
      }
    ];
  }
  const result: MessageFormatPart[] = [];
  for (const el of els) {
    // Exit early for string parts.
    if (isLiteralElement(el)) {
      result.push({
        type: PART_TYPE.literal,
        value: el.value.replace(ESCAPE_HASH_REGEX, '#')
      });
      continue;
    }
    const { value: varName } = el;

    // Enforce that all required values are provided by the caller.
    if (!(values && varName in values)) {
      throw new FormatError(
        `The intl string context variable '${varName}' was not provided to the string '${originalMessage}'`
      );
    }

    const value = values[varName];
    if (isArgumentElement(el)) {
      if (!value || typeof value === 'string' || typeof value === 'number') {
        result.push({
          type: PART_TYPE.literal,
          value:
            typeof value === 'string' || typeof value === 'number'
              ? String(value)
              : ''
        });
      } else {
        result.push({
          type: PART_TYPE.argument,
          value
        });
      }
      continue;
    }

    // Recursively format plural and select parts' option — which can be a
    // nested pattern structure. The choosing of the option to use is
    // abstracted-by and delegated-to the part helper object.
    if (isDateElement(el)) {
      const style = el.style ? formats.date[el.style] : undefined;
      result.push({
        type: PART_TYPE.literal,
        value: formatters
          .getDateTimeFormat(locales, style)
          .format(value as number)
      });
      continue;
    }
    if (isTimeElement(el)) {
      const style = el.style ? formats.time[el.style] : undefined;
      result.push({
        type: PART_TYPE.literal,
        value: formatters
          .getDateTimeFormat(locales, style)
          .format(value as number)
      });
      continue;
    }
    if (isNumberElement(el)) {
      const style = el.style ? formats.number[el.style] : undefined;
      result.push({
        type: PART_TYPE.literal,
        value: formatters
          .getNumberFormat(locales, style)
          .format(value as number)
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
          .getPluralRules(locales, { type: el.pluralType })
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

export type FormatXMLElementFn = (str?: string) => string | object;

// Singleton
let domParser: DOMParser;

export function formatXMLMessage(
  els: MessageFormatElement[],
  locales: string | string[],
  formatters: Formatters,
  formats: Formats,
  values?: Record<string, PrimitiveType | FormatXMLElementFn>,
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
  const formattedMessage = parts.reduce((all, part) => (all += part.value), '');

  // Not designed to filter out aggressively
  if (!~formattedMessage.indexOf('<')) {
    return [formattedMessage];
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
  // XML, not HTML since HTMl is strict about self-closing tag
  const dom = domParser.parseFromString(
    `<template>${formattedMessage}</template>`,
    'application/xml'
  );
  if (dom.getElementsByTagName('parsererror').length) {
    throw new FormatError(
      `Malformed XML message ${
        dom.getElementsByTagName('parsererror')[0].innerHTML
      }`
    );
  }
  const content = dom.firstChild as Element;
  if (!content) {
    throw new FormatError(`Malformed XML message ${formattedMessage}`);
  }
  const tagsToFormat = Object.keys(values).filter(
    varName => !!dom.getElementsByTagName(varName).length
  );

  // No tags to format
  if (!tagsToFormat.length) {
    return [formattedMessage];
  }

  const reconstructedChunks: Array<string | object> = [];
  for (let i = 0; i < content.childNodes.length; i++) {
    const node = content.childNodes[i] as Element;
    const { tagName } = node;
    if (!tagName) {
      // Regular text
      reconstructedChunks.push(node.textContent || '');
    } else if (!values[tagName]) {
      // Legacy HTML
      reconstructedChunks.push(node.outerHTML);
    } else {
      const formatFn = values[tagName] as FormatXMLElementFn;
      reconstructedChunks.push(formatFn(node.textContent || undefined));
    }
  }
  return reconstructedChunks;
}
