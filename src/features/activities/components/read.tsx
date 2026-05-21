'use client'

import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Activity, MoodType, Category } from '../types/activity.types'
import { removeActivityAction } from '../actions/activity.actions'

interface ActivityListProps {
  activities: (Activity & { categories: Category | null })[]
}

const MOOD_EMOJI: Record<MoodType, string> = {
  GREAT: '😄',
  GOOD: '🙂',
  NEUTRAL: '😐',
  BAD: '😔',
  AWFUL: '😣',
}

export function ActivityList({ activities }: ActivityListProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      await removeActivityAction(id)
    }
  }

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed">
        <p className="text-slate-400">Belum ada kegiatan yang dicatat.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className={cn(
                "w-2",
                activity.mood === 'GREAT' ? "bg-emerald-500" :
                activity.mood === 'GOOD' ? "bg-sky-500" :
                activity.mood === 'NEUTRAL' ? "bg-slate-400" :
                activity.mood === 'BAD' ? "bg-amber-500" : "bg-rose-500"
              )} />
              <div className="flex-1 p-4 md:p-6 flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{MOOD_EMOJI[activity.mood]}</span>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{activity.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                      <span>{format(new Date(activity.date), 'dd MMMM yyyy')}</span>
                      {activity.duration && <span>• {activity.duration} menit</span>}
                      {activity.categories && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-full text-xs">
                          {activity.categories.icon} {activity.categories.name}
                        </span>
                      )}
                    </div>
                    {activity.notes && (
                      <p className="mt-3 text-slate-600 text-sm italic border-l-2 border-slate-200 pl-3">
                        &quot;{activity.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden md:flex flex-col items-end mr-4">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Energi</span>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div 
                          key={i} 
                          className={cn(
                            "w-2 h-2 rounded-full",
                            i <= activity.energy_level ? "bg-indigo-500" : "bg-slate-200"
                          )} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(activity.id)} className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Utility to handle class merging
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
