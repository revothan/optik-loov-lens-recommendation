import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Smartphone, Users, Zap } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Eye,
      title: 'Rekomendasi Personal',
      description: 'Dapatkan rekomendasi lensa yang sesuai dengan kebutuhan dan gaya hidup Anda'
    },
    {
      icon: Smartphone,
      title: 'Mudah Digunakan',
      description: 'Interface yang user-friendly dan dapat diakses dari smartphone atau desktop'
    },
    {
      icon: Zap,
      title: 'Hasil Cepat',
      description: 'Hanya butuh beberapa menit untuk mendapatkan rekomendasi lensa terbaik'
    },
    {
      icon: Users,
      title: 'Dipercaya Ahli',
      description: 'Dikembangkan berdasarkan expertise dari optometrist Optik LOOV'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Optik LOOV
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Rekomendasi Lensa Terpersonalisasi
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Temukan Lensa yang Tepat untuk Anda
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Dengan teknologi terdepan dan keahlian optometrist berpengalaman, 
              kami membantu Anda memilih lensa yang sesuai dengan kebutuhan spesifik, 
              gaya hidup, dan budget Anda.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/quiz')}
              className="text-lg px-8 py-6"
            >
              Mulai Konsultasi Lensa
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How it Works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Bagaimana Cara Kerjanya?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Jawab Pertanyaan</h3>
                  <p className="text-sm text-muted-foreground">
                    Isi kuesioner singkat tentang usia, aktivitas, dan kebutuhan penglihatan Anda
                  </p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Analisis Otomatis</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistem kami menganalisis jawaban Anda dengan algoritma yang telah teruji
                  </p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Terima Rekomendasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Dapatkan rekomendasi lensa yang tepat beserta penjelasan lengkap
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Optik LOOV. Memberikan solusi penglihatan terbaik untuk Anda.
          </p>
        </div>
      </footer>
    </div>
  )
}
