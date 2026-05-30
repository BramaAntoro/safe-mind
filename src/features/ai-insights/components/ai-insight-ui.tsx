'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Calendar, Info, History, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function AIInsightUI() {
  const [loading, setLoading] = useState(false)
  const [hasInsight, setHasInsight] = useState(false)
  
  const mockHistory = [
    {
      id: 1,
      content: "Berdasarkan aktivitasmu minggu ini, kamu menunjukkan tingkat produktivitas yang stabil namun ada penurunan energi di sore hari. \n\nSaran AI: Cobalah untuk melakukan aktivitas ringan atau meditasi selama 10 menit di jam 3 sore untuk menjaga fokus hingga akhir hari.",
      period: "24 Mei - 30 Mei 2026",
      date: "30 Mei 2026"
    },
    {
      id: 2,
      content: "Minggu ini kamu sangat aktif dalam kategori 'Olahraga'. Ini berdampak sangat positif pada mood kamu yang rata-rata berada di level 'GREAT'.\n\nSaran AI: Pertahankan rutinitas ini, namun pastikan tidur yang cukup (7-8 jam) agar tidak mengalami burnout di minggu depan.",
      period: "17 Mei - 23 Mei 2026",
      date: "23 Mei 2026"
    },
    {
      id: 3,
      content: "Ada pola kecemasan yang muncul setiap hari Selasa malam. Setelah dianalisis, ini berkaitan dengan persiapan rapat mingguanmu.\n\nSaran AI: Cobalah untuk mencicil persiapan rapat sejak hari Senin agar beban di Selasa malam berkurang.",
      period: "10 Mei - 16 Mei 2026",
      date: "16 Mei 2026"
    }
  ]

  const [selectedInsight, setSelectedInsight] = useState(mockHistory[0])

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setHasInsight(true)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar History */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center gap-2 px-1">
          <History className="h-5 w-5 text-slate-400" />
          <h2 className="font-semibold text-slate-700 dark:text-slate-300">Riwayat Insight</h2>
        </div>
        
        <div className="space-y-3">
          {mockHistory.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedInsight(item)
                setHasInsight(true)
              }}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200 group",
                selectedInsight.id === item.id
                  ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800 shadow-sm"
                  : "bg-white border-slate-100 hover:border-indigo-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-900"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  selectedInsight.id === item.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                )}>
                  {item.date}
                </span>
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  selectedInsight.id === item.id ? "text-indigo-500 translate-x-1" : "text-slate-300 group-hover:translate-x-1"
                )} />
              </div>
              <p className={cn(
                "text-sm font-medium line-clamp-2",
                selectedInsight.id === item.id ? "text-slate-900 dark:text-slate-100" : "text-slate-600 dark:text-slate-400"
              )}>
                {item.content}
              </p>
            </button>
          ))}
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md py-6 rounded-xl transition-all active:scale-95 mt-4"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Menganalisis...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Buat Insight Baru
            </>
          )}
        </Button>
      </div>

      {/* Content Display */}
      <div className="lg:col-span-2">
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
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500" key={selectedInsight.id}>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>Periode Analisis: {selectedInsight.period}</span>
              </div>
              
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl p-6 border border-indigo-100/50 dark:border-indigo-900/30 shadow-inner">
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed md:text-lg">
                  {selectedInsight.content}
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
      </div>
    </div>
  )
}
