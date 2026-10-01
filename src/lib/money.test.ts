import { formatCents, parseCents } from './money'

describe('money', () => {
  it('formats cents as US dollars', () => {
    expect(formatCents(123456)).toBe('$1,234.56')
    expect(formatCents(-500)).toBe('-$5.00')
    expect(formatCents(0)).toBe('$0.00')
  })
  it('parses typed amounts to integer cents without float drift', () => {
    expect(parseCents('$1,234.50')).toBe(123450)
    expect(parseCents('0.1')).toBe(10)
    expect(parseCents('19.99')).toBe(1999)
    expect(parseCents('12')).toBe(1200)
  })
  it('rejects non-amounts', () => {
    expect(parseCents('abc')).toBeNull()
    expect(parseCents('')).toBeNull()
    expect(parseCents('1.234')).toBeNull()
  })
})
