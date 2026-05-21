'use client'

import { cn } from '@/lib/utils'
import type { MoodType } from '../types/activity.types'

interface MoodPickerProps {
  value: MoodType
  onChange: (value: MoodType) => void
}

const MOODS: { value: MoodType; label: string; emoji: string; color: string }[] = [
  { value: 'GREAT', label: 'Sangat Baik', emoji: '😄', color: 'bg-emerald-100 border-emerald-500 text-emerald-700' },
  { value: 'GOOD', label: 'Baik', emoji: '🙂', color: 'bg-sky-100 border-sky-500 text-sky-700' },
  { value: 'NEUTRAL', label: 'Biasa', emoji: '😐', color: 'bg-slate-100 border-slate-500 text-slate-700' },
  { value: 'BAD', label: 'Buruk', emoji: '😔', color: 'bg-amber-100 border-amber-500 text-amber-700' },
  { value: 'AWFUL', label: 'Sangat Buruk', emoji: '😣', color: 'bg-rose-100 border-rose-500 text-rose-700' },
]

export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {MOODS.map((mood) => (
        <button
          key={mood.value}
          type="button"
          onClick={() => onChange(mood.value)}
          className={cn(
            'flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all',
            value === mood.value ? mood.color : 'bg-white border-transparent hover:border-slate-200'
          )}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="text-[10px] font-medium text-center leading-tight">{mood.label}</span>
        </button>
      ))}
      <input type="hidden" name="mood" value={value} />
    </div>
  )
}
