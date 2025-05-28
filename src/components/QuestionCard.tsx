import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Question } from '@/logic/lensLogic'
import OptionButton from './OptionButton'
import ContinueButton from './ContinueButton'

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: string | string[]) => void
  currentAnswer?: string | string[]
  questionNumber?: number
  totalQuestions?: number
}

export default function QuestionCard({ 
  question, 
  onAnswer, 
  currentAnswer
}: QuestionCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Reset selected answers when question changes
  useEffect(() => {
    const initialAnswers = Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []
    setSelectedAnswers(initialAnswers)
    setIsVisible(false)
    
    // Trigger visibility after a small delay for smooth transition
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [question.id, currentAnswer])

  const handleSingleSelect = (value: string) => {
    setSelectedAnswers([value])
    // Immediate response for single select
    setTimeout(() => onAnswer(value), 200)
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
    <div 
      className={`w-full max-w-3xl mx-auto transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
      }`}
    >
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-xl">
        <CardContent className="p-8">
          {/* Simple Question Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {question.question}
            </h2>
            {question.type === 'multiple' && (
              <p className="text-sm text-gray-500">Select all that apply</p>
            )}
          </div>
          
          {/* Answer Options */}
          <div className="space-y-4 mb-6">
            {question.options.map((option, index) => (
              <OptionButton
                key={option.id}
                option={option}
                isSelected={isSelected(option.value)}
                questionType={question.type}
                onSelect={question.type === 'single' ? handleSingleSelect : handleMultiSelect}
                index={index}
              />
            ))}
          </div>
          
          {/* Continue button for multiple choice questions */}
          {question.type === 'multiple' && (
            <ContinueButton
              selectedCount={selectedAnswers.length}
              onContinue={handleMultiSelectSubmit}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
