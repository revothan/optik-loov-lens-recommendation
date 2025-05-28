import { Brain } from 'lucide-react'

interface LoadingScreenProps {
  animationStep: number
  processingMessages: string[]
}

export default function LoadingScreen({ animationStep, processingMessages }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <Brain className="w-16 h-16 text-white animate-bounce" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">AI Processing Your Data</h2>
        
        <div className="space-y-4 max-w-md mx-auto">
          {processingMessages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 text-white/80 transition-all duration-500 ${
                index <= animationStep ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${
                index <= animationStep ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`} />
              <span className="text-sm font-medium">{message}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((animationStep + 1) / processingMessages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}