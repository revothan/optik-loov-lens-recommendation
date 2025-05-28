import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SimpleNavigationProps {
  onPrevious: () => void
  canGoBack: boolean
}

export default function SimpleNavigation({ onPrevious, canGoBack }: SimpleNavigationProps) {
  if (!canGoBack) return null

  return (
    <div className="flex justify-start mt-8 max-w-3xl mx-auto">
      <Button
        variant="outline"
        onClick={onPrevious}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-xl border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Previous</span>
      </Button>
    </div>
  )
}
