import path from 'node:path';
import fsp from 'node:fs/promises';
import os from 'node:os';

import { it, expect, beforeEach, afterEach } from 'vitest';

import saveFile from '../src/storage.js';

const { dirname } = import.meta;
const getFixture = (filename: string): string => path.join(dirname, '__fixtures__', filename);

let tmpDirPath: string;
let data: string;


beforeEach(async () => {
  data = (await fsp.readFile(getFixture('page.html'), { encoding: 'utf-8' })).trim();
  tmpDirPath = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

afterEach(async () => {
  await fsp.rm(tmpDirPath, { force: true, recursive: true });
});

it('корректно записывает в файл', async () => {
  await saveFile(path.join(tmpDirPath, 'example.html'), data);
  const result = await fsp.readFile(path.join(tmpDirPath, 'example.html'), { encoding: 'utf-8' });
  expect(result).toBe(data);
});