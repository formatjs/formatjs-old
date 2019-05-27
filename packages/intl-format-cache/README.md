Intl Format Cache
=================

A memoizer factory for Intl format constructors.

[![npm Version][npm-badge]][npm]
[![Build Status][travis-badge]][travis]
[![Dependency Status][david-badge]][david]


Overview
--------

This is a helper package used within [Yahoo's FormatJS suite][FormatJS]. It provides a factory for creating memoizers of [`Intl`][Intl] format constructors: [`Intl.NumberFormat`][Intl-NF], [`Intl.DateTimeFormat`][Intl-DTF], [`IntlMessageFormat`][Intl-MF], and [`IntlRelativeFormat`][Intl-RF].

Creating instances of these `Intl` formats is an expensive operation, and the APIs are designed such that developers should re-use format instances instead of always creating new ones. This package is simply to make it easier to create a cache of format instances of a particular type to aid in their reuse.

Under the hood, this package creates a cache key based on the arguments passed to the memoized constructor (it will even order the keys of the `options` argument) it uses `JSON.stringify()` to create the string key.


Usage
-----

This package works as an ES6 or Node.js module, in either case it has a single default export function; e.g.:

```js
// In an ES6 module.
import memoizeFormatConstructor from 'intl-format-cache';
```

```js
// In Node.
var memoizeFormatConstructor = require('intl-format-cache');
```

This default export is a factory function which can be passed an `Intl` format constructor and it will return a memoizer that will create or reuse an `Intl` format instance and return it.

```js
var getNumberFormat = memoizeFormatConstructor(Intl.NumberFormat);

var nf1 = getNumberFormat('en');
var nf2 = getNumberFormat('en');
var nf3 = getNumberFormat('fr');

console.log(nf1 === nf2); // => true
console.log(nf1 === nf3); // => false

console.log(nf1.format(1000)); // => "1,000"
console.log(nf3.format(1000)); // => "1 000"
```

# Benchmark

```
fast-memoize x 20,932 ops/sec ±1.06% (78 runs sampled)
intl-format-cache x 22,752 ops/sec ±0.42% (95 runs sampled)
--- NumberFormat cache set: Fastest is intl-format-cache ---

fast-memoize x 1,128,833 ops/sec ±0.31% (96 runs sampled)
intl-format-cache x 1,164,874 ops/sec ±0.30% (94 runs sampled)
not cached x 25,721 ops/sec ±0.39% (95 runs sampled)
--- NumberFormat cache get: Fastest is intl-format-cache ---

fast-memoize x 7,498 ops/sec ±35.44% (72 runs sampled)
intl-format-cache x 13,054 ops/sec ±16.64% (84 runs sampled)
--- DateTimeFormat cache set: Fastest is intl-format-cache ---

fast-memoize x 1,166,894 ops/sec ±0.30% (94 runs sampled)
intl-format-cache x 1,097,319 ops/sec ±0.70% (94 runs sampled)
not cached x 15,613 ops/sec ±2.03% (82 runs sampled)
--- DateTimeFormat cache get: Fastest is fast-memoize ---

fast-memoize x 93,746 ops/sec ±0.25% (93 runs sampled)
intl-format-cache x 95,376 ops/sec ±0.43% (96 runs sampled)
--- IntlMessageFormat cache set: Fastest is intl-format-cache ---

fast-memoize x 91,986 ops/sec ±2.50% (91 runs sampled)
intl-format-cache x 696,471 ops/sec ±0.41% (93 runs sampled)
not cached x 125,124 ops/sec ±11.14% (87 runs sampled)
--- IntlMessageFormat cache get: Fastest is intl-format-cache ---
```

License
-------

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][LICENSE] for license text and copyright information.


[npm]: https://www.npmjs.org/package/intl-format-cache
[npm-badge]: https://img.shields.io/npm/v/intl-format-cache.svg?style=flat-square
[david]: https://david-dm.org/formatjs/intl-format-cache
[david-badge]: https://img.shields.io/david/formatjs/intl-format-cache.svg?style=flat-square
[travis]: https://travis-ci.org/formatjs/intl-format-cache
[travis-badge]: https://img.shields.io/travis/formatjs/intl-format-cache/master.svg?style=flat-square
[Intl]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
[Intl-NF]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
[Intl-DTF]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
[Intl-MF]: https://github.com/formatjs/formatjs
[Intl-RF]: https://github.com/formatjs/intl-relativeformat
[FormatJS]: http://formatjs.io/
[LICENSE]: https://github.com/formatjs/intl-format-cache/blob/master/LICENSE
