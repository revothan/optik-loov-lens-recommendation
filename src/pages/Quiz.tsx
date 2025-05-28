import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '@/components/QuestionCard'
import CleanHeader from '@/components/CleanHeader'
import MinimalProgress from '@/components/MinimalProgress'
import SimpleNavigation from '@/components/SimpleNavigation'
import { questions, getNextQuestion, QuizAnswer } from '@/logic/lensLogic'
import { Brain } from 'lucide-react'

export default function Quiz() {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0].id)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentQuestion = questions.find(q => q.id === currentQuestionId)
  const currentAnswer = answers.find(a => a.questionId === currentQuestionId)?.answer

  useEffect(() => {
    // Save answers to localStorage for persistence
    localStorage.setItem('quiz-answers', JSON.stringify(answers))
  }, [answers])

  const handleAnswer = (answer: string | string[]) => {
    const newAnswers = answers.filter(a => a.questionId !== currentQuestionId)
    newAnswers.push({ questionId: currentQuestionId, answer })
    setAnswers(newAnswers)

    // For single select, move automatically
    if (currentQuestion?.type === 'single') {
      handleNext(answer as string)
    } else {
      // For multiple select, move to next question
      handleNext()
    }
  }

  const handleNext = (answer?: string | string[]) => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      // For multiple choice questions, use the current answer from state
      // For single choice, use the passed answer
      let answerToUse: string
      
      if (currentQuestion?.type === 'multiple') {
        // For multiple choice, we need to get the first selected value for navigation logic
        const multiAnswer = currentAnswer as string[]
        answerToUse = Array.isArray(multiAnswer) && multiAnswer.length > 0 ? multiAnswer[0] : ''
      } else {
        answerToUse = answer as string || (currentAnswer as string)
      }
      
      const nextQuestionId = getNextQuestion(currentQuestionId, answerToUse)
      
      if (nextQuestionId) {
        setCurrentQuestionId(nextQuestionId)
        const nextIndex = questions.findIndex(q => q.id === nextQuestionId)
        setCurrentQuestionIndex(nextIndex)
      } else {
        // Quiz completed, go to results
        navigate('/result')
      }
      
      setIsTransitioning(false)
    }, 300)
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true)
      
      setTimeout(() => {
        const prevIndex = currentQuestionIndex - 1
        setCurrentQuestionIndex(prevIndex)
        setCurrentQuestionId(questions[prevIndex].id)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const handleHome = () => {
    navigate('/')
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Simplified Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-0"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce animation-delay-4000"></div>
      </div>

      {/* Clean Header */}
      <CleanHeader 
        onHome={handleHome}
        currentStep={currentQuestionIndex + 1}
        totalSteps={questions.length}
      />

      {/* Minimal Progress Bar */}
      <MinimalProgress 
        currentStep={currentQuestionIndex + 1}
        totalSteps={questions.length}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Card */}
          <div className={`transition-all duration-500 ${
            isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
          }`}>
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentAnswer={currentAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          </div>

          {/* Simple Navigation */}
          <SimpleNavigation
            onPrevious={handlePrevious}
            canGoBack={currentQuestionIndex > 0}
          />
        </div>
      </main>
    </div>
  )
}
