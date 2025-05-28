import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

interface ActionButtonsProps {
  onNewQuiz: () => void
  onHome: () => void
}

export default function ActionButtons({ onNewQuiz, onHome }: ActionButtonsProps) {
  return (
    <div className="text-center space-y-8">
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          size="lg" 
          onClick={onNewQuiz}
          className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onHome}
          className="text-lg px-8 py-4 hover:bg-purple-50 border-purple-200"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}