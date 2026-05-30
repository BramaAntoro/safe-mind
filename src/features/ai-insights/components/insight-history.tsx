'use client'

import { History, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Insight } from '../types/insight'

interface InsightHistoryProps {
  history: Insight[]
  selectedId: number
  onSelect: (insight: Insight) => void
}

export function InsightHistory({ history, selectedId, onSelect }: InsightHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <History className="h-5 w-5 text-slate-400" />
        <h2 className="font-semibold text-slate-700 dark:text-slate-300">Riwayat Insight</h2>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all duration-200 group",
              selectedId === item.id
                ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800 shadow-sm"
                : "bg-white border-slate-100 hover:border-indigo-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-900"
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                selectedId === item.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
              )}>
                {item.date}
              </span>
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                selectedId === item.id ? "text-indigo-500 translate-x-1" : "text-slate-300 group-hover:translate-x-1"
              )} />
            </div>
            <p className={cn(
              "text-sm font-medium line-clamp-2",
              selectedId === item.id ? "text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-400"
            )}>
              {item.content}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
