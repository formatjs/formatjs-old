import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const resolveConfig = resolve({
  mainFields: ['module', 'main']
});
const uglifyConfig = uglify();
const browserTestPackages = [
  'intl-format-cache',
  'intl-locales-supported',
  'intl-messageformat',
  'intl-relativeformat'
];
export default [
  {
    input: './packages/intl-messageformat/lib/index.js',
    output: {
      sourcemap: true,
      file: './packages/intl-messageformat/dist/intl-messageformat.js',
      format: 'umd',
      name: 'IntlMessageFormat'
    },
    plugins: [resolveConfig]
  },
  {
    input: './packages/intl-messageformat/lib/index.js',
    output: {
      sourcemap: true,
      file: './packages/intl-messageformat/dist/intl-messageformat.min.js',
      format: 'umd',
      name: 'IntlMessageFormat'
    },
    plugins: [resolveConfig, uglifyConfig]
  },
  {
    input: './packages/intl-relativeformat/lib/main.js',
    output: {
      sourcemap: true,
      file: './packages/intl-relativeformat/dist/intl-relativeformat.js',
      format: 'umd',
      name: 'IntlRelativeFormat'
    },
    plugins: [resolveConfig]
  },
  {
    input: './packages/intl-relativeformat/lib/main.js',
    output: {
      sourcemap: true,
      file: './packages/intl-relativeformat/dist/intl-relativeformat.min.js',
      format: 'umd',
      name: 'IntlRelativeFormat'
    },
    plugins: [resolveConfig, uglifyConfig]
  },
  {
    input: './packages/intl-relativeformat/lib/locales.js',
    output: {
      sourcemap: true,
      file:
        './packages/intl-relativeformat/dist/intl-relativeformat-with-locales.js',
      format: 'umd',
      name: 'IntlRelativeFormat'
    },
    plugins: [resolveConfig]
  },
  {
    input: './packages/intl-relativeformat/lib/locales.js',
    output: {
      sourcemap: true,
      file:
        './packages/intl-relativeformat/dist/intl-relativeformat-with-locales.min.js',
      format: 'umd',
      name: 'IntlRelativeFormat'
    },
    plugins: [resolveConfig, uglifyConfig]
  },
  ...browserTestPackages.map(pkg => ({
    input: `./packages/${pkg}/tests/index.ts`,
    output: {
      sourcemap: true,
      file: `functional-tests/${pkg}.js`,
      format: 'umd'
    },
    plugins: [typescript(), resolveConfig, commonjs()]
  })),
];
