interface MinimalProgressProps {
  currentStep: number
  totalSteps: number
}

export default function MinimalProgress({ currentStep, totalSteps }: MinimalProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="relative bg-white/60 backdrop-blur-sm py-3">
      <div className="container mx-auto px-4">
        <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
