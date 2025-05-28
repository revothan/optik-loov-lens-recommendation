import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateRecommendation, QuizAnswer, LensRecommendation } from '@/logic/lensLogic'

// Components
import LoadingScreen from '@/components/result/LoadingScreen'
import ErrorScreen from '@/components/result/ErrorScreen'
import AnimatedBackground from '@/components/result/AnimatedBackground'
import ResultHeader from '@/components/result/ResultHeader'
import SuccessAnimation from '@/components/result/SuccessAnimation'
import RecommendationCard from '@/components/result/RecommendationCard'
import ActionButtons from '@/components/result/ActionButtons'

export default function Result() {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState<LensRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const processingMessages = [
    'Initializing AI Engine...',
    'Analyzing your responses...',
    'Processing neural networks...',
    'Matching optimal lenses...',
    'Generating recommendations...'
  ]

  useEffect(() => {
    // Simulate AI processing with steps
    let step = 0
    const interval = setInterval(() => {
      if (step < processingMessages.length) {
        setAnimationStep(step)
        step++
      } else {
        clearInterval(interval)
        
        try {
          // Get answers from localStorage
          const savedAnswers = localStorage.getItem('quiz-answers')
          if (savedAnswers) {
            const answers: QuizAnswer[] = JSON.parse(savedAnswers)
            const recs = generateRecommendation(answers)
            setRecommendations(recs)
          } else {
            setError('Quiz data not found. Please retake the quiz.')
          }
        } catch (err) {
          setError('Error processing your quiz data. Please try again.')
          console.error('Error generating recommendations:', err)
        }
        setLoading(false)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleNewQuiz = () => {
    localStorage.removeItem('quiz-answers')
    navigate('/quiz')
  }

  const handleHome = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <LoadingScreen 
        animationStep={animationStep} 
        processingMessages={processingMessages} 
      />
    )
  }

  if (error || recommendations.length === 0) {
    return <ErrorScreen error={error} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <AnimatedBackground />

      <ResultHeader onHome={handleHome} />

      <SuccessAnimation />

      {/* Recommendations */}
      <main className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 mb-12">
            {recommendations.map((rec, index) => (
              <RecommendationCard 
                key={index}
                recommendation={rec}
                index={index}
              />
            ))}
          </div>

          <ActionButtons 
            onNewQuiz={handleNewQuiz}
            onHome={handleHome}
          />
        </div>
      </main>

      {/* Add custom CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
