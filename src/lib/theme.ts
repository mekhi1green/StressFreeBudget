export type ThemePref = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_KEY = 'sfb-theme'
export const THEME_COLORS: Record<ResolvedTheme, string> = { dark: '#1F2833', light: '#EADFCE' }

export function isThemePref(v: unknown): v is ThemePref {
  return v === 'light' || v === 'dark' || v === 'system'
}

export function resolveTheme(pref: ThemePref, systemPrefersDark: boolean): ResolvedTheme {
  if (pref === 'system') return systemPrefersDark ? 'dark' : 'light'
  return pref
}

export function getStoredPref(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY)
    return isThemePref(v) ? v : 'system'
  } catch {
    return 'system'
  }
}

export function storePref(pref: ThemePref): void {
  try {
    localStorage.setItem(THEME_KEY, pref)
  } catch {
    /* private mode / blocked storage: the choice just won't persist */
  }
}

export function applyTheme(pref: ThemePref): ResolvedTheme {
  const dark = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = resolveTheme(pref, dark)
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[resolved])
  return resolved
}
