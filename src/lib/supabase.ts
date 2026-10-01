import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseUrl = url
export const supabaseKey = key
export const isSupabaseConfigured = Boolean(url && key)

/**
 * Browser client. The anon/publishable key is meant to be public; Row Level Security protects the data.
 * Sign-in is an emailed 6-digit code, so there is no redirect for the client to parse out of the URL
 * (detectSessionInUrl off keeps it from fighting the HashRouter).
 */
export const supabase = isSupabaseConfigured
  ? createClient(url!, key!, { auth: { flowType: 'pkce', detectSessionInUrl: false, persistSession: true } })
  : null
