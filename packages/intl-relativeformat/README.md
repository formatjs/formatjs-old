# THIS PACKAGE HAS BEEN DEPRECATED

# Migration Guide

This package has deviated from the [`Intl.RelativeTimeFormat` spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) rather heavily. Therefore, we've deprecated this package and add [`@formatjs/intl-relativetimeformat](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat) as the spec-compliant polyfill.

1. All `units` (such as `day-short`) should be migrated similarly to:

```ts
new IntlRelativeFormat('en', { units: 'second-short' }).format(
  Date.now() - 1000
);
// will be
new Intl.RelativeTimeFormat('en', { style: 'short' }).format(-1, 'second');

new IntlRelativeFormat('en', { units: 'day-narrow' }).format(
  Date.now() - 48 * 3600 * 1000
);
// will be
new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(-2, 'day');
```

2. `style: numeric` will become `numeric: always` per spec (which is also the default)

```ts
new IntlRelativeFormat('en', {
  units: 'second-short',
  style: 'numeric'
}).format(Date.now() - 1000);
// will be
new Intl.RelativeTimeFormat('en', { style: 'short' }).format(-1, 'second');
```

```ts
new IntlRelativeFormat('en', { units: 'day-narrow', style: 'numeric' }).format(
  Date.now() - 48 * 3600 * 1000
);
// will be
new Intl.RelativeTimeFormat('en', { style: 'narrow' }).format(-2, 'day');
```

3. `style: 'best fit'` is a little trickier but we have released `@formatjs/intl-utils` to ease the transition:

```ts
new IntlRelativeFormat('en', { style: 'best fit' }).format(Date.now() - 1000);
// will be
import { selectUnit } from '@formatjs/intl-utils';
const diff = selectUnit(Date.now() - 1000);
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
  diff.value,
  diff.unit
);
```

```ts
new IntlRelativeFormat('en', { style: 'best fit' }).format(
  Date.now() - 48 * 3600 * 1000
);
// will be
import { selectUnit } from '@formatjs/intl-utils';
const diff = selectUnit(Date.now() - 48 * 3600 * 1000);
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
  diff.value,
  diff.unit
);
```

4. If you were using `options.now` in `format`, you can use `formatjs/intl-utils` to transition as well

```ts
new IntlRelativeFormat('en', { style: 'best fit' }).format(Date.now() - 1000, {
  now: Date.now() + 1000
});
// will be
import { selectUnit } from '@formatjs/intl-utils';
const diff = selectUnit(Date.now() - 1000, Date.now() + 1000);
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
  diff.value,
  diff.unit
);
```

```ts
new IntlRelativeFormat('en', { style: 'best fit' }).format(
  Date.now() - 48 * 3600 * 1000,
  { now: Date.now() + 1000 }
);
// will be
import { selectUnit } from '@formatjs/intl-utils';
const diff = selectUnit(Date.now() - 48 * 3600 * 1000, Date.now() + 1000);
new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
  diff.value,
  diff.unit
);
```

# Intl RelativeFormat

Formats JavaScript dates to relative time strings (e.g., "3 hours ago").

[![npm Version][npm-badge]][npm]

## Overview

### Goals

This package aims to provide a way to format different variations of relative time. You can use this package in the browser and on the server via Node.js.

This implementation is very similar to [moment.js][], in concept, although it provides only formatting features based on the Unicode [CLDR][] locale data, an industry standard that supports more than 200 languages.

### How It Works

```js
var rf = new IntlRelativeFormat(locales, [options]);
```

The `locales` can either be a single language tag, e.g., `"en-US"` or an array of them from which the first match will be used. `options` provides a way to control the output of the formatted relative time string.

```js
var output = rf.format(someDate, [options]);
```

### Common Usage Example

The most common way to use this library is to construct an `IntlRelativeFormat` instance and reuse it many times for formatting different date values; e.g.:

```js
var rf = new IntlRelativeFormat('en-US');

var posts = [
  {
    id: 1,
    title: 'Some Blog Post',
    date: new Date(1426271670524)
  },
  {
    id: 2,
    title: 'Another Blog Post',
    date: new Date(1426278870524)
  }
];

posts.forEach(function(post) {
  console.log(rf.format(post.date));
});
// => "3 hours ago"
// => "1 hour ago"
```

### Features

- Style options for `"best fit"` ("yesterday") and `"numeric"` ("1 day ago") output based on thresholds.

- Units options for always rendering in a particular unit; e.g. "30 days ago", instead of "1 month ago".

- Ability to specify the "now" value from which the relative time is calculated, allowing `format()`.

- Format output in relative time strings using [`Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)

- Optimized for repeated calls to an `IntlRelativeFormat` instance's `format()` method.

## Usage

### `Intl` Dependency

This package assumes the following capabilities from `Intl`:

1. [`Intl.PluralRules`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules)
2. [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat)

If your environment does not support those, feel free to grab polyfills:

1. https://www.npmjs.com/package/intl-pluralrules
2. https://www.npmjs.com/package/@formatjs/intl-relativetimeformat

### Loading IntlRelativeFormat in Node.js

Install package and polyfill:

```bash
npm install intl-relativeformat --save
```

Simply `require()` this package:

```js
var IntlRelativeFormat = require('intl-relativeformat');
var rf = new IntlRelativeFormat('en');
var output = rf.format(dateValue);
```

### Bundling IntlRelativeFormat with Browserify/Webpack/Rollup

Install package:

```bash
npm install intl-relativeformat --save
```

Simply `require()` this package and the specific locales you wish to support in the bundle:

```js
var IntlRelativeFormat = require('intl-relativeformat');
```

_Note: in Node.js, the data for all 200+ languages is loaded along with the library, but when bundling it with Browserify/Webpack, the data is intentionally ignored (see `package.json` for more details) to avoid blowing up the size of the bundle with data that you might not need._

### Public API

#### `IntlRelativeFormat` Constructor

To format a date to relative time, use the `IntlRelativeFormat` constructor. The constructor takes two parameters:

- **locales** - _{String | String[]}_ - A string with a BCP 47 language tag, or an array of such strings. If you do not provide a locale, the default locale will be used. When an array of locales is provided, each item and its ancestor locales are checked and the first one with registered locale data is returned. **See: [Locale Resolution](#locale-resolution) for more details.**

- **[options]** - _{Object}_ - Optional object with user defined options for format styles.
  **See: [Custom Options](#custom-options) for more details.**

_Note: The `rf` instance should be enough for your entire application, unless you want to use custom options._

#### Locale Resolution

`IntlRelativeFormat` uses a locale resolution process similar to that of the built-in `Intl` APIs to determine which locale data to use based on the `locales` value passed to the constructor. The result of this resolution process can be determined by call the `resolvedOptions()` prototype method.

The following are the abstract steps `IntlRelativeFormat` goes through to resolve the locale value:

- If no extra locale data is loaded, the locale will _always_ resolved to `"en"`.

- If locale data is missing for a leaf locale like `"fr-FR"`, but there _is_ data for one of its ancestors, `"fr"` in this case, then its ancestor will be used.

- If there's data for the specified locale, then that locale will be resolved; i.e.,

  ```js
  var rf = new IntlRelativeFormat('en-US');
  assert(rf.resolvedOptions().locale === 'en-US'); // true
  ```

- The resolved locales are now normalized; e.g., `"en-us"` will resolve to: `"en-US"`.

_Note: When an array is provided for `locales`, the above steps happen for each item in that array until a match is found._

#### Custom Options

The optional second argument `options` provides a way to customize how the relative time will be formatted.

##### Units

By default, the relative time is computed to the best fit unit, but you can explicitly call it to force `units` to be displayed in `"second"`, `"second-short"`, `"second-narrow"`, `"minute"`, `"minute-short"`, `"minute-narrow"`, `"hour"`, `"hour-short"`, `"hour-narrow"`, `"day"`, `"day-short"`, `"day-narrow"`, `"month"`, `"month-short"`, `"month-narrow"`, `"year"`, `"year-short"` or `"year-narrow"`:

```js
var rf = new IntlRelativeFormat('en', {
  units: 'day'
});
var output = rf.format(dateValue);
```

As a result, the output will be "70 days ago" instead of "2 months ago".

##### Style

By default, the relative time is computed as `"best fit"`, which means that instead of "1 day ago", it will display "yesterday", or "in 1 year" will be "next year", etc. But you can force to always use the "numeric" alternative:

```js
var rf = new IntlRelativeFormat('en', {
  style: 'numeric'
});
var output = rf.format(dateValue);
```

As a result, the output will be "1 day ago" instead of "yesterday".

#### `resolvedOptions()` Method

This method returns an object with the options values that were resolved during instance creation. It currently only contains a `locale` property; here's an example:

```js
var rf = new IntlRelativeFormat('en-us');
console.log(rf.resolvedOptions().locale); // => "en-US"
```

Notice how the specified locale was the all lower-case value: `"en-us"`, but it was resolved and normalized to: `"en-US"`.

#### `format(date, [options])` Method

The format method (_which takes a JavaScript date or timestamp_) and optional `options` arguments will compare the `date` with "now" (or `options.now`), and returns the formatted string; e.g., "3 hours ago" in the corresponding locale passed into the constructor.

```js
var output = rf.format(new Date());
console.log(output); // => "now"
```

If you wish to specify a "now" value, it can be provided via `options.now` and will be used instead of querying `Date.now()` to get the current "now" value.

## License

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][license] for license text and copyright information.

[npm]: https://www.npmjs.org/package/intl-relativeformat
[npm-badge]: https://img.shields.io/npm/v/intl-relativeformat.svg?style=flat-square
[parser]: https://github.com/formatjs/formatjs
[cldr]: http://cldr.unicode.org/
[intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[intl-nf]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
[intl-dtf]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[intl-node]: https://github.com/joyent/node/issues/6371
[intl.js]: https://github.com/andyearnshaw/Intl.js
[rawgit]: https://rawgit.com/
[semver]: http://semver.org/
[license]: https://github.com/formatjs/formatjs/blob/master/LICENSE
[moment.js]: http://momentjs.com/
[ecma 402]: http://www.ecma-international.org/ecma-402/1.0/index.html
[datetimeformat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[numberformat]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
