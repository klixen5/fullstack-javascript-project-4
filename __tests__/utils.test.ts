import { describe, test, expect } from 'vitest'

import { getFileNameFromUrl } from '../src/utils.js'

describe('getFileNameFromPath', () => {
  test('should convert simple url', () => {
    const name = getFileNameFromUrl('https://example.com')
    expect(name).toBe('example-com.html')
  })

  test('should handle url with path', () => {
    const name = getFileNameFromUrl('https://example.com/path/to/page')
    expect(name).toBe('example-com-path-to-page.html')
  })
})