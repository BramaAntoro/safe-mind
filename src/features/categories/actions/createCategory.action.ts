'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { categorySchema } from '../schemas/category.schema'
import { insertCategory } from '../services/insertCategory.service'

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
  if (error) {
    console.error('Insert Category Error:', error)
    return { error: 'Terjadi kesalahan pada server' }
  }

  revalidatePath('/categories')
  return { success: true }
}
