import { it, expect } from 'vitest';

import { generateFilename } from '../src/utils.js';

it('корректно формирует имя файла с простым url', () => {
  const result = generateFilename('https://example.com', 'html');
  expect(result).toBe('example-com.html');
});

it('не добавляет дефис для корневого пути', () => {
  const result = generateFilename('https://example.com/', 'html');
  expect(result).toBe('example-com.html');
});

it('url с query параметрами', () => {
  const result = generateFilename('https://example.com/?name=Nikolay', 'html');
  expect(result).toBe('example-com-name-Nikolay.html');
});