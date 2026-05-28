import { createClient } from '@/lib/supabase/server'
import { getCategories } from '@/features/categories/services/getCategories.service'
import { AddActivityForm } from '@/features/activities/components/add'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function NewActivityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: categories } = await getCategories(user.id)

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto mb-6">
        <Link href="/activities" className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
          <ChevronLeft className="h-4 w-4" />
          Kembali ke Daftar Kegiatan
        </Link>
      </div>
      <AddActivityForm categories={categories || []} />
    </div>
  )
}
