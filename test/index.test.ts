import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { convertTsxToJsx } from '../src'

describe('should', () => {
  it('exported', async () => {
    await convertTsxToJsx('test/example', 'test/example')
    expect(fs.existsSync('test/example/index.js')).toBeTruthy()
    fs.rmSync('test/example/index.js')
  })
})
