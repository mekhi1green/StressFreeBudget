const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

/** Money is stored as integer cents; format only at the edge. */
export function formatCents(cents: number): string {
  return usd.format(cents / 100)
}

/** Parse user input like "$1,234.50" into integer cents. Returns null if it isn't a valid amount. */
export function parseCents(input: string): number | null {
  const cleaned = input.replace(/[$,\s]/g, '')
  if (!/^-?\d*\.?\d{0,2}$/.test(cleaned) || cleaned === '' || cleaned === '-' || cleaned === '.') return null
  return Math.round(Number(cleaned) * 100)
}
