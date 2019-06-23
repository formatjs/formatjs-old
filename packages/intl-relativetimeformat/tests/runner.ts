import { spawnSync } from 'child_process';
import { resolve } from 'path';
const result = spawnSync(
  resolve(__dirname, '../../../node_modules/.bin/test262-harness'),
  [
    '--reporter-keys',
    'file,attrs,result',
    '-t',
    '4',
    '--prelude',
    './dist/polyfill-with-locales.js',
    '-r',
    'json',
    resolve(
      __dirname,
      '../../../test262/test/intl402/RelativeTimeFormat/**/*.js'
    )
  ],
  {
    cwd: resolve(__dirname, '..'),
    env: process.env,
    encoding: 'utf-8'
  }
);

interface TestResult {
  file: string;
  attrs: {
    esid: string;
    description: string;
    info: string;
    features: string[];
    flags: object;
    includes: string[];
  };
  result: {
    pass: boolean;
    message?: string;
  };
}

const json: TestResult[] = JSON.parse(result.stdout);
const failedTests = json.filter(r => !r.result.pass);
if (failedTests.length) {
  failedTests.forEach(result => {
    console.log('[FAILED]', result.result.message);
    console.log(resolve(__dirname, '..', result.file));
    console.log('---------------------------');
  });
  process.exit(1);
}
