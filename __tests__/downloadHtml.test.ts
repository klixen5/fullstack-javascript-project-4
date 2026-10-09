import path from 'node:path';
import fsp from 'node:fs/promises';

import nock from 'nock';

import { it, expect, beforeEach, afterEach } from 'vitest';

import downloadHtml from '../src/downloadHtml.js';

const { dirname } = import.meta;
const getFixture = (filename: string): string => path.join(dirname, '__fixtures__', filename);

let html: string;
let url: string;
let scope: nock.Scope;

beforeEach(async () => {
  html = (await fsp.readFile(getFixture('page.html'), { encoding: 'utf-8' })).trim();
  url = 'https://example.com';
  scope = nock(url).get('/').reply(200, html);
});

afterEach(() => {
  nock.cleanAll();
});

it('Возвращает html страницу', async () => {
  const result = await downloadHtml(url);
  expect(scope.isDone()).toBe(true);
  expect(result).toBe(html);
});