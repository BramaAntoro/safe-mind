import { createClient } from '@/lib/supabase/server'
import type { CreateActivityDto, UpdateActivityDto } from '../types/activity.types'

export async function insertActivity(userId: string, data: CreateActivityDto) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .insert({
      ...data,
      user_id: userId,
    })
    .select()
    .single()
}

export async function getActivities(userId: string) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .select('*, categories(*)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
}

export async function getActivityById(id: string, userId: string) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .select('*, categories(*)')
    .eq('id', id)
    .eq('user_id', userId)
    .single()
}

export async function updateActivity(id: string, userId: string, data: UpdateActivityDto) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .update(data)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()
}

export async function deleteActivity(id: string, userId: string) {
  const supabase = await createClient()
  return supabase
    .from('activities')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}

export async function getCategories(userId: string) {
  const supabase = await createClient()
  return supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name', { ascending: true })
}
