import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

interface ErrorScreenProps {
  error: string | null
}

export default function ErrorScreen({ error }: ErrorScreenProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {error ? 'Processing Error' : 'No Data Found'}
        </h2>
        <p className="text-gray-600 mb-6">
          {error || "We couldn't find your quiz responses. Let's start fresh!"}
        </p>
        <Button 
          onClick={() => navigate('/quiz')} 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Start AI Consultation
        </Button>
      </div>
    </div>
  )
}