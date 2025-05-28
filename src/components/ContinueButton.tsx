import { ArrowRight } from 'lucide-react'

interface ContinueButtonProps {
  selectedCount: number
  onContinue: () => void
}

export default function ContinueButton({ selectedCount, onContinue }: ContinueButtonProps) {
  if (selectedCount === 0) {
    return null
  }

  // Create multiple different button approaches
  const handleClick1 = () => {
    console.log('BUTTON 1 CLICKED!')
    onContinue()
  }

  const handleClick2 = () => {
    console.log('BUTTON 2 CLICKED!')
    onContinue()
  }

  const handleClick3 = () => {
    console.log('BUTTON 3 CLICKED!')
    onContinue()
  }

  return (
    <>
      {/* Button 1: Completely minimal approach */}
      <div style={{
        position: 'fixed',
        top: '50%',
        right: '20px',
        backgroundColor: '#ff0000',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        cursor: 'pointer',
        zIndex: 999999,
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: 'none',
        userSelect: 'none'
      }}
      onClick={handleClick1}
      onMouseDown={() => console.log('FIXED BUTTON MOUSE DOWN')}
      onMouseUp={() => console.log('FIXED BUTTON MOUSE UP')}
      >
        🚨 FIXED POSITION CONTINUE ({selectedCount})
      </div>

      {/* Button 2: Portal approach - render outside current context */}
      <div style={{
        marginTop: '20px',
        padding: '0',
        position: 'relative',
        width: '100%',
        height: 'auto',
        zIndex: 1000000
      }}>
        <button
          onClick={handleClick2}
          style={{
            all: 'unset',
            display: 'block',
            width: '100%',
            backgroundColor: '#22c55e',
            color: 'white',
            padding: '16px',
            textAlign: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 1000001
          }}
          onMouseEnter={() => console.log('GREEN BUTTON HOVER')}
        >
          ✅ RESET CSS CONTINUE - {selectedCount} pilihan
        </button>
      </div>

      {/* Button 3: Absolutely positioned outside card */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '0',
        right: '0',
        zIndex: 1000002,
        backgroundColor: '#8b5cf6',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
      }}
      onClick={handleClick3}
      >
        ⬆️ FLOATING CONTINUE - {selectedCount} selected
      </div>

      {/* Original styled button for comparison */}
      <div className="mt-8 w-full">
        <div
          onClick={() => {
            console.log('ORIGINAL BUTTON CLICKED!')
            onContinue()
          }}
          onMouseEnter={() => console.log('ORIGINAL BUTTON HOVER')}
          className="w-full group text-lg py-6 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer rounded-md text-white font-medium flex items-center justify-center space-x-2 select-none"
          style={{ 
            pointerEvents: 'auto !important',
            position: 'static',
            zIndex: 'auto',
            minHeight: '60px',
            userSelect: 'none'
          }}
        >
          <span>Original: Lanjutkan dengan {selectedCount} pilihan</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
        
        <div className="mt-4 text-center text-lg font-bold text-red-600 bg-yellow-200 py-4 rounded">
          🎯 Try clicking ANY of the 4 buttons above!
          <br />
          Count: {selectedCount}
        </div>
      </div>

      {/* Debug information */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        fontSize: '14px',
        fontFamily: 'monospace'
      }}>
        <strong>Debug Info:</strong><br />
        Selected Count: {selectedCount}<br />
        Available Buttons: 4<br />
        1. Red Fixed Position (top right)<br />
        2. Green Reset CSS (below)<br />
        3. Purple Floating (above card)<br />
        4. Original Styled (main)<br />
        <br />
        <strong>At least ONE of these MUST work!</strong>
      </div>
    </>
  )
}
