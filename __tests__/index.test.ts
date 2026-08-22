import { test, expect, beforeEach, afterEach } from 'vitest'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import nock from 'nock'
import { fileURLToPath } from 'url'

import loader from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (dir: string, file: string) => path.join(__dirname, '__fixtures__', dir, file)

let mkPath: string

beforeEach(async () => {
  mkPath = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
  return async () => {
    await fs.rm(mkPath, { recursive: true, force: true })
  }
})

afterEach(() => {
  nock.cleanAll()
})



test('should download page', async () => {
  const exampleMockData = (await fs.readFile(getFixturePath('mockHtml', 'example.html'), 'utf-8')).trim()
  const hexletMockData = (await fs.readFile(getFixturePath('mockHtml', 'hexlet.html'), 'utf-8')).trim()
  nock('https://example.com')
    .get('/')
    .reply(200, exampleMockData)

  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, hexletMockData)

  const [name1, name2] = await Promise.all([loader('https://example.com', mkPath), loader('https://ru.hexlet.io/courses', mkPath)])
  const data1 = (await fs.readFile(name1, 'utf-8')).trim()
  const data2 = (await fs.readFile(name2, 'utf-8')).trim()
  const expectData1 = (await fs.readFile(getFixturePath('expected', 'example.html'), 'utf-8')).trim()
  const expectData2 = (await fs.readFile(getFixturePath('expected', 'hexlet.html'), 'utf-8')).trim()
  expect(data1).toBe(expectData1)
  expect(data2).toBe(expectData2)
})