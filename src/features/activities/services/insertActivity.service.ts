import { createClient } from '@/lib/supabase/server'
import type { CreateActivityDto } from '../types/activity.types'

export async function insertActivity(userId: string, data: CreateActivityDto) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .insert({
      ...data,
      user_id: userId,
    })
    .select()
    .single()
}
