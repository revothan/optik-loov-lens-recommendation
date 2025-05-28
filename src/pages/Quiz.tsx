import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import QuestionCard from '@/components/QuestionCard'
import { questions, getNextQuestion, QuizAnswer } from '@/logic/lensLogic'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function Quiz() {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0].id)

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

    // Automatically move to next question for single select
    if (currentQuestion?.type === 'single') {
      handleNext(answer as string)
    }
  }

  const handleNext = (answer?: string) => {
    const answerToUse = answer || (currentAnswer as string)
    const nextQuestionId = getNextQuestion(currentQuestionId, answerToUse)
    
    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId)
      const nextIndex = questions.findIndex(q => q.id === nextQuestionId)
      setCurrentQuestionIndex(nextIndex)
    } else {
      // Quiz completed, go to results
      navigate('/result')
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1
      setCurrentQuestionIndex(prevIndex)
      setCurrentQuestionId(questions[prevIndex].id)
    }
  }

  const handleHome = () => {
    navigate('/')
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleHome}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Beranda
            </Button>
            <h1 className="text-xl font-semibold">Konsultasi Lensa</h1>
            <div className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} dari {questions.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="w-full bg-gray-200 h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={currentAnswer}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-8 max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Sebelumnya
            </Button>

            {currentQuestion.type === 'multiple' && currentAnswer && (
              <Button
                onClick={() => handleNext()}
                className="flex items-center"
              >
                Selanjutnya
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
