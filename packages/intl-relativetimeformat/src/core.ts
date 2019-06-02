/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

import IntlMessageFormat from 'intl-messageformat';
import {
  ArgumentElement,
  SelectFormat,
  PluralFormat,
  MessageTextElement
} from 'intl-messageformat-parser';
import {
  LocaleData,
  Unit,
  LocaleFieldsData,
  RelativeTimeOpt,
  RelativeTimeData
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

type Part = LiteralPart | RelativeTimeFormatNumberPart;

interface LiteralPart {
  type: 'literal';
  value: string;
}

interface RelativeTimeFormatNumberPart extends Intl.NumberFormatPart {
  unit: Unit;
}

interface IntlRelativeTimeFormat {
  new (
    locales?: string | string[],
    opts?: IntlRelativeTimeFormatOptions
  ): IntlRelativeTimeFormat;
  (
    locales?: string | string[],
    opts?: IntlRelativeTimeFormatOptions
  ): IntlRelativeTimeFormat;
  format(value: number, unit: Unit): string;
  formatToParts(value: number, unit: Unit): Part[];
  resolvedOptions(): ResolvedIntlRelativeTimeFormatOptions;
  supportedLocalesOf(
    locales: string | string[],
    opts?: Pick<IntlRelativeTimeFormatOptions, 'localeMatcher'>
  ): string[];

  /**
   * PRIVATE METHODS/PROPERTIES
   */
  __localeData__: Record<string, LocaleData>;
  __addLocaleData(...data: LocaleData[]): void;
}

/**
 * Resolve locale using locale matcher algorithm supported.
 * We basically just delegate this to `Intl.NumberFormat`
 * @param locales locales
 * @param localeMatcher matching algo
 */
function resolveLocale(
  locales: string | string[] = [],
  localeMatcher: IntlRelativeTimeFormatOptions['localeMatcher']
) {
  return Intl.NumberFormat(locales, { localeMatcher }).resolvedOptions().locale;
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

    data = !!data.parentLocale
      ? localeData[data.parentLocale.toLowerCase()]
      : undefined;
  }

  throw new Error(
    'Locale data added to IntlRelativeTimeFormat is missing `fields` for :' +
      locale
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
  return fields[`${unit}-short` as 'day-short'];
}

const DEFAULT_OPTIONS: IntlRelativeTimeFormatOptions = {
  localeMatcher: 'best fit',
  style: 'long',
  numeric: 'always'
};

const RelativeTimeFormat: IntlRelativeTimeFormat = ((
  locales?: string | string[],
  opts?: IntlRelativeTimeFormatOptions
) => {
  const options = { ...DEFAULT_OPTIONS, ...(opts || {}) };
  const locale = resolveLocale(locales, options.localeMatcher);
  const resolvedOptions: ResolvedIntlRelativeTimeFormatOptions = {
    locale,
    style: options.style,
    numeric: options.numeric,
    numberingSystem: 'latn'
  };
  const fields = findFields(locale);
  const messages: Record<string, typeof IntlMessageFormat> = {};
  const pluralRules = new Intl.PluralRules(locales, {
    localeMatcher: options.localeMatcher
  });
  const nf = new Intl.NumberFormat(locales, {
    localeMatcher: options.localeMatcher
  });

  function getMessage(unit: Unit) {
    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[unit]) {
      messages[unit] = compileMessage(unit);
    }

    return messages[unit];
  }

  function compileMessage(unit: Unit) {
    const { relativeTime } = findFieldData(fields, unit, resolvedOptions.style);
    const future = (Object.keys(relativeTime.future) as Array<
      keyof RelativeTimeData
    >)
      .map(i => `${i} {${relativeTime.future[i]!.replace('{0}', '#')}}`)
      .join(' ');
    const past = (Object.keys(relativeTime.past) as Array<
      keyof RelativeTimeData
    >)
      .map(i => `${i} {${relativeTime.past[i]!.replace('{0}', '#')}}`)
      .join(' ');

    const message = `{when, select, future {{0, plural, ${future}}} past {{0, plural, ${past}}}}`;

    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeTimeFormat instance.
    return new IntlMessageFormat(message, locales);
  }

  return {
    format(value: number, unit: Unit): string {
      const { style, numeric } = resolvedOptions;
      const fieldData = findFieldData(fields, unit, style);
      let result: string = '';
      // We got a match for things like yesterday
      if (
        numeric === 'auto' &&
        (result = fieldData.relative[String(value) as '0'] || '')
      ) {
        return result;
      }

      return getMessage(unit).format({
        '0': Math.abs(value),
        when: resolvePastOrFuture(value)
      });
    },
    formatToParts(value: number, unit: Unit): Part[] {
      const { style, numeric } = resolvedOptions;
      const fieldData = findFieldData(fields, unit, style);
      if (!fieldData) {
        throw new Error(`Unsupported unit ${unit}`);
      }
      const { relative, relativeTime } = fieldData;
      let result: string = '';
      // We got a match for things like yesterday
      if (
        numeric === 'auto' &&
        (result = relative[String(value) as '0'] || '')
      ) {
        return [
          {
            type: 'literal',
            value: result
          }
        ];
      }

      const selector = pluralRules.select(value) as RelativeTimeOpt;
      const futureOrPastData = relativeTime[resolvePastOrFuture(value)];
      const msg = futureOrPastData[selector] || futureOrPastData.other;
      const valueParts = nf.formatToParts(value).map(p => ({ ...p, unit }));
      return msg!
        .split(/\{0\}/)
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
    },
    resolvedOptions(): ResolvedIntlRelativeTimeFormatOptions {
      return resolvedOptions;
    }
  };
}) as any;

function resolvePastOrFuture(value: number): 'past' | 'future' {
  return Object.is(value, -0)
    ? 'past'
    : Object.is(value, +0)
    ? 'future'
    : value < 0
    ? 'past'
    : 'future';
}

function isString(s?: string): s is string {
  return !!s;
}

RelativeTimeFormat.supportedLocalesOf = (
  locales: string | string[],
  opts?: Pick<IntlRelativeTimeFormatOptions, 'localeMatcher'>
) => {
  return Intl.PluralRules.supportedLocalesOf(locales, opts);
};

RelativeTimeFormat.__localeData__ = {};
RelativeTimeFormat.__addLocaleData = (...data: LocaleData[]) => {
  for (const datum of data) {
    if (!(datum && datum.locale)) {
      throw new Error(
        'Locale data provided to IntlRelativeTimeFormat is missing a ' +
          '`locale` property value'
      );
    }

    RelativeTimeFormat.__localeData__[datum.locale.toLowerCase()] = datum;
  }
};

export default RelativeTimeFormat;
