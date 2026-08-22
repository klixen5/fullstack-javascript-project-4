import { describe, test, expect, beforeEach, afterEach, beforeAll } from 'vitest'
import nock from 'nock'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

import htmlLoader, { getFileNameHtml, fetchHtml } from '../src/htmlLoader.js'

const { dirname: __dirname } = import.meta

const getFixturePath = (dir: string, file: string) => path.join(__dirname, '__fixtures__', dir, file)

let htmlNock = ''

beforeAll(async () => {
  htmlNock = (await fs.readFile(getFixturePath('mockHtml', 'first.html'), 'utf-8')).trim()
})

describe('getFileNameHtml', () => {
  test('составляет корректное имя без пути к ресурсу', () => {
    const url = 'https://example.com'
    expect(getFileNameHtml(url)).toBe('example-com.html')
  })

  test('составляет корректное имя с путём у ресурсу', () => {
    const url = 'https://ru.hexlet.io/courses'
    expect(getFileNameHtml(url)).toBe('ru-hexlet-io-courses.html')
  })
})

describe('fetchHtml', () => {
  beforeEach(() => {
    nock('https://ru.hexlet.io')
      .get('/courses')
      .reply(200, htmlNock)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('Выолняется запрос, получаются корректные данные', async () => {
    const data = await fetchHtml('https://ru.hexlet.io/courses')
    expect(data.trim()).toBe(htmlNock)
  })
})

describe('htmlLoader', () => {
  let tmpDir = ''
  
  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'), 'utf-8')
    nock('https://ru.hexlet.io')
      .get('/courses')
      .reply(200, htmlNock)
  })

  afterEach(async () => {
    nock.cleanAll()
    await fs.rm(tmpDir, { recursive: true, force: true })
  })

  test('выполняется загрузка html, возвращается корректный путь к файлу', async () => {
    const fullPath = await htmlLoader('https://ru.hexlet.io/courses', tmpDir)
    expect(fullPath).toBe(path.join(tmpDir, 'ru-hexlet-io-courses.html'))

    const fileData = (await fs.readFile(fullPath, 'utf-8')).trim()
    expect(fileData).toBe(htmlNock)
  })
})


