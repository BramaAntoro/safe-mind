import { createClient } from '@/lib/supabase/server'

export async function getActivityById(id: string, userId: string) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .select('*, categories(*)')
    .eq('id', id)
    .eq('user_id', userId)
    .single()
}
