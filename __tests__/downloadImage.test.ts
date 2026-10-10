import path from 'node:path';
import fsp from 'node:fs/promises';

import nock from 'nock';

import { it, expect, beforeEach, afterEach } from 'vitest';

import { downloadImage } from '../src/downloader.js';

const { dirname } = import.meta;
const getFixture = (filename: string): string => path.join(dirname, '__fixtures__', filename);

let image: Buffer;
let url: string;
let scope: nock.Scope;

beforeEach(async () => {
  image = await fsp.readFile(getFixture('nodejs.png'));
  url = 'https://example.com';
  scope = nock(url).get('/nodejs.png').reply(200, image, {
    'Content-Type': 'image/png'
  });
});

afterEach(() => nock.cleanAll());

it('Возвращает картинку', async () => {
  const result = await downloadImage(`${url}/nodejs.png`);
  expect(scope.isDone()).toBe(true);
  expect(result).toEqual(image);
});

