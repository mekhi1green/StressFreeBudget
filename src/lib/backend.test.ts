import { checkBackend } from './backend'

const ok = (async () => new Response('{}', { status: 200 })) as typeof fetch
const bad = (async () => new Response('no', { status: 401 })) as typeof fetch
const boom = (async () => {
  throw new Error('offline')
}) as typeof fetch

describe('checkBackend', () => {
  it('reports not-configured without url or key', async () => {
    expect(await checkBackend(undefined, 'k', ok)).toBe('not-configured')
    expect(await checkBackend('https://x.supabase.co', '', ok)).toBe('not-configured')
  })
  it('reports online on a 200', async () => {
    expect(await checkBackend('https://x.supabase.co/', 'k', ok)).toBe('online')
  })
  it('reports unreachable on an error status or a network failure', async () => {
    expect(await checkBackend('https://x.supabase.co', 'k', bad)).toBe('unreachable')
    expect(await checkBackend('https://x.supabase.co', 'k', boom)).toBe('unreachable')
  })
})
