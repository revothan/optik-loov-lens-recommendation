import { ArrowLeft, Share2, Download, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ResultHeaderProps {
  onHome: () => void
  onShare: () => void
  onDownload: () => void
}

export default function ResultHeader({ onHome, onShare, onDownload }: ResultHeaderProps) {
  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={onHome}
            className="group hover:bg-purple-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Home
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-black text-gray-900">AI Results</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onShare} className="group">
              <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload} className="group">
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}