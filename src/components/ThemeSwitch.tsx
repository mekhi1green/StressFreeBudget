import { useEffect, useState } from 'react'
import { applyTheme, getStoredPref, storePref, type ThemePref } from '../lib/theme'

const OPTIONS: { value: ThemePref; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Auto' },
]

export function ThemeSwitch() {
  const [pref, setPref] = useState<ThemePref>(getStoredPref)

  useEffect(() => {
    applyTheme(pref)
    if (pref !== 'system') return
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [pref])

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="inline-flex rounded-xl border border-line bg-surface p-1"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={pref === o.value}
          onClick={() => {
            storePref(o.value)
            setPref(o.value)
          }}
          className={`min-h-11 min-w-16 rounded-lg px-4 text-sm font-semibold transition-colors ${
            pref === o.value ? 'bg-primary text-on-primary' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
