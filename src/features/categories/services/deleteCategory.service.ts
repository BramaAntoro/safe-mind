import { createClient } from '@/lib/supabase/server'

export async function deleteCategory(id: string, userId: string) {
  const supabase = await createClient()
  return supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}
