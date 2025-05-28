import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import QuestionCard from '@/components/QuestionCard'
import { questions, getNextQuestion, QuizAnswer } from '@/logic/lensLogic'
import { ArrowLeft, ArrowRight, Brain, Sparkles, Zap } from 'lucide-react'

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
    console.log('=== QUIZ HANDLE ANSWER ===')
    console.log('Question ID:', currentQuestionId)
    console.log('Question Type:', currentQuestion?.type)
    console.log('Answer received:', answer)
    console.log('Answer type:', typeof answer, Array.isArray(answer) ? 'array' : 'not array')
    
    const newAnswers = answers.filter(a => a.questionId !== currentQuestionId)
    newAnswers.push({ questionId: currentQuestionId, answer })
    setAnswers(newAnswers)

    console.log('Updated answers:', newAnswers)

    // For single select, move automatically
    if (currentQuestion?.type === 'single') {
      console.log('Single select - auto advancing')
      handleNext(answer as string)
    } else {
      // For multiple select, move to next question
      console.log('Multiple select - moving to next question')
      handleNext()
    }
  }

  const handleNext = (answer?: string | string[]) => {
    console.log('=== HANDLE NEXT ===')
    console.log('Current question:', currentQuestionId)
    console.log('Answer parameter:', answer)
    console.log('Current answer from state:', currentAnswer)
    
    setIsTransitioning(true)
    
    setTimeout(() => {
      // For multiple choice questions, use the current answer from state
      // For single choice, use the passed answer
      let answerToUse: string
      
      if (currentQuestion?.type === 'multiple') {
        // For multiple choice, we need to get the first selected value for navigation logic
        const multiAnswer = currentAnswer as string[]
        answerToUse = Array.isArray(multiAnswer) && multiAnswer.length > 0 ? multiAnswer[0] : ''
        console.log('Using first selected answer for navigation:', answerToUse)
      } else {
        answerToUse = answer as string || (currentAnswer as string)
        console.log('Using single answer for navigation:', answerToUse)
      }
      
      const nextQuestionId = getNextQuestion(currentQuestionId, answerToUse)
      console.log('Next question ID:', nextQuestionId)
      
      if (nextQuestionId) {
        setCurrentQuestionId(nextQuestionId)
        const nextIndex = questions.findIndex(q => q.id === nextQuestionId)
        setCurrentQuestionIndex(nextIndex)
        console.log('Moving to question:', nextQuestionId, 'at index:', nextIndex)
      } else {
        // Quiz completed, go to results
        console.log('Quiz completed - navigating to results')
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

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg font-medium text-gray-700">Loading AI Engine...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce animation-delay-0"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handleHome}
              className="group hover:bg-purple-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Home</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-black text-gray-900">AI Consultation</h1>
            </div>
            
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Progress Bar */}
      <div className="relative bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="relative h-2 bg-gray-200/50 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Progress indicators */}
          <div className="flex justify-between mt-2 px-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentQuestionIndex
                    ? 'bg-purple-500 scale-125'
                    : 'bg-gray-300 scale-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* AI Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-gray-700">AI Engine Active</span>
            </div>
          </div>

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

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 max-w-3xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="group flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-xl border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Previous</span>
            </Button>

            {/* Center info */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Brain className="w-4 h-4" />
              <span>AI analyzing your preferences...</span>
            </div>

            {/* Only show continue button for single-choice questions or when multiple choice is not answered yet */}
            {currentQuestion.type === 'single' ? (
              <div className="w-24"></div> // Spacer for layout balance when single choice auto-advances
            ) : (
              // For multiple choice questions, don't show navigation button here since QuestionCard handles it
              <div className="w-24"></div> // Spacer for layout balance
            )}
          </div>

          {/* Fun facts or tips */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-3 border border-blue-100">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                💡 <strong>Did you know?</strong> Our AI processes over 1000+ lens parameters to find your perfect match
              </span>
            </div>
          </div>
          
          {/* Debug info for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-red-100 border border-red-300 rounded text-sm">
              <strong>Quiz Debug Info:</strong><br />
              Current Question: {currentQuestionId} ({currentQuestion?.type})<br />
              Current Answer: {JSON.stringify(currentAnswer)}<br />
              All Answers: {JSON.stringify(answers)}<br />
              Question Index: {currentQuestionIndex + 1}/{questions.length}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
