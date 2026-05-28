import { createClient } from '@/lib/supabase/server'

export async function getCategories(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) {
    return { data: null, error }
  }

  // if (data && data.length === 0) {
  //   const seedResult = await seedDefaultCategories(userId)
  //   if (seedResult.success && seedResult.data) {
  //     return { data: seedResult.data, error: null }
  //   }
  // }

  return { data, error: null }
}
