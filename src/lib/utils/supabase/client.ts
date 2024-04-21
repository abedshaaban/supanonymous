import { createBrowserClient } from '@supabase/ssr'
import { ENV } from '~constants/env'
import type { Database } from '~types/supabase'

export const createClient = () =>
  createBrowserClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY)

export const supabase = createClient()
