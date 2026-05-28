import { createClient } from '@/lib/supabase/server'

export async function updateCategory(id: string, userId: string, data: { name: string, icon: string, color: string }) {
  const supabase = await createClient()
  return supabase
    .from('categories')
    .update(data)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
}
