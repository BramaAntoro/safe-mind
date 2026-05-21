import type { Database } from '@/lib/supabase/database.types'
import type { ActivityInput } from '../schemas/activity.schema'

export type Activity = Database['public']['Tables']['activities']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type MoodType = Database['public']['Enums']['mood_type']

export type CreateActivityDto = ActivityInput
export type UpdateActivityDto = Partial<ActivityInput>

export type ActivityActionResult = {
  success?: boolean
  error?: string | Record<string, string[]>
}
