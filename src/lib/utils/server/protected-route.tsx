import type { PropsWithChildren } from 'react'
import { createClient } from '~utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedRoute({
  children,
  redirect: goToRoute
}: PropsWithChildren<{ redirect: string }>) {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return redirect(goToRoute)

  return children
}
