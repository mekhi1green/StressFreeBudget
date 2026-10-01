import { useEffect, useState } from 'react'
import { checkBackend, type BackendStatus as Status } from '../lib/backend'
import { supabaseKey, supabaseUrl } from '../lib/supabase'

const LABEL: Record<Status | 'checking', string> = {
  checking: 'Checking backend...',
  'not-configured': 'Backend not configured yet',
  online: 'Backend connected',
  unreachable: 'Backend unreachable',
}
const DOT: Record<Status | 'checking', string> = {
  checking: 'bg-muted',
  'not-configured': 'bg-warning',
  online: 'bg-positive',
  unreachable: 'bg-danger',
}

export function BackendStatus() {
  const [status, setStatus] = useState<Status | 'checking'>('checking')
  useEffect(() => {
    let live = true
    checkBackend(supabaseUrl, supabaseKey).then((s) => live && setStatus(s))
    return () => {
      live = false
    }
  }, [])
  return (
    <p role="status" className="flex items-center gap-2 text-sm text-muted">
      <span aria-hidden className={`size-2.5 rounded-full ${DOT[status]}`} />
      {LABEL[status]}
    </p>
  )
}
