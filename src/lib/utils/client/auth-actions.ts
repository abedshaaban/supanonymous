'use client'

import { createClient } from '~utils/supabase/client'

export async function logoutUser() {
  const supabase = createClient()

  await supabase.auth.signOut()
}
