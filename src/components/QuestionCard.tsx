import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Question } from '@/logic/lensLogic'
import { Check } from 'lucide-react'

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string | string[]) => void
  currentAnswer?: string | string[]
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []
  )

  const handleSingleSelect = (value: string) => {
    setSelectedAnswers([value])
    onAnswer(value)
  }

  const handleMultiSelect = (value: string) => {
    const newAnswers = selectedAnswers.includes(value)
      ? selectedAnswers.filter(a => a !== value)
      : [...selectedAnswers, value]
    
    setSelectedAnswers(newAnswers)
  }

  const handleMultiSelectSubmit = () => {
    if (selectedAnswers.length > 0) {
      onAnswer(selectedAnswers)
    }
  }

  const isSelected = (value: string) => selectedAnswers.includes(value)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl text-center">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => 
              question.type === 'single' 
                ? handleSingleSelect(option.value)
                : handleMultiSelect(option.value)
            }
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
              isSelected(option.value)
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base font-medium">
                {option.text}
              </span>
              {isSelected(option.value) && (
                <Check className="w-5 h-5 text-blue-600" />
              )}
            </div>
          </button>
        ))}
        
        {question.type === 'multiple' && selectedAnswers.length > 0 && (
          <div className="pt-4">
            <Button 
              onClick={handleMultiSelectSubmit}
              className="w-full"
              size="lg"
            >
              Lanjutkan ({selectedAnswers.length} dipilih)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
