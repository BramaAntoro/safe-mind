import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GreetingCard } from './greeting-card'
import { MiniStats } from './mini-stats'
import { RecentActivities } from './recent-activities'
import { MoodMiniChart } from './mood-mini-chart'
import type { DashboardData } from '../types/read.types'

interface DashboardProps {
  data: DashboardData
}

export function Dashboard({ data }: DashboardProps) {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <GreetingCard name={data.user.name} />
        <Link href="/activities/new">
          <Button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-6 rounded-xl shadow-lg transition-all active:scale-95 w-full md:w-auto">
            <Plus className="h-5 w-5" />
            Tambah Kegiatan
          </Button>
        </Link>
      </div>

      <MiniStats 
        totalActivities={data.stats.totalActivitiesThisWeek}
        averageMood={data.stats.averageMood}
        currentStreak={data.stats.currentStreak}
      />

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <MoodMiniChart data={data.moodChartData} />
        <RecentActivities activities={data.recentActivities} />
      </div>
    </div>
  )
}
