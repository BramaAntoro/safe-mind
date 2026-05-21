'use client'

import { useActionState, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { MoodPicker } from './mood-picker'
import type { MoodType, Category } from '../types/activity.types'
import { createActivityAction } from '../actions/activity.actions'
import { format } from 'date-fns'

interface AddActivityFormProps {
  categories: Category[]
}

export function AddActivityForm({ categories }: AddActivityFormProps) {
  const [mood, setMood] = useState<MoodType>('NEUTRAL')
  const [energy, setEnergy] = useState(3)
  const [state, action, isPending] = useActionState(createActivityAction, null)

  const errors = state?.error && typeof state.error === 'object' ? state.error : null
  const generalError = state?.error && typeof state.error === 'string' ? state.error : null

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Tambah Kegiatan Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kegiatan</Label>
            <Input id="name" name="name" placeholder="E.g. Olahraga pagi, Belajar Coding" required />
            {errors?.name && <p className="text-xs text-rose-500">{errors.name[0]}</p>}
          </div>

          <div className="space-y-2">
            <Label>Bagaimana Mood Kamu?</Label>
            <MoodPicker value={mood} onChange={setMood} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="energy_level">Tingkat Energi: {energy}</Label>
              <span className="text-xs text-muted-foreground">
                {energy === 1 ? 'Sangat Lelah' : energy === 5 ? 'Sangat Bersemangat' : ''}
              </span>
            </div>
            <input 
              type="range" 
              id="energy_level" 
              name="energy_level" 
              min="1" 
              max="5" 
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Durasi (Menit)</Label>
              <Input id="duration" name="duration" type="number" placeholder="30" min="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Tanggal</Label>
              <Input id="date" name="date" type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">Kategori</Label>
            <select 
              id="category_id" 
              name="category_id" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Pilih Kategori (Opsional)</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan / Jurnal</Label>
            <textarea 
              id="notes" 
              name="notes" 
              placeholder="Ceritakan harimu..." 
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {generalError && <p className="text-sm text-rose-500 text-center">{generalError}</p>}

          <div className="flex gap-4 pt-2">
            <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-6" disabled={isPending}>
              {isPending ? 'Menyimpan...' : 'Simpan Kegiatan'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
