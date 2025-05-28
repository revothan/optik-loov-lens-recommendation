import { ArrowRight } from 'lucide-react'

interface ContinueButtonProps {
  selectedCount: number
  onContinue: () => void
}

export default function ContinueButton({ selectedCount, onContinue }: ContinueButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('=== CONTINUE BUTTON CLICK EVENT ===')
    console.log('Event:', e.type)
    console.log('Target:', e.target)
    console.log('Current target:', e.currentTarget)
    console.log('Selected count:', selectedCount)
    console.log('Calling onContinue...')
    onContinue()
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button mouse down event')
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button mouse up event')
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <div className="mt-8 w-full">
      {/* Use native button instead of UI library component */}
      <button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="w-full group text-lg py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer rounded-md text-white font-medium flex items-center justify-center space-x-2 border-0 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        type="button"
        style={{ pointerEvents: 'auto' }}
      >
        <span>Lanjutkan dengan {selectedCount} pilihan</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
      
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
      
      {/* Debug overlay */}
      <div className="mt-2 text-xs text-center text-gray-500">
        Click area test - Count: {selectedCount}
      </div>
    </div>
  )
}
