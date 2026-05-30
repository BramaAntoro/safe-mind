import { AIInsightUI } from '@/features/ai-insights/components/ai-insight-ui'

export default function InsightsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Insights</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Lihat analisis mendalam tentang pola aktivitas dan kesehatan mentalmu.
          </p>
        </div>
        
        <AIInsightUI />
      </div>
    </main>
  )
}
