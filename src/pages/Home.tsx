import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight, Settings } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      {/* Simple Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-2000"></div>
      </div>

      {/* Admin Button - positioned in the top right corner */}
      <div className="absolute top-4 right-4">
        <Button 
          size="sm"
          variant="ghost"
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-500 hover:text-gray-800"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto relative">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Find Your
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Perfect Lens
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Answer a few simple questions and get personalized lens recommendations
        </p>
        
        <Button 
          size="lg" 
          onClick={() => navigate('/quiz')}
          className="group text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}