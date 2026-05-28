import Link from 'next/link'
import Image from 'next/image'
import { Brain, Sparkles, Activity, ChevronRight, CheckCircle2, Shield, MessageSquare, Zap, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-sm border border-slate-100">
              <Image 
                src="/logo_palugada_tech.png" 
                alt="Palugada Tech Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              SafeMind
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-500">
            <a href="#why" className="hover:text-indigo-600 transition-colors">Mengapa Kami</a>
            <a href="#ai-doctor" className="hover:text-indigo-600 transition-colors">AI Psychiatrist</a>
            <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privasi</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="hidden sm:block">
              <Button variant="ghost" className="text-slate-600 font-medium">Masuk</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 shadow-lg shadow-slate-200 transition-all active:scale-95">
                Mulai Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section: Minimal & Impactful */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-50/50 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-violet-50/50 rounded-full blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold tracking-wider uppercase mb-8">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              <span>Personalized Mental Health Support</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Berdamai dengan <br />
              Pikiranmu sendiri.
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-12 leading-relaxed">
              SafeMind bukan sekadar jurnal. Kami adalah asisten kesehatan mental yang mendengarkan, menganalisis, dan membimbingmu setiap hari.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/auth/sign-up" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-full shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1">
                  Dapatkan Akses Sekarang
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Tanpa biaya langganan awal</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points / Why Us */}
        <section id="why" className="py-24 border-y border-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Lelah merasa sendirian dengan emosimu?</h2>
                <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                  Banyak orang mencatat apa yang mereka rasakan, tapi jarang yang tahu *mengapa* mereka merasakannya. SafeMind menjembatani celah itu.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Cepat & Ekspresif</h4>
                      <p className="text-slate-500">Catat mood dan aktivitas dalam hitungan detik. Tidak ada form yang membosankan.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">Visualisasi Jernih</h4>
                      <p className="text-slate-500">Lihat tren emosimu dalam grafik yang cantik dan mudah dipahami.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-slate-900 rounded-[2rem] p-1 shadow-2xl overflow-hidden aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
                  <div className="text-center p-12">
                    <Activity className="h-20 w-20 text-indigo-400 mx-auto mb-6 animate-pulse" />
                    <div className="h-2 w-48 bg-slate-800 rounded-full mx-auto mb-3" />
                    <div className="h-2 w-32 bg-slate-800 rounded-full mx-auto opacity-50" />
                  </div>
                </div>
                {/* Decorative UI elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Mood Membaik +15%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Psychiatrist: The Main Feature */}
        <section id="ai-doctor" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-200 rotate-3">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">AI Psychiatrist Pribadimu</h2>
                <p className="text-xl text-slate-500 leading-relaxed">
                  Lebih dari sekadar bot chat. SafeMind menganalisis ribuan titik data dari aktivitas dan mood mingguanmu untuk memberikan diagnosa dan panduan hidup yang nyata.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <MessageSquare className="h-8 w-8 text-indigo-600 mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Konsultasi Mendalam</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    Kirim data 1 minggu atau 1 bulan terakhir hanya dengan satu klik. AI akan memberikan jawaban seperti psikiater profesional.
                  </p>
                  <ul className="space-y-3">
                    {['Analisis kondisi mental saat ini', 'Hal-hal yang harus dihindari', 'Rekomendasi gaya hidup', 'Latihan mindfulness personal'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">AI Report Preview</span>
                    </div>
                    <p className="text-lg italic text-slate-300 leading-relaxed">
                      "Berdasarkan pola tidur dan aktivitasmu bulan ini, kamu menunjukkan gejala burnout awal. Hindari bekerja setelah jam 8 malam dan fokuslah pada..."
                    </p>
                  </div>
                  <Button className="mt-12 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full w-full h-12">
                    Pelajari Cara Kerjanya
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section id="privacy" className="py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Shield className="h-12 w-12 text-slate-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Privasi Tanpa Kompromi</h2>
              <p className="text-lg text-slate-500 mb-0 leading-relaxed">
                Kami percaya kesehatan mental adalah hal yang sangat pribadi. Data Anda dienkripsi secara militer, tidak pernah dijual, dan sepenuhnya berada dalam kendali Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">Mulai Perjalananmu Menuju <br /> Ketenangan Hari Ini.</h2>
              <Link href="/auth/sign-up" className="relative z-10">
                <Button className="h-16 px-12 bg-white text-indigo-600 hover:bg-slate-100 text-xl font-bold rounded-full shadow-2xl transition-transform active:scale-95">
                  Daftar Sekarang — Gratis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50 grayscale">
              <Image src="/logo_palugada_tech.png" alt="Logo" width={24} height={24} />
              <span className="font-bold text-slate-900">SafeMind</span>
            </div>
            <p className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} palugada.tech. SafeMind is a part of Mental Health Initiative.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
