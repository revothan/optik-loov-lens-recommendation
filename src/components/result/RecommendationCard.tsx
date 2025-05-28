import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LensRecommendation } from '@/logic/lensLogic'
import { Tag, Sparkles, Brain, Target, Crown, Award } from 'lucide-react'

interface RecommendationCardProps {
  recommendation: LensRecommendation
  index: number
}

export default function RecommendationCard({ recommendation: rec, index }: RecommendationCardProps) {
  return (
    <Card 
      className="group relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 opacity-0 animate-pulse"
      style={{ 
        animationDelay: `${index * 200}ms`,
        animation: `fadeInUp 0.6s ease-out ${index * 200}ms forwards`
      }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="absolute inset-[1px] bg-white rounded-2xl"></div>
      
      <div className="relative">
        <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg text-2xl">
                {rec.emoji || '👓'}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <CardTitle className="text-2xl font-bold">{rec.type}</CardTitle>
                  {rec.category === 'premium' && (
                    <div className="flex items-center space-x-1 bg-yellow-500/20 rounded-full px-2 py-1">
                      <Crown className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Premium</span>
                    </div>
                  )}
                  {rec.category === 'standard' && (
                    <div className="flex items-center space-x-1 bg-blue-500/20 rounded-full px-2 py-1">
                      <Award className="w-3 h-3 text-blue-400" />
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Standard</span>
                    </div>
                  )}
                </div>
                <CardDescription className="text-gray-300 mt-1 text-lg">
                  {rec.brand}
                </CardDescription>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-gray-300 mb-2">
                <Tag className="w-4 h-4 mr-2" />
                <span className="text-sm">Recommendation #{index + 1}</span>
              </div>
              <div className="text-3xl font-black text-emerald-400">{rec.price}</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          {/* Features Grid */}
          <div className="mb-8">
            <h4 className="font-bold text-lg mb-4 flex items-center text-gray-900">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Fitur Lensa
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {rec.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full group-hover:scale-150 transition-transform mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium leading-relaxed">
                    ➤ {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Reasoning */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
            <h4 className="font-bold text-lg mb-4 flex items-center text-gray-900">
              <Brain className="w-5 h-5 mr-2 text-purple-500" />
              AI Analysis & Reasoning
            </h4>
            <div className="space-y-3">
              {rec.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}