/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
'use strict';
import { unitsLocales } from './locales';
import * as Units from 'cldr-units-full/main/en/units.json'
import {Locale} from './types';
import generateFieldExtractorFn from './utils';

export type Units = typeof Units['main']['en']['units']

function loadUnits(locale: Locale): Units {
  return (require(`cldr-units-full/main/${locale}/units.json`) as typeof Units).main[locale as 'en'].units;
}

function hasUnits(locale: Locale): boolean {
  return unitsLocales.includes(locale)
}

const extractRelativeFields = generateFieldExtractorFn<Units>(
    loadUnits,
    hasUnits
)

export default extractRelativeFields