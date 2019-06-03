import IntlRelativeTimeFormat from '.';
declare global {
  namespace Intl {
    var RelativeTimeFormat: typeof IntlRelativeTimeFormat;
  }
}
if (
  typeof Intl !== 'undefined' &&
  typeof Intl.RelativeTimeFormat !== 'undefined'
) {
  Intl.RelativeTimeFormat = IntlRelativeTimeFormat;
}
