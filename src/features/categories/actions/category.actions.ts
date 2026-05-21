'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { categorySchema } from '../schemas/category.schema'
import { 
  insertCategory, 
  updateCategory, 
  deleteCategory 
} from '../services/category.service'

export async function createCategoryAction(_prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const rawData = {
    name: formData.get('name'),
    icon: formData.get('icon'),
    color: formData.get('color'),
  }

  const validated = categorySchema.safeParse(rawData)
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  const { error } = await insertCategory(user.id, validated.data)
  if (error) return { error: 'Gagal menambahkan kategori' }

  revalidatePath('/categories')
  return { success: true }
}

export async function editCategoryAction(id: string, _prevState: unknown, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const rawData = {
    name: formData.get('name'),
    icon: formData.get('icon'),
    color: formData.get('color'),
  }

  const validated = categorySchema.safeParse(rawData)
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors }
  }

  const { error } = await updateCategory(id, user.id, validated.data)
  if (error) return { error: 'Gagal memperbarui kategori' }

  revalidatePath('/categories')
  return { success: true }
}

export async function removeCategoryAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await deleteCategory(id, user.id)
  if (error) return { error: 'Gagal menghapus kategori' }

  revalidatePath('/categories')
  return { success: true }
}
