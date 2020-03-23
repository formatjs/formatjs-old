# babel-plugin-react-intl

Extracts string messages for translation from modules that use [React Intl][].

## Dependencies

### React Intl

This Babel plugin works with React Intl v2.x

### Babel

- **3.x** of this plugin works with Babel 7
- **2.x** works with Babel 6
- **1.x** works with Babel 5

## Installation

```sh
$ npm install babel-plugin-react-intl
```

## Usage

**This Babel plugin only visits ES6 modules which `import` React Intl.**

The default message descriptors for the app's default language will be extracted from: `defineMessages()`, `<FormattedMessage>`; all of which are named exports of the React Intl package.

If a message descriptor has a `description`, it'll be removed from the source after it's extracted to save bytes since it isn't used at runtime.

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": [
    [
      "react-intl",
      {
        "messagesDir": "./build/messages/"
      }
    ]
  ]
}
```

#### Options

- **`messagesDir`**: The target location where the plugin will output a `.json` file corresponding to each component from which React Intl messages were extracted. If not provided, the extracted message descriptors will only be accessible via Babel's API.

- **`extractSourceLocation`**: Whether the metadata about the location of the message in the source file should be extracted. If `true`, then `file`, `start`, and `end` fields will exist for each extracted message descriptors. Defaults to `false`.

- **`moduleSourceName`**: The ES6 module source name of the React Intl package. Defaults to: `"react-intl"`, but can be changed to another name/path to React Intl.

- **`overrideIdFn`**: A function with the signature `(id: string, defaultMessage: string, description: string|object) => string` which allows you to override the ID both in the extracted javascript and messages.

- **`removeDefaultMessage`**: Remove `defaultMessage` field in generated js after extraction.

- **`additionalComponentNames`**: Additional component names to extract messages from, e.g: `['FormattedFooBarMessage']`. **NOTE**: By default we check for the fact that `FormattedMessage` are imported from `moduleSourceName` to make sure variable alias works. This option does not do that so it's less safe.

- **`extractFromFormatMessageCall`**: Opt-in to extract from `intl.formatMessage` call with the same restrictions, e.g: has to be called with object literal such as `intl.formatMessage({ id: 'foo', defaultMessage: 'bar', description: 'baz'})`

- **`outputEmptyJson`**: output file with empty `[]` if src has no messages. For build systems like bazel that relies on specific output mapping, not writing out a file can cause issues.

### Via Node API

The extract message descriptors are available via the `metadata` property on the object returned from Babel's `transform()` API:

```javascript
require('@babel/core').transform('code', {
  plugins: ['react-intl'],
}); // => { code, map, ast, metadata['react-intl'].messages };
```

[react intl]: http://formatjs.io/react/
