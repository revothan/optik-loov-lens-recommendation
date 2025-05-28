import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResultHeaderProps {
  onHome: () => void
}

export default function ResultHeader({ onHome }: ResultHeaderProps) {
  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <Button 
            variant="ghost" 
            onClick={onHome}
            className="group hover:bg-purple-50 absolute left-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Home
          </Button>
        </div>
      </div>
    </header>
  )
}