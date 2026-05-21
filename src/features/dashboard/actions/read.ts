'use server'

import { createClient } from '@/lib/supabase/server'
import { getDashboardData } from '../services/read'

export async function fetchDashboardData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return await getDashboardData(user.id)
}
