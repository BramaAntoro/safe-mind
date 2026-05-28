'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { categorySchema } from '../schemas/category.schema'
import { updateCategory } from '../services/updateCategory.service'

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
