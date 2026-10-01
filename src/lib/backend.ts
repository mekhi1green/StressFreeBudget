export type BackendStatus = 'not-configured' | 'online' | 'unreachable'

/** Pings the Supabase auth health endpoint. Used for the status line and to confirm setup. */
export async function checkBackend(
  url: string | undefined,
  key: string | undefined,
  fetchImpl: typeof fetch = fetch,
): Promise<BackendStatus> {
  if (!url || !key) return 'not-configured'
  try {
    const res = await fetchImpl(`${url.replace(/\/+$/, '')}/auth/v1/health`, { headers: { apikey: key } })
    return res.ok ? 'online' : 'unreachable'
  } catch {
    return 'unreachable'
  }
}
