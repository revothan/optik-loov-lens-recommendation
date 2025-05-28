import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Question } from '@/logic/lensLogic'
import QuestionProgress from './QuestionProgress'
import QuestionHeader from './QuestionHeader'
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
  currentAnswer, 
  questionNumber = 1, 
  totalQuestions = 10 
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
      style={{ position: 'relative', zIndex: 1 }}
    >
      <QuestionProgress 
        questionNumber={questionNumber} 
        totalQuestions={totalQuestions} 
      />

      <Card className="relative overflow-visible border-0 shadow-2xl bg-white/95 backdrop-blur-xl" style={{ zIndex: 1 }}>
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 animate-pulse" style={{ zIndex: -1 }}></div>
        <div className="absolute inset-[1px] bg-white rounded-2xl" style={{ zIndex: -1 }}></div>
        
        <div className="relative" style={{ zIndex: 2 }}>
          <QuestionHeader 
            question={question.question}
            isMultiple={question.type === 'multiple'}
          />
          
          <CardContent className="px-8 pb-8" style={{ position: 'relative', zIndex: 3 }}>
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
              <div style={{ position: 'relative', zIndex: 10000, clear: 'both' }}>
                <ContinueButton
                  selectedCount={selectedAnswers.length}
                  onContinue={handleMultiSelectSubmit}
                />
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
