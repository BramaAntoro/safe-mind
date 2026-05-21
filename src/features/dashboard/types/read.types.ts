import type { Database } from '@/lib/supabase/database.types'

export type Activity = Database['public']['Tables']['activities']['Row']
export type MoodType = Database['public']['Enums']['mood_type']

export type DashboardData = {
  user: {
    name: string
  }
  stats: {
    totalActivitiesThisWeek: number
    averageMood: MoodType | 'NONE'
    currentStreak: number
  }
  recentActivities: Activity[]
  moodChartData: {
    date: string
    moodValue: number
  }[]
}
