'use client'

import { useState } from 'react'

interface Naat {
  id: number
  title: string
  artist: string
  audio: string
}

export default function NaatCard({ naat }: { naat: Naat }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="card-hover bg-white/10 backdrop-blur-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-2">{naat.title}</h3>
      <p className="text-pink-300 mb-4">by {naat.artist}</p>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="button-glow w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
      >
        {isPlaying ? 'Pause' : 'Play'} Naat
      </button>
    </div>
  )
}