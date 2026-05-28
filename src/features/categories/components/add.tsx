'use client'

import { useActionState, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createCategoryAction } from '../actions/createCategory.action'

export function AddCategoryForm() {
  const [state, action, isPending] = useActionState(createCategoryAction, null)
  const [icon, setIcon] = useState('📚')
  const [color, setColor] = useState('#6366f1')

  const errors = state?.error && typeof state.error === 'object' ? state.error : null
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Kategori</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kategori</Label>
            <Input id="name" name="name" placeholder="E.g. Meditasi, Membaca" required />
            {errors?.name && <p className="text-xs text-rose-500">{errors.name[0]}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon">Emoji Icon</Label>
              <Input 
                id="icon" 
                name="icon" 
                value={icon} 
                onChange={(e) => setIcon(e.target.value)} 
                placeholder="E.g. 🧘" 
                required 
              />
              {errors?.icon && <p className="text-xs text-rose-500">{errors.icon[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Warna</Label>
              <div className="flex gap-2">
                <Input 
                  id="color" 
                  name="color" 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="w-12 p-1 h-10"
                  required 
                />
                <Input 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)} 
                  className="flex-1"
                />
              </div>
              {errors?.color && <p className="text-xs text-rose-500">{errors.color[0]}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isPending}>
            {isPending ? 'Menyimpan...' : 'Tambah Kategori'}
          </Button>
          
          {state?.success && <p className="text-sm text-emerald-500 text-center">Kategori berhasil ditambahkan!</p>}
          {state?.error && typeof state.error === 'string' && <p className="text-sm text-rose-500 text-center">{state.error}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
