'use client'

import { useEffect, useState } from 'react'

interface TypingAnimationProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  showCursor?: boolean
  cursorChar?: string
  className?: string
}

export const TypingAnimation = ({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  showCursor = true,
  cursorChar = '|',
  className = '',
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursorBlink] = useState(true)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const startTyping = () => {
      setIsTyping(true)
      let currentIndex = 0

      const typeNextChar = () => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++

          if (currentIndex <= text.length) {
            timeoutId = setTimeout(typeNextChar, speed)
          } else {
            setIsTyping(false)
            onComplete?.()
          }
        }
      }

      typeNextChar()
    }

    if (delay > 0) {
      timeoutId = setTimeout(startTyping, delay)
    } else {
      startTyping()
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [text, speed, delay, onComplete])

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block text-accent-primary ${
            !isTyping && showCursorBlink ? 'animate-blink' : ''
          }`}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  )
}

interface MultiLineTypingProps {
  lines: string[]
  speed?: number
  lineDelay?: number
  onComplete?: () => void
  className?: string
  prompt?: string
}

export const MultiLineTyping = ({
  lines,
  speed = 50,
  lineDelay = 500,
  onComplete,
  className = '',
  prompt = '$ ',
}: MultiLineTypingProps) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const handleLineComplete = (line: string) => {
    setCompletedLines(prev => [...prev, line])

    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine(prev => prev + 1)
      }, lineDelay)
    } else {
      setIsComplete(true)
      onComplete?.()
    }
  }

  return (
    <div className={`font-mono ${className}`}>
      {completedLines.map((line, index) => (
        <div key={index} className="mb-1">
          <span className="text-accent-primary">{prompt}</span>
          <span className="text-text-primary">{line}</span>
        </div>
      ))}

      {!isComplete && currentLine < lines.length && (
        <div className="mb-1">
          <span className="text-accent-primary">{prompt}</span>
          <TypingAnimation
            text={lines[currentLine]}
            speed={speed}
            onComplete={() => handleLineComplete(lines[currentLine])}
            showCursor={true}
            className="text-text-primary"
          />
        </div>
      )}

      {isComplete && (
        <div>
          <span className="text-accent-primary">{prompt}</span>
          <span className="animate-blink text-accent-primary">|</span>
        </div>
      )}
    </div>
  )
}

// Matrix-style typing effect
interface MatrixTypingProps {
  text: string
  speed?: number
  className?: string
}

export const MatrixTyping = ({
  text,
  speed = 100,
  className = '',
}: MatrixTypingProps) => {
  const [displayChars, setDisplayChars] = useState<string[]>([])

  useEffect(() => {
    const chars = text.split('')
    const randomChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < chars.length) {
        // Add random characters first, then reveal the real character
        const iterations = 5
        let iterCount = 0

        const charInterval = setInterval(() => {
          if (iterCount < iterations) {
            setDisplayChars(prev => [
              ...prev.slice(0, currentIndex),
              randomChars[Math.floor(Math.random() * randomChars.length)],
              ...prev.slice(currentIndex + 1),
            ])
            iterCount++
          } else {
            setDisplayChars(prev => [
              ...prev.slice(0, currentIndex),
              chars[currentIndex],
              ...prev.slice(currentIndex + 1),
            ])
            clearInterval(charInterval)
            currentIndex++
          }
        }, 50)
      } else {
        clearInterval(interval)
      }
    }, speed)

    // Initialize with random characters
    setDisplayChars(
      chars.map(
        () => randomChars[Math.floor(Math.random() * randomChars.length)]
      )
    )

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className={`font-mono text-accent-primary ${className}`}>
      {displayChars.join('')}
    </span>
  )
}
