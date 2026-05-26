'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface MoodMiniChartProps {
  data: {
    date: string
    moodValue: number
  }[]
}

export function MoodMiniChart({ data }: MoodMiniChartProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Tren Mood (7 Hari Terakhir)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[1, 5]} 
                ticks={[1, 2, 3, 4, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                hide
              />
              <Tooltip 
                formatter={(value: any) => {
                  const val = Number(value)
                  if (val >= 4.5) return ['Sangat Baik', 'Mood']
                  if (val >= 3.5) return ['Baik', 'Mood']
                  if (val >= 2.5) return ['Biasa', 'Mood']
                  if (val >= 1.5) return ['Buruk', 'Mood']
                  return ['Sangat Buruk', 'Mood']
                }}
                labelStyle={{ color: '#666' }}
              />
              <Line 
                type="monotone" 
                dataKey="moodValue" 
                stroke="#6366F1" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#6366F1' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
