import { Zap } from 'lucide-react'

interface QuestionHeaderProps {
  question: string
  isMultiple: boolean
}

export default function QuestionHeader({ question, isMultiple }: QuestionHeaderProps) {
  return (
    <div className="pb-6 pt-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 leading-tight mb-4">
        {question}
      </h2>
      
      {isMultiple && (
        <p className="text-center text-sm text-gray-500 mt-3 font-medium">
          💡 Pilih satu atau lebih opsi, lalu klik tombol lanjutkan
        </p>
      )}
    </div>
  )
}
