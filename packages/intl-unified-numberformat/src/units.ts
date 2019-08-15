declare namespace Intl {
  interface NumberFormatOptions {
    unit: string;
  }
}
/**
 * Returns an Intl.NumberFormat if the unit is supported,
 * or null if unsupported.
 */
function getIntlNumberFormatWithUnit(unit: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'unit',
      unit,
    });
  } catch (e) {
    if (e.constructor !== RangeError) {
      throw e;
    }
    return null;
  }
}
