import { createClient } from '@/lib/supabase/server'

export async function deleteActivity(id: string, userId: string) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}
