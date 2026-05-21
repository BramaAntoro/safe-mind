import { createClient } from '@/lib/supabase/server'

export const DEFAULT_CATEGORIES = [
  { name: 'Belajar', icon: '📚', color: '#6366f1' },
  { name: 'Olahraga', icon: '🏃', color: '#10b981' },
  { name: 'Istirahat', icon: '😴', color: '#0ea5e9' },
  { name: 'Sosial', icon: '👥', color: '#f59e0b' },
  { name: 'Hobi', icon: '🎨', color: '#8b5cf6' },
]

export async function seedDefaultCategories(userId: string) {
  const supabase = await createClient()
  
  const categoriesWithUserId = DEFAULT_CATEGORIES.map(cat => ({
    ...cat,
    user_id: userId
  }))

  const { error } = await supabase
    .from('categories')
    .insert(categoriesWithUserId)

  if (error) {
    console.error('Error seeding default categories:', error)
    return { error }
  }

  return { success: true }
}

export async function getCategories(userId: string) {
  const supabase = await createClient()
  return supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
}

export async function insertCategory(userId: string, data: { name: string, icon: string, color: string }) {
  const supabase = await createClient()
  return supabase
    .from('categories')
    .insert({ ...data, user_id: userId })
    .select()
    .single()
}

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

export async function deleteCategory(id: string, userId: string) {
  const supabase = await createClient()
  return supabase
    .from('categories')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}
