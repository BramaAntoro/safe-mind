'use server'

import { createClient } from '@/lib/supabase/server'
import { seedDefaultCategories } from '@/features/categories/services/category.service'

export async function signUpAction(formData: FormData, origin: string) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/dashboard`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data?.user) {
    await seedDefaultCategories(data.user.id)
  }

  return { success: true }
}
