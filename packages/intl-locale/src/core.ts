import {
  getInternalSlot,
  toObject,
  getOption,
  setInternalSlot,
  setMultiInternalSlots,
  objectIs,
} from '@formatjs/intl-utils';
import {parseUnicodeLocaleId} from '@formatjs/ldml-parser'
export interface IntlLocaleOptions {
  calendar?: string;
  collation?: string;
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h34';
  caseFirst?: 'upper' | 'lower' | 'false';
  numberingSystem?: string;
  numeric?: boolean;
}

interface IntlLocaleInternal extends IntlLocaleOptions {
  locale: string;
  initializedLocale: boolean;
}

const __INTERNAL_SLOT_MAP__ = new WeakMap<IntlLocale, IntlLocaleInternal>();

const NUMBERING_SYSTEM_REGEX = /[a-z0-9]{3,8}(-[a-z0-9]{3,8})*/gi;

interface KeywordPart {
  key: string
  value: string
}

function unicodeExtensionComponents(extension: string) {
  const attributes = []
  const keywords: KeywordPart[] = []
  let isKeyword = false
  const size = extension.length
  let k = 3
  let key = ''
  let value = ''
  while (k < size) {
    const e = extension.indexOf('-', k)
    let len = 0
    if (e === -1) {
      len = size - k
    } else {
      len = e - k
    }
    const subtag = extension.substring(k, k + len)
    
    if (!isKeyword) {
      if (len !== 2 && attributes.indexOf(subtag) === -1) {
        attributes.push(subtag)
      }
    } else {
      if (len === 2) {
        if (!keywords.find(el => el.key === key)) {
          keywords.push({
            key,
            value
          })
        }
      } else {
        if (value !== '') {
          value += '-'
        }
        value += subtag
      }
    }
    if (len === 2) {
      isKeyword = true
      key = subtag
      value = ''
    }
    k += len + 1
  }
  if (isKeyword) {
    if (!keywords.find(el => el.key === key)) {
      keywords.push({
        key,
        value
      })
    }
  }
  return {
    attributes,
    keywords
  }
}

function applyOptionsToTag(tag: string, options: IntlLocaleOptions): string {
  const ast = parseUnicodeLocaleId(tag)
  if (Array.isArray(ast.extensions) && ast.extensions.length) {
    const extension = ast.extensions.filter()
  }
  return tag;
}

function applyUnicodeExtensionToTag(
  tag: string,
  opt: IntlLocaleOptions,
  relevantExtensionKeys: string[]
) {
  return {};
}

export class IntlLocale {
  constructor(tag: string | IntlLocale, options: IntlLocaleOptions) {
    // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
    // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
    const newTarget =
      this && this instanceof IntlLocale ? this.constructor : void 0;
    if (!newTarget) {
      throw new TypeError("Intl.Locale must be called with 'new'");
    }

    const {relevantExtensionKeys} = IntlLocale;

    const internalSlotsList: Array<keyof IntlLocaleInternal> = [
      'initializedLocale',
      'locale',
      'calendar',
      'collation',
      'hourCycle',
      'numberingSystem',
    ];

    if (relevantExtensionKeys.indexOf('kf') > -1) {
      internalSlotsList.push('caseFirst');
    }

    if (relevantExtensionKeys.indexOf('kn') > -1) {
      internalSlotsList.push('numeric');
    }

    if (typeof tag !== 'string' && typeof tag !== 'object') {
      throw new TypeError('tag must be a string or object');
    }

    if (
      typeof tag === 'object' &&
      getInternalSlot(__INTERNAL_SLOT_MAP__, tag, 'initializedLocale')
    ) {
      tag = getInternalSlot(__INTERNAL_SLOT_MAP__, tag, 'locale');
    } else {
      tag = tag.toString() as string;
    }

    if (options === undefined) {
      options = Object.create(null);
    } else {
      options = toObject(options);
    }

    tag = applyOptionsToTag(tag, options);
    const opt = Object.create(null);
    const calendar = getOption(
      options,
      'calendar',
      'string',
      undefined,
      undefined
    );
    if (calendar !== undefined) {
      if (!NUMBERING_SYSTEM_REGEX.test(calendar)) {
        throw new RangeError('invalid calendar');
      }
    }
    opt.ca = calendar;

    const collation = getOption(
      options,
      'collation',
      'string',
      undefined,
      undefined
    );
    if (collation !== undefined) {
      if (!NUMBERING_SYSTEM_REGEX.test(collation)) {
        throw new RangeError('invalid collation');
      }
    }
    opt.co = collation;
    const hc = getOption(
      options,
      'hourCycle',
      'string',
      ['h11', 'h12', 'h23', 'h34'],
      undefined
    );
    opt.hc = hc;
    const kf = getOption(
      options,
      'caseFirst',
      'string',
      ['upper', 'lower', 'false'],
      undefined
    );
    if (kf !== undefined) {
      opt.kn = String(kf);
    }
    const numberingSystem = getOption(
      options,
      'numberingSystem',
      'string',
      undefined,
      undefined
    );
    if (numberingSystem !== undefined) {
      if (!NUMBERING_SYSTEM_REGEX.test(numberingSystem)) {
        throw new RangeError('Invalid numberingSystem');
      }
    }
    opt.nu = numberingSystem;
    const r = applyUnicodeExtensionToTag(tag, opt, relevantExtensionKeys);
    setMultiInternalSlots(__INTERNAL_SLOT_MAP__, this, {
      locale: r.locale,
      calendar: r.ca,
      collation: r.co,
      hourCycle: r.hc,
    });
    if (relevantExtensionKeys.indexOf('kf') > -1) {
      setInternalSlot(__INTERNAL_SLOT_MAP__, this, 'caseFirst', r.kf);
    }
    if (relevantExtensionKeys.indexOf('kn') > -1) {
      setInternalSlot(
        __INTERNAL_SLOT_MAP__,
        this,
        'numeric',
        objectIs(r.kn, 'true')
      );
    }
    setInternalSlot(__INTERNAL_SLOT_MAP__, this, 'numberingSystem', r.nu);
  }

  public maximize() {}

  public minimize() {}

  public toString() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'locale');
  }

  public get baseName() {
    const locale = getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'locale')
    let ast
    try {
      ast = parseUnicodeLocaleId(locale)
    } catch (e) {
      return locale
    }
    return [
      ast.lang.lang,
      ast.lang.script,
      ast.lang.region,
      ...(ast.lang.variants || [])
    ].filter(Boolean).join('-')
  }

  public get calendar() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'calendar');
  }

  public get collation() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'collation');
  }

  public get hourCycle() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'hourCycle');
  }

  public get caseFirst() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'caseFirst');
  }

  public get numeric() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'numeric');
  }
  public get numberingSystem() {
    return getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'numberingSystem');
  }
  public get language() {
    const locale = getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'locale')
    const ast = parseUnicodeLocaleId(locale)
    return ast.lang.lang
  }
  public get script() {
    const locale = getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'locale')
    const ast = parseUnicodeLocaleId(locale)
    return ast.lang.script
  }
  public get region() {
    const locale = getInternalSlot(__INTERNAL_SLOT_MAP__, this, 'locale')
    const ast = parseUnicodeLocaleId(locale)
    return ast.lang.region
  }

  static relevantExtensionKeys = ['ca', 'co', 'hc', 'kf', 'kn', 'nu'];
}

try {
  if (typeof Symbol !== 'undefined') {
    Object.defineProperty(IntlLocale.prototype, Symbol.toStringTag, {
      value: 'Intl.Locale',
      writable: false,
      enumerable: false,
      configurable: true,
    });
  }

  Object.defineProperty(IntlLocale.prototype.constructor, 'length', {
    value: 0,
    writable: false,
    enumerable: false,
    configurable: true,
  });
} catch (e) {
  // Meta fix so we're test262-compliant, not important
}
