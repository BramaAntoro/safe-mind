'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { activitySchema } from '../schemas/activity.schema'
import { insertActivity } from '../services/insertActivity.service'
import type { ActivityActionResult } from '../types/activity.types'

export async function createActivityAction(_prevState: unknown, formData: FormData): Promise<ActivityActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const rawData = {
    name: formData.get('name'),
    mood: formData.get('mood'),
    energy_level: formData.get('energy_level'),
    duration: formData.get('duration') ? Number(formData.get('duration')) : null,
    notes: formData.get('notes') || null,
    category_id: formData.get('category_id') || null,
    date: formData.get('date'),
  }

  const validated = activitySchema.safeParse(rawData)
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors as unknown as Record<string, string[]> }
  }

  const { error } = await insertActivity(user.id, validated.data)
  if (error) return { error: 'Gagal menambahkan kegiatan' }

  revalidatePath('/dashboard')
  revalidatePath('/activities')
  redirect('/activities')
}
