import { describe, expect, it } from 'vitest'
import { partRegex } from './partRegex'

describe('error handling', async () => {
  it('basic', async () => {
    const productEditPageUrl = partRegex`/product/${/[0-9]+/}/edit`
    expect(productEditPageUrl.test('/product/42/edit')).toBe(true)
  })
  it('conditional', async () => {
    const userPageUrl = (isSettingsPage: boolean) => partRegex`/user/${/[a-zA-Z]+/}${isSettingsPage ? '/settings' : ''}`
    expect(userPageUrl(true).test('/user/brillout/settings')).toBe(true)
    expect(userPageUrl(false).test('/user/turing')).toBe(true)
  })
  it('recursive', async () => {
    const productEditPageUrl = partRegex`/product/${partRegex`${/[0-9]+/}/edit`}`
    expect(productEditPageUrl.test('/product/42/edit')).toBe(true)
  })
  it('flags', async () => {
    expect(partRegex`line1${/.*/s}line4`.test(['line1', 'line2', 'line3', 'line4'].join('\n'))).toBe(true)
  })
})
