import { applyTheme, getStoredPref, resolveTheme, storePref, THEME_KEY } from './theme'

describe('resolveTheme', () => {
  it('follows the system when set to system', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })
  it('ignores the system for an explicit choice', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })
})

describe('stored preference', () => {
  beforeEach(() => localStorage.clear())
  it('defaults to system and rejects junk values', () => {
    expect(getStoredPref()).toBe('system')
    localStorage.setItem(THEME_KEY, 'purple')
    expect(getStoredPref()).toBe('system')
  })
  it('round-trips a saved choice', () => {
    storePref('dark')
    expect(getStoredPref()).toBe('dark')
  })
})

describe('applyTheme', () => {
  it('toggles the dark class and theme-color meta', () => {
    document.head.innerHTML = '<meta name="theme-color" content="#000000">'
    expect(applyTheme('dark')).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#1F2833')
    expect(applyTheme('light')).toBe('light')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
