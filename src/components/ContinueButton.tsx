import { ArrowRight } from 'lucide-react'

interface ContinueButtonProps {
  selectedCount: number
  onContinue: () => void
}

export default function ContinueButton({ selectedCount, onContinue }: ContinueButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Button mouse down event')
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Button mouse up event')
  }

  const handleMouseEnter = () => {
    console.log('Button mouse enter - hover working')
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <div className="mt-8 w-full" style={{ position: 'relative', zIndex: 9999 }}>
      {/* Use div with click handler - bypass all button CSS issues */}
      <div
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        className="w-full group text-lg py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer rounded-md text-white font-medium flex items-center justify-center space-x-2 select-none"
        style={{ 
          pointerEvents: 'auto',
          position: 'relative',
          zIndex: 9999,
          minHeight: '60px',
          userSelect: 'none'
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick(e as any)
          }
        }}
      >
        <span>Lanjutkan dengan {selectedCount} pilihan</span>
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
      
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
      
      {/* Debug overlay - make it more prominent */}
      <div className="mt-2 text-sm text-center text-red-600 font-bold bg-yellow-100 py-2 rounded">
        🎯 CLICK AREA TEST - Count: {selectedCount} - Try clicking this button!
      </div>
      
      {/* Additional test button */}
      <div className="mt-2">
        <div
          onClick={() => {
            console.log('TEST BUTTON CLICKED!')
            alert('Test button works! Now trying main action...')
            onContinue()
          }}
          className="w-full bg-red-500 text-white py-2 px-4 rounded cursor-pointer text-center"
          style={{ zIndex: 10000, position: 'relative' }}
        >
          🚨 EMERGENCY CONTINUE BUTTON (Click if main button fails)
        </div>
      </div>
    </div>
  )
}
