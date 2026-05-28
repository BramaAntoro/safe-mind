'use server'

import { createClient } from '@/lib/supabase/server'
import { getDashboardData } from '../services/getDashboardData.service'
import { getCategories } from '@/features/categories/services/getCategories.service'

export async function fetchDashboardData() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  await getCategories(user.id)

  return await getDashboardData(user.id)
}
