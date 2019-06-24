/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */
import {
  LocaleData,
  Unit,
  LocaleFieldsData,
  RelativeTimeOpt,
  FormattableUnit,
  VALID_UNITS
} from './types';

// -- RelativeTimeFormat -----------------------------------------------------------

export interface IntlRelativeTimeFormatOptions {
  /**
   * The locale matching algorithm to use.
   * Possible values are "lookup" and "best fit"; the default is "best fit".
   * For information about this option, see
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation.
   */
  localeMatcher?: 'best fit' | 'lookup';
  /**
   * The format of output message. Possible values are:
   * - "always" (default, e.g., 1 day ago),
   * - or "auto" (e.g., yesterday).
   * The "auto" value allows to not always have to
   * use numeric values in the output.
   */
  numeric?: 'always' | 'auto';
  /**
   * The length of the internationalized message. Possible values are:
   * - "long" (default, e.g., in 1 month)
   * - "short" (e.g., in 1 mo.),
   * - or "narrow" (e.g., in 1 mo.).
   * The narrow style could be similar to the short style for some locales.
   */
  style?: 'long' | 'short' | 'narrow';
}

export interface ResolvedIntlRelativeTimeFormatOptions
  extends Pick<IntlRelativeTimeFormatOptions, 'style' | 'numeric'> {
  /**
   * The BCP 47 language tag for the locale actually used.
   * If any Unicode extension values were requested in the
   * input BCP 47 language tag that led to this locale,
   * the key-value pairs that were requested and are
   * supported for this locale are included in locale.
   */
  locale: string;
  /**
   * The value requested using the Unicode
   * extension key "nu" or filled in as a default.
   */
  numberingSystem: string;
}

export type Part = LiteralPart | RelativeTimeFormatNumberPart;

export interface LiteralPart {
  type: 'literal';
  value: string;
}

export interface RelativeTimeFormatNumberPart extends Intl.NumberFormatPart {
  unit: FormattableUnit;
}

/**
 * Find the correct field data in our CLDR data
 * @param locale locale
 */
function findFields(locale: string) {
  const localeData = RelativeTimeFormat.__localeData__;
  let data: LocaleData | undefined = localeData[locale.toLowerCase()];

  // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find `fields` to return.
  while (data) {
    if (data.fields) {
      return data.fields;
    }

    data = data.parentLocale
      ? localeData[data.parentLocale.toLowerCase()]
      : undefined;
  }

  throw new Error(
    `Locale data added to RelativeTimeFormat is missing 'fields' for "${locale}"`
  );
}

function resolveLocale(locales: string | string[] = []) {
  let resolvedLocales: string[] = [
    ...(Array.isArray(locales) ? locales : [locales]),
    // default locale
    'en'
  ].filter(Boolean);

  var localeData = RelativeTimeFormat.__localeData__;
  var i, len, localeParts, data;

  // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.
  for (i = 0, len = resolvedLocales.length; i < len; i += 1) {
    localeParts = resolvedLocales[i].toLowerCase().split('-');

    while (localeParts.length) {
      data = localeData[localeParts.join('-')];
      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }

      localeParts.pop();
    }
  }

  const defaultLocale = resolvedLocales.pop();
  throw new Error(
    'No locale data has been added to IntlRelativeTimeFormat for: ' +
      resolvedLocales.join(', ') +
      ', or the default locale: ' +
      defaultLocale
  );
}

function findFieldData(
  fields: LocaleFieldsData,
  unit: Unit,
  style: IntlRelativeTimeFormatOptions['style']
) {
  if (style === 'long') {
    return fields[unit as 'day'];
  }
  if (style === 'narrow') {
    return (
      fields[`${unit}-narrow` as 'day-narrow'] ||
      fields[`${unit}-short` as 'day-short']
    );
  }
  return fields[`${unit}-short` as 'day-short'];
}

function objectIs(x: any, y: any) {
  if (Object.is) {
    return Object.is(x, y);
  }
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  }
  // Step 6.a: NaN == NaN
  return x !== x && y !== y;
}

function resolvePastOrFuture(value: number): 'past' | 'future' {
  return objectIs(value, -0)
    ? 'past'
    : objectIs(value, +0)
    ? 'future'
    : value < 0
    ? 'past'
    : 'future';
}

function validateInstance(instance: any, method: string) {
  if (!(instance instanceof RelativeTimeFormat)) {
    throw new TypeError(
      `Method Intl.RelativeTimeFormat.prototype.${method} called on incompatible receiver ${String(
        instance
      )}`
    );
  }
}

function validateUnit(unit: any): Unit {
  // `unit + ''` to guard against `Symbol()`
  if (!~VALID_UNITS.indexOf(unit + '')) {
    throw new RangeError(
      `Invalid unit argument for format() '${String(unit)}'`
    );
  }
  const resolvedUnit = (unit[unit.length - 1] === 's'
    ? unit.slice(0, unit.length - 1)
    : unit) as Unit;
  return resolvedUnit;
}

function validateValue(value: number | string, method = 'format') {
  const parsedValue =
    typeof value === 'string' ? new Number(value).valueOf() : value;
  if (!isFinite(parsedValue)) {
    throw new RangeError(
      `Value need to be finite number for Intl.RelativeTimeFormat.prototype.${method}()`
    );
  }
  return parsedValue;
}

function isString(s?: string): s is string {
  return !!s;
}

function toObject<T>(arg: T): T extends null ? never : T extends undefined ? never : T {
  if (arg == null) {
    throw new TypeError('undefined/null cannot be converted to object')
  }
  return Object(arg)
}

/**
 * https://tc39.es/ecma402/#sec-getoption
 * @param opts 
 * @param prop 
 * @param type 
 * @param values 
 * @param fallback 
 */
function getOption<T extends object, K extends keyof T>(opts: T, prop: K, type: 'string' | 'boolean', values: T[K][] | undefined, fallback: T[K]): T[K] {
  const descriptor = Object.getOwnPropertyDescriptor(opts, prop)
  let value = descriptor ? descriptor.value : undefined
  if (value !== undefined) {
    if (type !== 'boolean' && type !== 'string') {
      throw new TypeError('invalid type')
    }
    if (type === 'boolean') {
      value = Boolean(value)
    }
    if (type === 'string') {
      value = String(value)
    }
    if (values !== undefined && !~values.indexOf(value)) {
      throw new RangeError(`${value} in not within ${values}`)
    }
    return value
  }
  return fallback
}

export default class RelativeTimeFormat {
  private _nf: Intl.NumberFormat;
  private _pl: Intl.PluralRules;
  private _fields: LocaleFieldsData;
  private _opts: IntlRelativeTimeFormatOptions;
  private _locale: string;
  constructor(
    locales?: string | string[],
    opts?: IntlRelativeTimeFormatOptions
  ) {
    // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
    try {
      if (!eval('new.target')) {
        throw new TypeError(
          "Intl.RelativeTimeFormat must be called with 'new'"
        );
      }
    } catch (e) {
      // new.target is not supported
    }
    this._opts = opts === undefined ? Object.create(null) : toObject(opts);
    this._locale = resolveLocale(locales);
    const localeMatcher = getOption(this._opts, 'localeMatcher', 'string', ['best fit', 'lookup'], 'best fit')

    // Guard against global Object.defineProperty(Object.prototype)
    const nfOpts = Object.create(null);
    nfOpts.localeMatcher = localeMatcher;

    this._nf = new Intl.NumberFormat(locales, nfOpts);
    this._pl = new Intl.PluralRules(locales, nfOpts);

    this._fields = findFields(this._locale);
  }
  format(value: number | string, unit: FormattableUnit): string {
    validateInstance(this, 'format');
    const resolvedUnit = validateUnit(unit);
    const parsedValue = validateValue(value);
    const { style, numeric } = this.resolvedOptions();
    const fieldData = findFieldData(this._fields, resolvedUnit, style);
    if (!fieldData) {
      throw new Error(`Unsupported unit ${unit}`);
    }
    const { relative, relativeTime } = fieldData;
    let result: string = '';
    // We got a match for things like yesterday
    if (
      numeric === 'auto' &&
      (result = relative[String(parsedValue) as '0'] || '')
    ) {
      return result;
    }

    const selector = this._pl.select(parsedValue) as RelativeTimeOpt;
    const futureOrPastData = relativeTime[resolvePastOrFuture(parsedValue)];
    const msg = futureOrPastData[selector] || futureOrPastData.other;
    return msg!.replace(/\{0\}/, this._nf.format(Math.abs(parsedValue)));
  }
  formatToParts(value: number | string, unit: FormattableUnit): Part[] {
    validateInstance(this, 'format');
    const resolvedUnit = validateUnit(unit);
    const parsedValue = validateValue(value, 'formatToParts');
    const { style, numeric } = this.resolvedOptions();
    const fieldData = findFieldData(this._fields, resolvedUnit, style);
    if (!fieldData) {
      throw new Error(`Unsupported unit ${unit}`);
    }
    const { relative, relativeTime } = fieldData;
    let result: string = '';
    // We got a match for things like yesterday
    if (
      numeric === 'auto' &&
      (result = relative[String(parsedValue) as '0'] || '')
    ) {
      return [
        {
          type: 'literal',
          value: result
        }
      ];
    }

    const selector = this._pl.select(parsedValue) as RelativeTimeOpt;
    const futureOrPastData = relativeTime[resolvePastOrFuture(parsedValue)];
    const msg = futureOrPastData[selector] || futureOrPastData.other;
    const valueParts = this._nf
      .formatToParts(Math.abs(parsedValue))
      .map(p => ({ ...p, unit: resolvedUnit }));
    return msg!
      .split(/(\{0\})/)
      .filter<string>(isString)
      .reduce(
        (parts: Part[], str) => [
          ...parts,
          ...(str === '{0}'
            ? valueParts
            : [{ type: 'literal', value: str } as LiteralPart])
        ],
        []
      );
  }

  resolvedOptions(): ResolvedIntlRelativeTimeFormatOptions {
    validateInstance(this, 'resolvedOptions');
    
    const { numberingSystem } = this._nf.resolvedOptions();
    // test262/test/intl402/RelativeTimeFormat/prototype/resolvedOptions/type.js
    const opts = Object.create(Object.prototype);
    Object.defineProperties(opts, {
      locale: {
        value: this._locale,
        writable: true,
        enumerable: true,
        configurable: true
      },
      style: {
        value: getOption(this._opts, 'style', 'string', ['long', 'narrow', 'short'], 'long'),
        writable: true,
        enumerable: true,
        configurable: true
      },
      numeric: {
        value: getOption(this._opts, 'numeric', 'string', ['always', 'auto'], 'always'),
        writable: true,
        enumerable: true,
        configurable: true
      },
      numberingSystem: {
        value: numberingSystem,
        writable: true,
        enumerable: true,
        configurable: true
      }
    });
    return opts;
  }

  toString() {
    return '[object Intl.RelativeTimeFormat]';
  }

  public static supportedLocalesOf = (
    locales: string | string[],
    opts?: Pick<IntlRelativeTimeFormatOptions, 'localeMatcher'>
  ) => {
    // test262/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/result-type.js
    return [...Intl.PluralRules.supportedLocalesOf(locales, opts)];
  };

  static __localeData__ = {} as Record<string, LocaleData>;
  public static __addLocaleData(...data: LocaleData[]) {
    for (const datum of data) {
      if (!(datum && datum.locale)) {
        throw new Error(
          'Locale data provided to RelativeTimeFormat is missing a ' +
            '`locale` property value'
        );
      }

      RelativeTimeFormat.__localeData__[datum.locale.toLowerCase()] = datum;
    }
  }
  public static polyfilled = true;
}
