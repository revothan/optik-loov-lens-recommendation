import { Check, Sparkles } from 'lucide-react'

interface OptionButtonProps {
  option: {
    id: string
    text: string
    value: string
  }
  isSelected: boolean
  questionType: 'single' | 'multiple'
  onSelect: (value: string) => void
  index: number
}

export default function OptionButton({ 
  option, 
  isSelected, 
  questionType, 
  onSelect, 
  index 
}: OptionButtonProps) {
  const handleClick = () => {
    onSelect(option.value)
  }

  return (
    <button
      onClick={handleClick}
      className={`group w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${
        isSelected
          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-[1.02]'
          : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isSelected
              ? 'border-purple-500 bg-purple-500 scale-110'
              : 'border-gray-300 group-hover:border-purple-400'
          }`}>
            {isSelected && (
              <Check className="w-4 h-4 text-white" />
            )}
          </div>
          
          <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${
            isSelected 
              ? 'text-purple-700' 
              : 'text-gray-700 group-hover:text-purple-600'
          }`}>
            {option.text}
          </span>
        </div>
        
        {isSelected && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
        )}
      </div>
    </button>
  )
}
