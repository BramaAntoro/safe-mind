'use client'

import { Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { removeCategoryAction } from '../actions/removeCategory.action'
import type { Category } from '@/features/activities/types/activity.types'

interface CategoryListProps {
  categories: Category[]
}

export function CategoryList({ categories }: CategoryListProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini? Kegiatan dengan kategori ini akan diset menjadi tanpa kategori.')) {
      await removeCategoryAction(id)
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="overflow-hidden border-none shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                {category.icon}
              </div>
              <span className="font-bold text-slate-700">{category.name}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleDelete(category.id)}
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      ))}
      {categories.length === 0 && (
        <div className="col-span-full py-10 text-center text-slate-400 bg-white rounded-xl border-2 border-dashed">
          Belum ada kategori.
        </div>
      )}
    </div>
  )
}
