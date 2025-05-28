import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Question } from '@/logic/lensLogic'
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react'

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
    console.log('Button clicked, selected answers:', selectedAnswers) // Debug log
    if (selectedAnswers.length > 0) {
      onAnswer(selectedAnswers)
    }
  }

  const isSelected = (value: string) => selectedAnswers.includes(value)

  return (
    <div className={`w-full max-w-3xl mx-auto transform transition-all duration-700 relative ${
      isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
    }`}>
      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-white/20">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-xl z-10">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 animate-pulse"></div>
        <div className="absolute inset-[1px] bg-white rounded-2xl"></div>
        
        <div className="relative z-20">
          <CardHeader className="pb-6 pt-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-2xl md:text-3xl font-bold text-center text-gray-900 leading-tight">
              {question.question}
            </CardTitle>
            
            {question.type === 'multiple' && (
              <p className="text-center text-sm text-gray-500 mt-3 font-medium">
                💡 Pilih satu atau lebih opsi, lalu klik tombol lanjutkan
              </p>
            )}
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => 
                    question.type === 'single' 
                      ? handleSingleSelect(option.value)
                      : handleMultiSelect(option.value)
                  }
                  className={`group w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${
                    isSelected(option.value)
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected(option.value)
                          ? 'border-purple-500 bg-purple-500 scale-110'
                          : 'border-gray-300 group-hover:border-purple-400'
                      }`}>
                        {isSelected(option.value) && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${
                        isSelected(option.value) 
                          ? 'text-purple-700' 
                          : 'text-gray-700 group-hover:text-purple-600'
                      }`}>
                        {option.text}
                      </span>
                    </div>
                    
                    {isSelected(option.value) && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <Sparkles className="w-5 h-5 text-purple-500" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {question.type === 'multiple' && selectedAnswers.length > 0 && (
              <div className="mt-8 relative z-30">
                <Button 
                  onClick={handleMultiSelectSubmit}
                  className="w-full group text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative z-40"
                  size="lg"
                  type="button"
                >
                  <span>Lanjutkan dengan {selectedAnswers.length} pilihan</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-1">
                    {selectedAnswers.map((_, index) => (
                      <div 
                        key={index} 
                        className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${index * 200}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
