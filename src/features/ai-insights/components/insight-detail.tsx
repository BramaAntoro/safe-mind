'use client'

import { Sparkles, Calendar, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Insight } from '../types/insight'

interface InsightDetailProps {
  insight: Insight
}

export function InsightDetail({ insight }: InsightDetailProps) {
  return (
    <Card className="h-full overflow-hidden border-none shadow-xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-slate-900">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 fill-indigo-500 text-indigo-500" />
          <CardTitle className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
            Detail Insight
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="mt-2">
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500" key={insight.id}>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Calendar className="h-4 w-4" />
            <span>Periode Analisis: {insight.period}</span>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-indigo-100/50 dark:border-indigo-900/30 shadow-inner">
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed md:text-lg">
              {insight.content}
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-100/50 dark:border-amber-900/20">
            <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700/80 dark:text-amber-500/80 italic">
              Insight ini dihasilkan secara otomatis berdasarkan data aktivitas mingguanmu. Gunakan saran ini sebagai referensi untuk meningkatkan kesejahteraan mentalmu.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
