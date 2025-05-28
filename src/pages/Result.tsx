import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateRecommendation, QuizAnswer, LensRecommendation } from '@/logic/lensLogic'
import { ArrowLeft, RefreshCw, Share2, Download, CheckCircle2, Tag, Eye } from 'lucide-react'

export default function Result() {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState<LensRecommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get answers from localStorage
    const savedAnswers = localStorage.getItem('quiz-answers')
    if (savedAnswers) {
      const answers: QuizAnswer[] = JSON.parse(savedAnswers)
      const recs = generateRecommendation(answers)
      setRecommendations(recs)
    }
    setLoading(false)
  }, [])

  const handleNewQuiz = () => {
    localStorage.removeItem('quiz-answers')
    navigate('/quiz')
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rekomendasi Lensa Optik LOOV',
        text: 'Lihat rekomendasi lensa yang cocok untuk saya!',
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Link telah disalin ke clipboard!')
    }
  }

  const handleDownload = () => {
    const content = recommendations.map(rec => 
      `${rec.type}\nMerek: ${rec.brand}\nHarga: ${rec.price}\nDeskripsi: ${rec.description}\nAlasan: ${rec.reasons.join(', ')}\n\n`
    ).join('')
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rekomendasi-lensa-optik-loov.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Menganalisis jawaban Anda...</p>
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Tidak ada data quiz ditemukan.</p>
          <Button onClick={() => navigate('/quiz')}>Mulai Quiz</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleHome}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Beranda
            </Button>
            <h1 className="text-xl font-semibold">Hasil Rekomendasi</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Rekomendasi Lensa untuk Anda</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berdasarkan jawaban Anda, berikut adalah rekomendasi lensa yang paling sesuai dengan kebutuhan dan gaya hidup Anda.
            </p>
          </div>

          {/* Recommendations */}
          <div className="grid gap-6 mb-8">
            {recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{rec.type}</CardTitle>
                      <CardDescription className="text-blue-100 mt-1">
                        {rec.brand}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-blue-100">
                        <Tag className="w-4 h-4 mr-1" />
                        <span className="text-sm">Rekomendasi #{index + 1}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-muted-foreground mb-3">{rec.description}</p>
                    <div className="text-2xl font-bold text-green-600 mb-4">{rec.price}</div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Fitur Utama
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {rec.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reasons */}
                  <div>
                    <h4 className="font-semibold mb-2">Mengapa Kami Merekomendasikan Ini?</h4>
                    <ul className="space-y-1">
                      {rec.reasons.map((reason, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={handleNewQuiz}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
              <Button variant="outline" size="lg" onClick={handleHome}>
                Kembali ke Beranda
              </Button>
            </div>
            
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Tertarik dengan Rekomendasi Ini?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Kunjungi toko Optik LOOV terdekat untuk konsultasi lebih lanjut dan fitting lensa.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Temukan Toko Terdekat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
