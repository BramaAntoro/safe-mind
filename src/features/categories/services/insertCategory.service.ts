import { createClient } from '@/lib/supabase/server'

export async function insertCategory(userId: string, data: { name: string, icon: string, color: string }) {
  const supabase = await createClient()
  const result = await supabase
    .from('categories')
    .insert({ ...data, user_id: userId })
    .select()
    .single()

  if (result.error) {
    console.error('Error inserting category:', result.error)
  }

  return result
}
