import path from 'path';
import util from 'util';
import childProcess from 'child_process';
import {readJSON, mkdirp, readdir} from 'fs-extra';
import _rimraf from 'rimraf';
const exec = util.promisify(childProcess.exec);
const rimraf = util.promisify(_rimraf);

const BIN_PATH = path.resolve(__dirname, '../../../bin/formatjs');
const ARTIFACT_PATH = path.resolve(__dirname, 'test_artifacts');

beforeEach(async () => {
  await mkdirp(path.join(__dirname, 'test_artifacts'));
  await rimraf(ARTIFACT_PATH);
});

test('basic case: help', async () => {
  const {stdout, stderr} = await exec(`${BIN_PATH} extract --help`);
  expect(stdout).toMatchSnapshot();
  expect(stderr).toBe('');
});

test('basic case: defineMessages -> stdout', async () => {
  const {stdout, stderr} = await exec(
    `${BIN_PATH} extract ${path.join(__dirname, 'defineMessages/actual.js')}`
  );
  const expectedOutput = await readJSON(
    path.join(__dirname, 'defineMessages/actual.json')
  );
  expect(JSON.parse(stdout)).toEqual(expectedOutput);
  expect(stderr).toBe('');
});

test('basic case: defineMessages -> directory', async () => {
  process.chdir(__dirname);
  const {stdout, stderr} = await exec(
    `${BIN_PATH} extract defineMessages/actual.js --messages-dir ${ARTIFACT_PATH}`
  );
  expect(stdout).toBe('');
  expect(stderr).toBe('');
  // Write to test_artifacts/defineMessages/actual.json
  expect(await readdir(path.join(ARTIFACT_PATH, 'defineMessages'))).toEqual([
    'actual.json',
  ]);
  expect(
    await readJSON(path.join(ARTIFACT_PATH, 'defineMessages/actual.json'))
  ).toEqual(await readJSON(path.join(__dirname, 'defineMessages/actual.json')));
});

test('typescript -> stdout', async () => {
  const {stdout, stderr} = await exec(
    `${BIN_PATH} extract ${path.join(__dirname, 'typescript/actual.tsx')}`
  );
  const expectedOutput = await readJSON(
    path.join(__dirname, 'typescript/actual.json')
  );
  expect(JSON.parse(stdout)).toEqual(expectedOutput);
  expect(stderr).toBe('');
});
