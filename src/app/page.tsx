import { supabase } from '~utils/supabase/server'

export default async function HomePage() {
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return <div>Hello {user ? user.email : 'world'}</div>
}
