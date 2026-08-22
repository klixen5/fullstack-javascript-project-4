import { test, expect, afterEach } from 'vitest'

import nock from 'nock'

import fetcher from '../src/fetcher.js'

afterEach(() => {
  nock.cleanAll()
})

test('возвращает данные корректно', async () => {
  nock('http://example.com')
    .get('/')
    .reply(200, '<h1>Hello, World!</h1>')
 
  await expect(fetcher('http://example.com')).resolves.toBe('<h1>Hello, World!</h1>')
})