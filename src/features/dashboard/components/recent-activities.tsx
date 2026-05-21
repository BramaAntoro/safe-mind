import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Activity, MoodType } from '../types/read.types'
import { format } from 'date-fns'

interface RecentActivitiesProps {
  activities: Activity[]
}

const MOOD_EMOJI: Record<MoodType, string> = {
  GREAT: '😄',
  GOOD: '🙂',
  NEUTRAL: '😐',
  BAD: '😔',
  AWFUL: '😣',
}

const MOOD_COLOR: Record<MoodType, string> = {
  GREAT: 'text-emerald-500',
  GOOD: 'text-sky-500',
  NEUTRAL: 'text-slate-500',
  BAD: 'text-amber-500',
  AWFUL: 'text-rose-500',
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Kegiatan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Belum ada kegiatan.</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="font-medium">{activity.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(activity.date), 'dd MMM yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{activity.duration}m</span>
                  <span className={`text-xl ${MOOD_COLOR[activity.mood]}`}>
                    {MOOD_EMOJI[activity.mood]}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
