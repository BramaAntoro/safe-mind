import { Plus, Sparkles } from 'lucide-react'
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
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link href="/insights" className="w-full sm:w-auto">
            <Button variant="outline" className="flex items-center justify-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold py-6 px-6 rounded-xl transition-all active:scale-95 w-full">
              <Sparkles className="h-5 w-5" />
              AI Insights
            </Button>
          </Link>
          <Link href="/activities/new" className="w-full sm:w-auto">
            <Button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 px-6 rounded-xl shadow-lg transition-all active:scale-95 w-full">
              <Plus className="h-5 w-5" />
              Tambah Kegiatan
            </Button>
          </Link>
        </div>
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
