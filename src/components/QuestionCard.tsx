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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : []
  )
  const [isVisible, setIsVisible] = useState(false)
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
    setSelectedAnimation(null)
  }, [question.id])

  const handleSingleSelect = (value: string) => {
    setSelectedAnswers([value])
    setSelectedAnimation(value)
    
    // Add a slight delay for animation before proceeding
    setTimeout(() => {
      onAnswer(value)
    }, 300)
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
  const isAnimating = selectedAnimation === value

  return (
    <div className={`w-full max-w-3xl mx-auto transform transition-all duration-700 ${
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

      <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 animate-pulse"></div>
        <div className="absolute inset-[1px] bg-white rounded-2xl"></div>
        
        <div className="relative">
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
                💡 Anda dapat memilih lebih dari satu opsi
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
                  } ${isAnimating ? 'animate-bounce-in' : ''}`}
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
                          <Check className="w-4 h-4 text-white animate-scale-in" />
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
                      <div className="flex items-center space-x-2 animate-fade-in">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {question.type === 'multiple' && selectedAnswers.length > 0 && (
              <div className="mt-8 animate-slide-up">
                <Button 
                  onClick={handleMultiSelectSubmit}
                  className="w-full group text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  size="lg"
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
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-bounce`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 1000}ms`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
