import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CleanHeaderProps {
  onHome: () => void
  currentStep: number
  totalSteps: number
}

export default function CleanHeader({ onHome, currentStep, totalSteps }: CleanHeaderProps) {
  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onHome}
            className="group hover:bg-purple-50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </Button>
          
          <h1 className="text-lg font-semibold text-gray-900">Find Your Lens</h1>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
            <span className="text-sm font-medium text-gray-600">
              {currentStep}/{totalSteps}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
