'use client'

import { useEffect } from 'react'

export default function StarGlow() {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = Math.random() * 100 + '%'
      star.style.top = Math.random() * 100 + '%'
      star.style.animationDelay = Math.random() * 3 + 's'
      document.body.appendChild(star)

      setTimeout(() => {
        star.remove()
      }, 3000)
    }

    const interval = setInterval(createStar, 200)
    return () => clearInterval(interval)
  }, [])

  return null
}