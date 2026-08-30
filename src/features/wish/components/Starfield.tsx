import { useEffect, useRef } from 'react'

export function Starfield({ paused }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4,
    }))

    let frame = 0
    let raf = 0
    const draw = () => {
      const { width, height } = canvas
      context.clearRect(0, 0, width, height)
      if (!paused) {
        frame += 1
      }
      for (const star of stars) {
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(star.phase + frame * 0.012 * star.speed))
        context.fillStyle = `rgba(243, 234, 211, ${twinkle})`
        context.beginPath()
        context.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2)
        context.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) {
        return
      }
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [paused])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
}
