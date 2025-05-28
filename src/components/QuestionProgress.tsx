import { Sparkles } from 'lucide-react'

interface QuestionProgressProps {
  questionNumber: number
  totalQuestions: number
}

export default function QuestionProgress({ questionNumber, totalQuestions }: QuestionProgressProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg border border-white/20">
        <Sparkles className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-medium text-gray-700">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}
