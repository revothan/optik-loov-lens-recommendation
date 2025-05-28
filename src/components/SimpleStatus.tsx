interface SimpleStatusProps {
  currentStep: number
  totalSteps: number
}

export default function SimpleStatus({ currentStep, totalSteps }: SimpleStatusProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-sm border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700">
          {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  )
}
