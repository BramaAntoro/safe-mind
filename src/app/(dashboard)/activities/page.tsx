import { createClient } from '@/lib/supabase/server'
import { getActivities } from '@/features/activities/services/getActivities.service'
import { ActivityList } from '@/features/activities/components/read'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function ActivitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: activities } = await getActivities(user.id)

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Riwayat Kegiatan</h1>
          <p className="text-slate-500">Lihat semua kegiatan dan mood yang telah kamu catat.</p>
        </div>
        <Link href="/activities/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 px-6 py-6 rounded-xl shadow-md">
            <Plus className="h-5 w-5" />
            Catat Kegiatan
          </Button>
        </Link>
      </div>

      <ActivityList activities={activities || []} />
    </div>
  )
}
