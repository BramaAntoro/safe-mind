import { Card, CardContent } from '@/components/ui/card'

interface GreetingCardProps {
  name: string
}

export function GreetingCard({ name }: GreetingCardProps) {
  const hours = new Date().getHours()
  let greeting = 'Selamat pagi'
  if (hours >= 12 && hours < 17) greeting = 'Selamat siang'
  if (hours >= 17 && hours < 21) greeting = 'Selamat sore'
  if (hours >= 21 || hours < 4) greeting = 'Selamat malam'

  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold">{greeting}, {name}! 👋</h2>
        <p className="mt-2 text-indigo-100">
          Bagaimana kabarmu hari ini? Jangan lupa catat kegiatanmu ya.
        </p>
      </CardContent>
    </Card>
  )
}
