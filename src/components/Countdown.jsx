import { useEffect, useState } from 'react'
import { event } from '../data'

const units = [['days', 'dias'], ['hours', 'horas'], ['minutes', 'min'], ['seconds', 'seg']]

export default function Countdown({ className = '' }) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, over: false })
  useEffect(() => {
    const update = () => {
      const diff = new Date(event.dateISO).getTime() - Date.now()
      const d = Math.max(0, diff)
      setT({ days: Math.floor(d / 86400000), hours: Math.floor(d / 3600000) % 24, minutes: Math.floor(d / 60000) % 60, seconds: Math.floor(d / 1000) % 60, over: diff <= 0 })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  if (t.over) return <div className={`countdown is-over ${className}`}><b>É HOJE! 🎉</b></div>
  return (
    <div className={`countdown ${className}`} role="timer" aria-label="Contagem regressiva para a festa">
      {units.map(([key, label], i) => (
        <div className={`cd-unit cd-${i}`} key={key}>
          <b>{String(t[key]).padStart(2, '0')}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
