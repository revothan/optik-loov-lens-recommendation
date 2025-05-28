export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-bounce" style={{animationDelay: '2s'}}></div>
    </div>
  )
}