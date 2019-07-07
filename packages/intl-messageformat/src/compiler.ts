/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

import {
  ArgumentElement,
  parse,
  TYPE,
  LiteralElement,
  PluralElement,
  SelectElement,
  DateElement,
  TimeElement
} from 'intl-messageformat-parser';

type AST = ReturnType<typeof parse>

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

export type Pattern =
  | string
  | PluralOffsetString
  | PluralFormat
  | SelectFormat
  | StringFormat;

const PLURAL_HASHTAG_REGEX = /(^|[^\\])#/g

function normalizeHashtagInPluralText (ast: AST, pluralStack: PluralElement[] = []) {
  ast.forEach((el, i) => {
    if (pluralStack.length && el.type === TYPE.literal && PLURAL_HASHTAG_REGEX.test(el.value)) {
      const currentPlural = pluralStack[pluralStack.length - 1];
      ast[i]
      el.value = parse(el.value.replace(PLURAL_HASHTAG_REGEX, `{${currentPlural.value}, number}`))
    } 
    if (el.type === TYPE.plural) {
      pluralStack.push(el)
    } else {
      pluralStack.pop()
    }
  })
}

export default class Compiler {
  private locales: string | string[] = [];
  private formats: Formats = {
    number: {},
    date: {},
    time: {}
  };
  private pluralNumberFormat: Intl.NumberFormat | null = null;
  private currentPlural: PluralElement | null | undefined = null;
  private pluralStack: Array<PluralElement | null | undefined> = [];
  private formatters: Formatters;

  constructor(
    locales: string | string[],
    formats: Formats,
    formatters: Formatters
  ) {
    this.locales = locales;
    this.formats = formats;
    this.formatters = formatters;
  }

  compile(ast: ReturnType<typeof parse>): Pattern[] {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
  }

  compileMessage(ast: AST) {
    if (!Array.isArray(ast)) {
      throw new Error('Invalid AST');
    }
    return ast
      .map(el =>
        el.type === TYPE.literal
          ? this.compileMessageText(el)
          : this.compileArgument(el)
      );
  }

  compileMessageText(element: LiteralElement) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }

      return new PluralOffsetString(
        this.currentPlural.value,
        this.currentPlural.offset,
        this.pluralNumberFormat,
        element.value
      );
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
  }

  compileArgument(element: ArgumentElement | DateElement | TimeElement | PluralElement | SelectElement) {
    const { value } = element;
    const { formatters } = this;

    if (!format) {
      return new StringFormat(id);
    }

    const { formats, locales } = this;
    switch (format.type) {
      case 'numberFormat':
        return {
          id,
          format: formatters.getNumberFormat(
            locales,
            formats.number[format.style]
          ).format
        };

      case 'dateFormat':
        return {
          id,
          format: formatters.getDateTimeFormat(
            locales,
            formats.date[format.style]
          ).format
        };

      case 'timeFormat':
        return {
          id,
          format: formatters.getDateTimeFormat(
            locales,
            formats.time[format.style]
          ).format
        };

      case 'pluralFormat':
        return new PluralFormat(
          id,
          format.offset,
          this.compileOptions(element),
          formatters.getPluralRules(locales, {
            type: format.ordinal ? 'ordinal' : 'cardinal'
          })
        );

      case 'selectFormat':
        return new SelectFormat(id, this.compileOptions(element));

      default:
        throw new Error('Message element does not have a valid format type');
    }
  }

  compileOptions(element: ArgumentElement) {
    const format = element.format as ParserPluralFormat | ParserSelectFormat;
    const { options } = format;

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    const optionsHash = options.reduce(
      (all: Record<string, Array<Pattern>>, option) => {
        // Compile the sub-pattern and save it under the options's selector.
        all[option.selector] = this.compileMessage(option.value);
        return all;
      },
      {}
    );

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
  }
}

// -- Compiler Helper Classes --------------------------------------------------

abstract class Formatter {
  public id: string;
  constructor(id: string) {
    this.id = id;
  }
  abstract format(value: string | number): string;
}

class StringFormat extends Formatter {
  format(value: number | string) {
    if (!value && typeof value !== 'number') {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  }
}

class PluralFormat {
  public id: string;
  private offset: number;
  private options: Record<string, Pattern[]>;
  private pluralRules: Intl.PluralRules;
  constructor(
    id: string,
    offset: number,
    options: Record<string, Pattern[]>,
    pluralRules: Intl.PluralRules
  ) {
    this.id = id;
    this.offset = offset;
    this.options = options;
    this.pluralRules = pluralRules;
  }

  getOption(value: number) {
    const { options } = this;

    const option =
      options['=' + value] ||
      options[this.pluralRules.select(value - this.offset)];

    return option || options.other;
  }
}

export class PluralOffsetString extends Formatter {
  private offset: number;
  private numberFormat: Intl.NumberFormat;
  private string: string;
  constructor(
    id: string,
    offset: number,
    numberFormat: Intl.NumberFormat,
    string: string
  ) {
    super(id);
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }

  format(value: number) {
    const number = this.numberFormat.format(value - this.offset);

    return this.string
      .replace(/(^|[^\\])#/g, '$1' + number)
      .replace(/\\#/g, '#');
  }
}

export class SelectFormat {
  public id: string;
  private options: Record<string, Pattern[]>;
  constructor(id: string, options: Record<string, Pattern[]>) {
    this.id = id;
    this.options = options;
  }

  getOption(value: string) {
    const { options } = this;
    return options[value] || options.other;
  }
}

export function isSelectOrPluralFormat(
  f: any
): f is SelectFormat | PluralFormat {
  return !!f.options;
}
