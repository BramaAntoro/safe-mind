import { createClient } from '@/lib/supabase/server'
import { getCategories } from '@/features/categories/services/category.service'
import { CategoryList } from '@/features/categories/components/read'
import { AddCategoryForm } from '@/features/categories/components/add'
import { redirect } from 'next/navigation'

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: categories } = await getCategories(user.id)

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Manajemen Kategori</h1>
        <p className="text-slate-500">Kelola kategori untuk mengelompokkan kegiatanmu.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AddCategoryForm />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-700 mb-4">Daftar Kategori</h2>
          <CategoryList categories={categories || []} />
        </div>
      </div>
    </div>
  )
}
