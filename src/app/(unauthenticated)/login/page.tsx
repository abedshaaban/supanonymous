import AuthCard from '~components/auth-card'
import { createClient } from '~utils/supabase/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Login',
  description: ''
}

export default async function LoginPage() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) redirect('/')

  return (
    <div
      className={'flex h-[calc(100vh-57px)] w-full flex-1 items-center justify-center'}
    >
      <AuthCard view={'sign_in'} redirectTo={'/'} />
    </div>
  )
}
