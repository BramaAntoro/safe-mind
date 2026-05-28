import { createClient } from '@/lib/supabase/server'
import type { UpdateActivityDto } from '../types/activity.types'

export async function updateActivity(id: string, userId: string, data: UpdateActivityDto) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .update(data)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
}
