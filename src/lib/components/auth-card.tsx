'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, type BaseAuth } from '@supabase/auth-ui-shared'
import { createClient } from '~utils/supabase/client'

export default function AuthCard(props: Omit<BaseAuth, 'supabaseClient'>) {
  const supabase = createClient()

  return (
    <div className={'w-full max-w-96 rounded-xl border p-9'}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        {...props}
      />
    </div>
  )
}
