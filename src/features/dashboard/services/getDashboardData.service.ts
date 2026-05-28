import { createClient } from '@/lib/supabase/server'
import type { DashboardData, MoodType } from '../types/read.types'
import { startOfWeek, endOfWeek, subDays, format } from 'date-fns'

const MOOD_VALUES: Record<MoodType, number> = {
  GREAT: 5,
  GOOD: 4,
  NEUTRAL: 3,
  BAD: 2,
  AWFUL: 1,
}

const VALUE_TO_MOOD: Record<number, MoodType> = {
  5: 'GREAT',
  4: 'GOOD',
  3: 'NEUTRAL',
  2: 'BAD',
  1: 'AWFUL',
}

export async function getDashboardData(userId: string): Promise<DashboardData> {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  const name = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'

  const now = new Date()
  const startOfThisWeek = startOfWeek(now, { weekStartsOn: 1 })
  const endOfThisWeek = endOfWeek(now, { weekStartsOn: 1 })

  const { data: thisWeekActivities } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .gte('date', format(startOfThisWeek, 'yyyy-MM-dd'))
    .lte('date', format(endOfThisWeek, 'yyyy-MM-dd'))

  const totalActivitiesThisWeek = thisWeekActivities?.length || 0

  const last7Days = subDays(now, 7)
  const { data: last7DaysActivities } = await supabase
    .from('activities')
    .select('mood, date')
    .eq('user_id', userId)
    .gte('date', format(last7Days, 'yyyy-MM-dd'))

  let averageMood: MoodType | 'NONE' = 'NONE'
  if (last7DaysActivities && last7DaysActivities.length > 0) {
    const sum = last7DaysActivities.reduce((acc, curr) => acc + MOOD_VALUES[curr.mood as MoodType], 0)
    const avg = Math.round(sum / last7DaysActivities.length)
    averageMood = VALUE_TO_MOOD[avg as keyof typeof VALUE_TO_MOOD] || 'NEUTRAL'
  }

  const { data: allActivities } = await supabase
    .from('activities')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  let currentStreak = 0
  if (allActivities && allActivities.length > 0) {
    const uniqueDays = Array.from(new Set(allActivities.map(a => a.date))).sort().reverse()
    let checkDate = new Date()
    
    const todayStr = format(checkDate, 'yyyy-MM-dd')
    const yesterdayStr = format(subDays(checkDate, 1), 'yyyy-MM-dd')
    
    if (uniqueDays[0] === todayStr || uniqueDays[0] === yesterdayStr) {
      if (uniqueDays[0] === yesterdayStr) {
          checkDate = subDays(checkDate, 1)
      }
      
      for (const day of uniqueDays) {
          if (day === format(checkDate, 'yyyy-MM-dd')) {
              currentStreak++
              checkDate = subDays(checkDate, 1)
          } else {
              break
          }
      }
    }
  }

  const { data: recentActivities } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5)

  const moodChartData = []
  for (let i = 6; i >= 0; i--) {
    const date = subDays(now, i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const dayActivities = last7DaysActivities?.filter(a => (a as { mood: MoodType; date: string }).date === dateStr) || []
    
    let moodValue = 0
    if (dayActivities.length > 0) {
      const sum = dayActivities.reduce((acc, curr) => acc + MOOD_VALUES[curr.mood as MoodType], 0)
      moodValue = sum / dayActivities.length
    }
    
    moodChartData.push({
      date: format(date, 'MMM dd'),
      moodValue
    })
  }

  return {
    user: { name },
    stats: {
      totalActivitiesThisWeek,
      averageMood,
      currentStreak
    },
    recentActivities: recentActivities || [],
    moodChartData
  }
}
