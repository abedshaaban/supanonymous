import { createClient } from '~utils/supabase/server'

export default async function HomePage() {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return <div>Hello {user ? user.id : 'world'}</div>
}
