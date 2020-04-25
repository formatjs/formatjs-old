---
id: runtime-requirements
title: Runtime Requirements
---

**We support IE11 & 2 most recent versions of Edge, Chrome & Firefox.**

React Intl relies on these `Intl` APIs:

- [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat): Available on IE11+
- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat): Available on IE11+
- [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules): This can be polyfilled using [this package](https://www.npmjs.com/package/@formatjs/intl-pluralrules).
- [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat): This can be polyfilled using [this package](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat).
- (Optional) [Intl.DisplayNames][displaynames-spec]: Required if you use [`formatDisplayName`](API.md#formatdisplayname)
  or [`FormattedDisplayName`](Components.md#formatteddisplayname). This can be polyfilled using [this package][displaynames-polyfill].

  [displaynames-spec]: https://tc39.es/proposal-intl-displaynames/
  [displaynames-polyfill]: https://www.npmjs.com/package/@formatjs/intl-displaynames

If you need to support older browsers, we recommend you do the following:

1. Polyfill `Intl.NumberFormat` with https://github.com/andyearnshaw/Intl.js
2. Polyfill `Intl.DateTimeFormat` with https://github.com/formatjs/date-time-format-timezone
3. If you're supporting browsers that do not have [Intl.PluralRules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules) (e.g IE11 & Safari 12-), include this [polyfill](https://www.npmjs.com/package/@formatjs/intl-pluralrules) in your build.

```tsx
if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/dist/locale-data/de'); // Add locale data for de
}
```

4. If you're supporting browsers that do not have [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RelativeTimeFormat) (e.g IE11, Edge, Safari 12-), include this [polyfill](https://www.npmjs.com/package/@formatjs/intl-relativetimeformat) in your build along with individual CLDR data for each locale you support.

```tsx
if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/dist/locale-data/de'); // Add locale data for de
}
```

5. If you need `Intl.DisplayNames`, include this [polyfill][displaynames-polyfill] in your build along
   with individual CLDR data for each locale you support.

```tsx
if (!Intl.DisplayNames) {
  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/dist/locale-data/de'); // Add locale data for de
}
```

### Browser

We officially support IE11 along with 2 most recent versions of Edge, Chrome & Firefox.

### Node.js

#### full-icu

Starting with Node.js 13.0.0 full-icu is supported by default.

If using React Intl in an earlier version of Node.js, your `node` binary has to either:

- Get compiled with `full-icu` using these [instructions](https://nodejs.org/api/intl.html)

**OR**

- Uses [`full-icu` npm package](https://www.npmjs.com/package/full-icu)

If your `node` version is missing any of the `Intl` APIs above, you'd have to polyfill them accordingly.

### React Native

If you're using `react-intl` in React Native, make sure your runtime has built-in `Intl` support (similar to [JSC International variant](https://github.com/react-native-community/jsc-android-buildscripts#international-variant)). See these issues for more details:

- https://github.com/formatjs/react-intl/issues/1356
- https://github.com/formatjs/react-intl/issues/992

#### React Native on iOS

If you cannot use the Intl variant of JSC (e.g on iOS), follow the instructions in [Runtime Requirements](#runtime-requirements) to polyfill those APIs accordingly.
