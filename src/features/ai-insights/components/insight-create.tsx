'use client'

import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface InsightCreateProps {
  loading: boolean
  onGenerate: () => void
}

export function InsightCreate({ loading, onGenerate }: InsightCreateProps) {
  return (
    <Button 
      onClick={onGenerate} 
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
  )
}
