'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Naat type definition
interface Naat {
  id: number
  title: string
  artist: string
  duration: string
  category: string
  plays: number
  likes: number
  image: string
  audioUrl: string
  isFeatured?: boolean
  isNew?: boolean
  description: string
  year: number
  language: string
  lyrics?: string[]
  credits?: {
    composer?: string
    writer?: string
    producer?: string
  }
  tags?: string[]
}

// Sample naats data with detailed information
const naats: Naat[] = [
  {
    id: 1,
    title: 'Ya Rasool Allah',
    artist: 'Mahir Zain',
    duration: '4:32',
    category: 'Nasheed',
    plays: 1250000,
    likes: 89200,
    image: '/images/n1.jpeg',
    audioUrl: '/audio/ya-rasool.mp3',
    isFeatured: true,
    description: 'A beautiful nasheed praising Prophet Muhammad (PBUH) that touches the heart and soul. The melodious voice of Mahir Zain brings out the deep love and respect for the Prophet.',
    year: 2023,
    language: 'Arabic',
    lyrics: [
      'Ya Rasool Allah, Ya Habib Allah',
      'Anta Noorun Fil Wujud',
      'Ya Rasool Allah, Ya Shafi\' Allah',
      'Anta Badrun Fil Wujud',
      '',
      'Jita Kar Ke Paighame Wafa',
      'Duniya Ko Kiya Roshan',
      'Har Dil Mein Basaya Tune Pyar',
      'Ban Ke Rehmat Ka Samaan',
      '',
      'Ya Rasool Allah...'
    ],
    credits: {
      composer: 'Mahir Zain',
      writer: 'Traditional',
      producer: 'Awakening Records'
    },
    tags: ['Prophet Muhammad', 'Nasheed', 'Arabic', 'Mahir Zain']
  },
  {
    id: 2,
    title: 'Salamo Alika',
    artist: 'Mahir Zain',
    duration: '5:15',
    category: 'Nasheed',
    plays: 980000,
    likes: 65400,
    image: '/images/n2.jpeg',
    audioUrl: '/audio/salamo.mp3',
    isFeatured: true,
    description: 'Peace be upon you, a heartfelt greeting to the Prophet Muhammad (PBUH). This soul-stirring nasheed expresses the deep love and reverence Muslims have for their beloved Prophet.',
    year: 2023,
    language: 'Arabic',
    lyrics: [
      'Salamo Alika Ya Rasool Allah',
      'Salamo Alika Ya Habib Allah',
      'Salamo Alika Ya Noor Allah',
      'Salamo Alika Ya Khair Allah',
      '',
      'Anta Shamsun Anta Badrun',
      'Anta Noorun Fawqa Noor',
      'Anta Ikseeru Wujoodi',
      'Anta Sirru Wujoodi',
      '',
      'Salamo Alika...'
    ],
    credits: {
      composer: 'Mahir Zain',
      writer: 'Mahir Zin',
      producer: 'Awakening Records'
    },
    tags: ['Peace', 'Prophet', 'Nasheed', 'Arabic']
  },
  {
    id: 3,
    title: 'Akkia Ya Habeeb',
    artist: 'Mahir Zain',
    duration: '3:48',
    category: 'Nasheed',
    plays: 750000,
    likes: 52300,
    image: '/images/n3.jpeg',
    audioUrl: '/audio/akkia.mp3',
    isNew: true,
    description: 'A soulful naat expressing love for the beloved Prophet. The word "Akkia" is an expression of deep affection and longing.',
    year: 2024,
    language: 'Arabic',
    lyrics: [
      'Akkia Ya Habeeb, Akkia Ya Habeeb',
      'Anta Noorun Fil Quloob',
      'Akkia Ya Habeeb, Akkia Ya Habeeb',
      'Anta Badrun Fil Guyub',
      '',
      'Ya Man Fid Dunya Wa Akhirah',
      'Anta A\'la Wal Mukarram',
      'Ya Shafi Al Muznibin',
      'Anta Noorul \'Alamin',
      '',
      'Akkia Ya Habeeb...'
    ],
    credits: {
      composer: 'Mahir Zain',
      writer: 'Traditional',
      producer: 'Awakening Records'
    },
    tags: ['Love', 'Prophet', 'Nasheed', 'New Release']
  }
]

// Related naats based on artist or category
const getRelatedNaats = (currentNaat: Naat): Naat[] => {
  return naats
    .filter(n => n.id !== currentNaat.id && (n.artist === currentNaat.artist || n.category === currentNaat.category))
    .slice(0, 4)
}

export default function NaatDetailPage() {
  const params = useParams()
  const id = Number(params.id)
  const [naat, setNaat] = useState<Naat | undefined>()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullLyrics, setShowFullLyrics] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'lyrics' | 'credits'>('about')
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load naat data
  useEffect(() => {
    const foundNaat = naats.find(n => n.id === id)
    setNaat(foundNaat)
  }, [id])

  // Format number to K/M
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Play/pause audio
  const togglePlay = () => {
    if (!naat) return
    
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle time update
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  if (!naat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading naat...</p>
        </div>
      </div>
    )
  }

  const relatedNaats = getRelatedNaats(naat)

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={naat.audioUrl} />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 mb-6">
        <nav className="flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-pink-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/naats" className="hover:text-pink-400 transition-colors">Naats</Link>
          <span>/</span>
          <span className="text-white">{naat.title}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Cover image and player */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 sticky top-24">
              {/* Cover image */}
              <div className="relative h-80 w-full">
                <Image
                  src={naat.image}
                  alt={naat.title}
                  fill
                  className="object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                  >
                    {isPlaying ? (
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                      </svg>
                    ) : (
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {naat.isFeatured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full">
                      Featured
                    </span>
                  )}
                  {naat.isNew && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                      New Release
                    </span>
                  )}
                </div>
              </div>

              {/* Player controls */}
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-2">{naat.title}</h1>
                <p className="text-pink-400 mb-4">{naat.artist}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{formatNumber(naat.plays)}</span>
                  </div>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    <svg 
                      className={`w-4 h-4 ${isLiked ? 'text-pink-500 fill-current' : ''}`} 
                      fill={isLiked ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{formatNumber(isLiked ? naat.likes + 1 : naat.likes)}</span>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{naat.duration}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Playback controls */}
                <div className="flex items-center justify-between">
                  <button className="text-white hover:text-pink-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4 8v8" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    {isPlaying ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    )}
                  </button>
                  
                  <button className="text-white hover:text-pink-400 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM20 8v8" />
                    </svg>
                  </button>
                </div>

                {/* Volume control */}
                <div className="mt-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Action buttons */}
                <div className="mt-6 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Share
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Details, lyrics, credits */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20">
              {/* Tabs */}
              <div className="flex border-b border-white/20">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                    activeTab === 'about'
                      ? 'text-pink-500 border-b-2 border-pink-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('lyrics')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                    activeTab === 'lyrics'
                      ? 'text-pink-500 border-b-2 border-pink-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Lyrics
                </button>
                <button
                  onClick={() => setActiveTab('credits')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                    activeTab === 'credits'
                      ? 'text-pink-500 border-b-2 border-pink-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Credits
                </button>
              </div>

              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-3">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{naat.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Artist</p>
                        <p className="text-white font-semibold">{naat.artist}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Category</p>
                        <p className="text-white font-semibold">{naat.category}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Language</p>
                        <p className="text-white font-semibold">{naat.language}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Year</p>
                        <p className="text-white font-semibold">{naat.year}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    {naat.tags && (
                      <div>
                        <h3 className="text-white font-bold text-lg mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {naat.tags.map(tag => (
                            <Link
                              key={tag}
                              href={`/naats?tag=${tag}`}
                              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-gray-300 text-sm transition-colors"
                            >
                              #{tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'lyrics' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-bold text-lg">Lyrics</h3>
                      <button
                        onClick={() => setShowFullLyrics(!showFullLyrics)}
                        className="text-pink-500 hover:text-pink-400 text-sm font-semibold"
                      >
                        {showFullLyrics ? 'Show Less' : 'Show Full Lyrics'}
                      </button>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-6">
                      {naat.lyrics ? (
                        <div className="space-y-2 text-gray-300 font-arabic text-center">
                          {naat.lyrics.slice(0, showFullLyrics ? undefined : 6).map((line, index) => (
                            <p key={index} className={line === '' ? 'my-4' : ''}>
                              {line || <br />}
                            </p>
                          ))}
                          {!showFullLyrics && naat.lyrics.length > 6 && (
                            <p className="text-pink-500 mt-4">...</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-center py-8">
                          Lyrics not available for this naat
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'credits' && naat.credits && (
                  <div className="space-y-4">
                    <h3 className="text-white font-bold text-lg mb-4">Credits</h3>
                    
                    {naat.credits.composer && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-gray-400">Composer</span>
                        <span className="text-white font-semibold">{naat.credits.composer}</span>
                      </div>
                    )}
                    
                    {naat.credits.writer && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-gray-400">Lyricist</span>
                        <span className="text-white font-semibold">{naat.credits.writer}</span>
                      </div>
                    )}
                    
                    {naat.credits.producer && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-gray-400">Producer</span>
                        <span className="text-white font-semibold">{naat.credits.producer}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-gray-400">Release Year</span>
                      <span className="text-white font-semibold">{naat.year}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <span className="text-gray-400">Label</span>
                      <span className="text-white font-semibold">Awakening Records</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Naats */}
            {relatedNaats.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-6">Related Naats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedNaats.map(related => (
                    <Link
                      key={related.id}
                      href={`/naats/${related.id}`}
                      className="group bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 p-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold truncate">{related.title}</h3>
                          <p className="text-gray-400 text-sm">{related.artist}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{related.duration}</span>
                            <span>•</span>
                            <span>{formatNumber(related.plays)} plays</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .font-arabic {
          font-family: 'Traditional Arabic', 'Amiri', serif;
        }
      `}</style>
    </div>
  )
}