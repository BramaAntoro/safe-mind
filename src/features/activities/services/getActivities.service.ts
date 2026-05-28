import { createClient } from '@/lib/supabase/server'

export async function getActivities(userId: string) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .select('*, categories(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
}
