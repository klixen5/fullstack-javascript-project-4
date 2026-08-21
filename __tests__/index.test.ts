import { test, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import nock from 'nock'

import loader from '../src/index.js'

let mkPath: string

beforeEach(async () => {
  mkPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
})

afterEach(() => {
  nock.cleanAll()
})



test('should download page', async () => {
  nock('https://example.com')
    .get('/')
    .reply(200, '<h1>Hello, World!</h1>')

  const filePath = await loader('https://example.com', mkPath)
  const dataSolutionFile = (await fs.readFile(filePath, 'utf-8')).trim()
  const expected = (await fs.readFile('./__tests__/__fixtures__/expected.html', 'utf-8')).trim()
  expect(dataSolutionFile).toBe(expected)
})