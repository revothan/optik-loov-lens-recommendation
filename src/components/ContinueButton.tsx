import { ArrowRight } from 'lucide-react'

interface ContinueButtonProps {
  selectedCount: number
  onContinue: () => void
}

export default function ContinueButton({ selectedCount, onContinue }: ContinueButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    onContinue()
  }

  if (selectedCount === 0) {
    return null
  }

  return (
    <div className="mt-8 w-full">
      <div
        onClick={handleClick}
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
    </div>
  )
}
