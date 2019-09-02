import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

const resolveConfig = resolve({
  mainFields: ['module', 'main']
});
const uglifyConfig = uglify();
export default [
  {
    input: './lib/index.js',
    output: {
      sourcemap: true,
      file: 'dist/umd/intl-pluralrules.js',
      format: 'umd',
      exports: 'named',
      name: 'IntlPluralRules'
    },
    plugins: [resolveConfig]
  },
  {
    input: './lib/index.js',
    output: {
      sourcemap: true,
      file: 'dist/umd/intl-pluralrules.min.js',
      format: 'umd',
      exports: 'named',
      name: 'IntlPluralRules'
    },
    plugins: [resolveConfig, uglifyConfig]
  },
  {
    input: './lib/locales.js',
    output: {
      sourcemap: true,
      file: 'dist/umd/intl-pluralrules-with-locales.js',
      format: 'umd',
      exports: 'named',
      name: 'IntlPluralRules'
    },
    plugins: [resolveConfig]
  },
  {
    input: './lib/locales.js',
    output: {
      sourcemap: true,
      file: 'dist/umd/intl-pluralrules-with-locales.min.js',
      format: 'umd',
      exports: 'named',
      name: 'IntlPluralRules'
    },
    plugins: [resolveConfig, uglifyConfig]
  },
];