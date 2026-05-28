'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { deleteCategory } from '../services/deleteCategory.service'

export async function removeCategoryAction(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await deleteCategory(id, user.id)
  if (error) return { error: 'Gagal menghapus kategori' }

  revalidatePath('/categories')
  return { success: true }
}
