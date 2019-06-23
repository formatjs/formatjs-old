import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { cpus } from 'os';

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
const args = [
  '--reporter-keys',
  'file,attrs,result',
  '-t',
  String(cpus().length),
  '--prelude',
  './dist/polyfill-with-locales.js',
  '-r',
  'json',
  resolve(__dirname, '../../../test262/test/intl402/RelativeTimeFormat/**/*.js')
];
console.log(`Running "test262-harness ${args.join(' ')}"`);
const result = spawnSync('test262-harness', args, {
  cwd: resolve(__dirname, '..'),
  env: process.env,
  encoding: 'utf-8'
});

const json: TestResult[] = JSON.parse(result.stdout);
const failedTests = json.filter(r => !r.result.pass);
json.forEach(t => {
  if (t.result.pass) {
    console.log(`✓ ${t.attrs.description}`);
  } else {
    console.log('\n\n');
    console.log(`🗴 ${t.attrs.description}`);
    console.log(`\t ${t.result.message}`);
    console.log('\t', resolve(__dirname, '..', t.file));
    console.log('\n\n');
  }
});
if (failedTests.length) {
  console.log(
    `Tests: ${failedTests.length} failed, ${json.length -
      failedTests.length} passed, ${json.length} total`
  );
  process.exit(1);
}
console.log(
  `Tests: ${json.length - failedTests.length} passed, ${json.length} total`
);
