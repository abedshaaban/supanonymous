'use client'

import { supabase } from '~utils/supabase/client'

export async function logoutUser() {
  await supabase.auth.signOut()
}
