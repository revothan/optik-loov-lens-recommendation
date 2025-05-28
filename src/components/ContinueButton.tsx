import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ContinueButtonProps {
  selectedCount: number
  onContinue: () => void
}

export default function ContinueButton({ selectedCount, onContinue }: ContinueButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Continue button clicked!', { selectedCount }) // Debug log
    onContinue()
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <div className="mt-8 w-full">
      <Button 
        onClick={handleClick}
        className="w-full group text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
        size="lg"
        type="button"
        disabled={selectedCount === 0}
      >
        <span>Lanjutkan dengan {selectedCount} pilihan</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
      
      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          {Array.from({ length: selectedCount }).map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: `${index * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
