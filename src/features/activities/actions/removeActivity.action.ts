'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { deleteActivity } from '../services/deleteActivity.service'
import type { ActivityActionResult } from '../types/activity.types'

export async function removeActivityAction(id: string): Promise<ActivityActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await deleteActivity(id, user.id)
  if (error) return { error: 'Gagal menghapus kegiatan' }

  revalidatePath('/dashboard')
  revalidatePath('/activities')
  return { success: true }
}
