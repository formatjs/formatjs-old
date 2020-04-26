/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
import extractRelativeFields from './extract-relative';
import extractListPatterns from './extract-list';
import extractNumbers from './extract-numbers';
import extractUnits from './extract-units';
import extractCurrencies from './extract-currencies';
import extractDisplayNames from './extract-displaynames';
import {getAllLocales} from './locales';
export const locales = getAllLocales();
export interface Opts {
  locales?: string[];
}

export function extractAllRelativeFields(options: Opts = {}) {
  return extractRelativeFields(options.locales || locales);
}

export function extractAllListPatterns(options: Opts = {}) {
  return extractListPatterns(options.locales || locales);
}

export function extractAllNumbers(options: Opts = {}) {
  return extractNumbers(options.locales || locales);
}

export function extractAllUnits(options: Opts = {}) {
  return extractUnits(options.locales || locales);
}

export function extractAllCurrencies(options: Opts = {}) {
  return extractCurrencies(options.locales || locales);
}

export function extractAllDisplayNames(options: Opts = {}) {
  return extractDisplayNames(options.locales || locales);
}

export {getAllLanguages} from './locales';

export const processAliases = process;
export {getAllLocales as getAllDateFieldsLocales} from './extract-relative';
export {getAllLocales as getAllListLocales} from './extract-list';
export {
  extractCurrencyDigits,
  generateDataForLocales as generateCurrencyDataForLocales,
} from './extract-currencies';
export {generateDataForLocales as generateUnitDataForLocales} from './extract-units';
export {
  extractNumberingSystemNames,
  generateDataForLocales as generateNumberDataForLocales,
} from './extract-numbers';
export {getAllLocales as getAllDisplayNamesLocales} from './extract-displaynames';
