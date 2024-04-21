import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { ENV } from '~constants/env'
import type { Database } from '~types/supabase'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      }
    }
  })
}
