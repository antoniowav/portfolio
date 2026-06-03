'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

const GAME_SECONDS = 20
const DIGITS = ['4', '0', '4'] as const

type Phase = 'idle' | 'playing' | 'over'
type Target = { id: number; x: number; y: number; size: number }

function spawn(id: number, score: number): Target {
  // targets shrink a little as the score climbs, but stay tap-friendly
  const size = Math.max(46, 78 - score * 1.4)
  return {
    id,
    x: 12 + Math.random() * 76, // % inside the board (with padding)
    y: 16 + Math.random() * 68,
    size,
  }
}

export function NotFound404() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [time, setTime] = useState(GAME_SECONDS)
  const [target, setTarget] = useState<Target>(() => spawn(0, 0))
  const nextId = useRef(1)

  useEffect(() => {
    setBest(Number(localStorage.getItem('hub404-best') || 0))
  }, [])

  // countdown
  useEffect(() => {
    if (phase !== 'playing') return
    if (time <= 0) {
      setPhase('over')
      setBest((b) => {
        const nb = Math.max(b, score)
        localStorage.setItem('hub404-best', String(nb))
        return nb
      })
      return
    }
    const id = window.setTimeout(() => setTime((t) => t - 1), 1000)
    return () => window.clearTimeout(id)
  }, [phase, time, score])

  const begin = useCallback(() => {
    setScore(0)
    setTime(GAME_SECONDS)
    setTarget(spawn(nextId.current++, 0))
    setPhase('playing')
  }, [])

  const hit = useCallback(() => {
    if (phase !== 'playing') return
    setScore((s) => {
      const ns = s + 1
      setTarget(spawn(nextId.current++, ns))
      return ns
    })
  }, [phase])

  const pct = Math.max(0, (time / GAME_SECONDS) * 100)

  return (
    <div className="flex w-full flex-col items-center">
      {/* BOLD animated 404 */}
      <motion.div
        className="flex items-end justify-center gap-1 sm:gap-3"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {DIGITS.map((d, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 60, rotate: i === 1 ? -12 : 8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.12 }}
            className={`font-bold leading-[0.74] tracking-[-0.06em] ${
              i === 1 ? 'text-accent' : 'text-ink'
            }`}
            style={{ fontSize: 'clamp(6rem, 30vw, 15rem)' }}
          >
            {d}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 max-w-sm text-center text-[1.05rem] leading-relaxed text-ink-2"
      >
        This page wandered off. Catch a few strays while you are here.
      </motion.p>

      {/* score / timer bar */}
      <div className="mt-7 flex w-[min(440px,88vw)] items-center justify-between">
        <span className="micro text-ink-3">
          Score{' '}
          <motion.span
            key={score}
            initial={{ scale: 1.5, color: 'var(--accent)' }}
            animate={{ scale: 1, color: 'var(--ink)' }}
            className="inline-block font-semibold"
          >
            {score}
          </motion.span>
        </span>
        <span className="micro text-ink-3 tabular-nums">
          {phase === 'playing' ? `${time}s` : `Best ${best}`}
        </span>
      </div>
      <div className="mt-2 h-1 w-[min(440px,88vw)] overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: phase === 'playing' ? `${pct}%` : '100%' }}
          transition={{ ease: 'linear', duration: phase === 'playing' ? 1 : 0.3 }}
        />
      </div>

      {/* board */}
      <div className="relative mt-4 h-[min(360px,52vh)] w-[min(440px,88vw)] overflow-hidden rounded-[3px] border border-line-strong bg-paper-sink">
        {phase === 'playing' && (
          <motion.button
            key={target.id}
            type="button"
            onClick={hit}
            aria-label="Catch"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 520, damping: 20 }}
            whileTap={{ scale: 0.82 }}
            className="absolute flex items-center justify-center rounded-full bg-accent font-bold text-on-accent shadow-[0_6px_24px_-6px_var(--accent)]"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              width: target.size,
              height: target.size,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-accent"
              animate={reduce ? undefined : { scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
            />
            0
          </motion.button>
        )}

        {phase !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            {phase === 'over' && (
              <motion.span
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="text-3xl font-bold tracking-[-0.02em]"
              >
                {score} caught
                {score > 0 && score >= best ? ' — best yet!' : ''}
              </motion.span>
            )}
            <motion.button
              type="button"
              onClick={begin}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-accent px-7 py-3 text-[0.95rem] font-semibold text-on-accent transition-colors duration-300 hover:bg-accent-deep"
            >
              {phase === 'over' ? 'Play again' : 'Catch the strays'}
            </motion.button>
            <span className="micro text-ink-3">Tap the marks · {GAME_SECONDS}s</span>
          </div>
        )}
      </div>

      <Link
        href="/"
        className="ulink mt-8 text-[0.95rem] font-medium text-ink transition-colors hover:text-accent"
      >
        ← Back to the hub
      </Link>
    </div>
  )
}
