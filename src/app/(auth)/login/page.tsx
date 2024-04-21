import AuthCard from '~components/auth-card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: ''
}

export default function LoginPage() {
  return (
    <div
      className={'flex h-[calc(100vh-57px)] w-full flex-1 items-center justify-center'}
    >
      <AuthCard view={'sign_in'} redirectTo={'/u'} />
    </div>
  )
}
