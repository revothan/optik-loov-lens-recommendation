import { CheckCircle2 } from 'lucide-react'

export default function SuccessAnimation() {
  return (
    <div className="relative pt-12 pb-8">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        
        <div className="inline-flex items-center space-x-2 bg-emerald-100 rounded-full px-4 py-2 mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-emerald-700">AI Analysis Complete</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          Perfect Match <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Found!</span>
        </h2>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our advanced AI has analyzed your unique profile and identified the 
          <span className="font-semibold text-purple-600"> optimal lens solutions</span> tailored specifically for you.
        </p>
      </div>
    </div>
  )
}