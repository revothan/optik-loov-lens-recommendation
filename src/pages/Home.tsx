import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Smartphone, Users, Zap, ArrowRight, Sparkles, Target, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Target,
      title: 'AI-Powered Recommendations',
      description: 'Algoritma machine learning yang menganalisis profil unik Anda untuk rekomendasi presisi tinggi',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Results',
      description: 'Dapatkan hasil dalam hitungan detik dengan teknologi processing terdepan',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Sparkles,
      title: 'Personalized Experience',
      description: 'Interface yang beradaptasi dengan preferensi dan kebutuhan individual Anda',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'Expert Validated',
      description: 'Dikembangkan dan divalidasi oleh tim optometrist bersertifikat internasional',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '98%', label: 'Accuracy Rate', icon: Target },
    { value: '<30s', label: 'Average Time', icon: Clock },
    { value: '24/7', label: 'Available', icon: Zap }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-95"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI Technology
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              <span className="block">Optik</span>
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                LOOV
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Temukan lensa sempurna dengan teknologi AI terdepan. 
              <span className="font-semibold text-yellow-300"> Personalized, precise, powerful.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/quiz')}
                className="group text-lg px-8 py-4 bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-white/25 animate-bounce-in"
              >
                Mulai AI Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                <Eye className="w-5 h-5 mr-2" />
                Live Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="relative -mt-12 mb-20">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="container mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Why Choose <span className="gradient-text">LOOV AI</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kombinasi sempurna antara artificial intelligence, user experience design, 
            dan optical expertise untuk hasil yang tak tertandingi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${feature.color} p-1 animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 h-full">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* How it Works - Modern Timeline */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative">
            <h3 className="text-3xl font-black text-center mb-12 text-gray-900">
              Simple. Smart. <span className="gradient-text">Spectacular.</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Smart Questionnaire', desc: 'AI menganalisis jawaban Anda secara real-time' },
                { step: '02', title: 'Neural Processing', desc: 'Deep learning algorithms memproses ribuan parameter' },
                { step: '03', title: 'Perfect Match', desc: 'Rekomendasi presisi dengan confidence score 98%+' }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="text-6xl font-black text-purple-100 mb-4 group-hover:text-purple-200 transition-colors">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-black mb-6">
              Ready for the Future of Vision Care?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join ribuan pelanggan yang telah merasakan pengalaman revolusioner dalam memilih lensa.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/quiz')}
              className="group text-lg px-8 py-4 bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              Start Your Journey
              <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Optik LOOV</div>
          <p className="text-gray-400 mb-6">
            Revolutionizing vision care through artificial intelligence and human expertise.
          </p>
          <div className="text-sm text-gray-500">
            © 2025 Optik LOOV. Crafted with ❤️ for the future of vision.
          </div>
        </div>
      </footer>
    </div>
  )
}
