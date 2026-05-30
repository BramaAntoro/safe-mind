'use client'

import { useState } from 'react'
import { InsightHistory } from './insight-history'
import { InsightCreate } from './insight-create'
import { InsightDetail } from './insight-detail'
import { Insight } from '../types/insight'

const mockHistory: Insight[] = [
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

export function AIInsightUI() {
  const [loading, setLoading] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<Insight>(mockHistory[0])

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      // For demo purposes, we don't actually add to the list
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar Section */}
      <div className="lg:col-span-1 space-y-4">
        <InsightHistory 
          history={mockHistory} 
          selectedId={selectedInsight.id} 
          onSelect={setSelectedInsight} 
        />
        <InsightCreate 
          loading={loading} 
          onGenerate={handleGenerate} 
        />
      </div>

      {/* Detail Section */}
      <div className="lg:col-span-2">
        <InsightDetail insight={selectedInsight} />
      </div>
    </div>
  )
}
