import { fetchDashboardData } from '@/features/dashboard/actions/read'
import { Dashboard } from '@/features/dashboard/components/read'
import { Suspense } from 'react'

export default async function DashboardPage() {
  const data = await fetchDashboardData()

  return (
    <main className="flex-1 overflow-y-auto">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard data={data} />
      </Suspense>
    </main>
  )
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 animate-pulse">
      <div className="h-32 bg-gray-200 rounded-xl w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="h-24 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="h-[300px] bg-gray-200 rounded-xl md:col-span-2" />
        <div className="h-[300px] bg-gray-200 rounded-xl" />
      </div>
    </div>
  )
}
