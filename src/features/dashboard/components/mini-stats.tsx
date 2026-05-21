import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Smile, Zap } from 'lucide-react'
import type { MoodType } from '../types/read.types'

interface MiniStatsProps {
  totalActivities: number
  averageMood: MoodType | 'NONE'
  currentStreak: number
}

const MOOD_EMOJI: Record<MoodType | 'NONE', string> = {
  GREAT: '😄',
  GOOD: '🙂',
  NEUTRAL: '😐',
  BAD: '😔',
  AWFUL: '😣',
  NONE: '😶',
}

export function MiniStats({ totalActivities, averageMood, currentStreak }: MiniStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Kegiatan Minggu Ini</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActivities}</div>
          <p className="text-xs text-muted-foreground">kegiatan tercatat</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mood Rata-rata</CardTitle>
          <Smile className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold flex items-center gap-2">
            {MOOD_EMOJI[averageMood]} <span className="text-lg">{averageMood === 'NONE' ? '-' : averageMood}</span>
          </div>
          <p className="text-xs text-muted-foreground">7 hari terakhir</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentStreak} Hari</div>
          <p className="text-xs text-muted-foreground">jangan sampai putus!</p>
        </CardContent>
      </Card>
    </div>
  )
}
