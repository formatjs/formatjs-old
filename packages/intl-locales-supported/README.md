# intl-locales-supported

Utility to help you polyfill the Node.js runtime when the [`Intl`][intl] APIs are missing, or if the built-in `Intl` is missing locale data that you need.

[![npm Version][npm-badge]][npm]

## Usage

```js
var areIntlLocalesSupported = require('intl-locales-supported');

var localesMyAppSupports = [
  /* list locales here */
];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors we need with the polyfill's.
    require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}
```

For more details, see the [FormatJS guide on polyfillying `Intl` in Node.js](http://formatjs.io/guides/runtime-environments/#polyfill-node).

## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][license] for license text and copyright information.

[npm]: https://www.npmjs.org/package/intl-locales-supported
[npm-badge]: https://img.shields.io/npm/v/intl-locales-supported.svg?style=flat-square
[intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[formatjs]: http://formatjs.io/
[license]: https://github.com/formatjs/formatjs/blob/master/LICENSE
