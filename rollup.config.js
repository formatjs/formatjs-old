import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
const resolveConfig = resolve({
  customResolveOptions: {
    '@formatjs/intl-pluralrules': './packages/intl-pluralrules',
    '@formatjs/intl-relativetimeformat': './packages/intl-relativetimeformat',
    '@formatjs/intl-utils': './packages/intl-utils',
    'intl-messageformat': './packages/intl-messageformat',
  },
});
export default [
  {
    input: './tests/index.ts',
    output: {
      sourcemap: true,
      file: 'tests/browser.js',
      format: 'umd',
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('test'),
        'process.version': JSON.stringify(''),
      }),
      resolveConfig,
      typescript({
        tsconfigDefaults: {
          compilerOptions: {
            module: 'esnext',
            declaration: false,
          },
        },
      }),
      commonjs(),
    ],
  },
];
