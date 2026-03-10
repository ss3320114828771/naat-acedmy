'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
}

// Sample naats data
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
    isNew: false,
    description: 'A beautiful nasheed praising Prophet Muhammad (PBUH)',
    year: 2023,
    language: 'Arabic'
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
    isNew: false,
    description: 'Peace be upon you, a heartfelt greeting to the Prophet',
    year: 2023,
    language: 'Arabic'
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
    isFeatured: true,
    isNew: true,
    description: 'A soulful naat expressing love for the beloved Prophet',
    year: 2024,
    language: 'Arabic'
  },
  {
    id: 4,
    title: 'Rahmatun Lil\'Alameen',
    artist: 'Maher Zain',
    duration: '4:10',
    category: 'Nasheed',
    plays: 2100000,
    likes: 156000,
    image: '/images/n4.jpeg',
    audioUrl: '/audio/rahmatun.mp3',
    isFeatured: true,
    isNew: false,
    description: 'Mercy to all worlds - celebrating the Prophet\'s mercy',
    year: 2022,
    language: 'Arabic'
  },
  {
    id: 5,
    title: 'Tala\'al Badru Alayna',
    artist: 'Various Artists',
    duration: '3:55',
    category: 'Traditional',
    plays: 850000,
    likes: 62300,
    image: '/images/n5.jpeg',
    audioUrl: '/audio/talaal.mp3',
    isFeatured: false,
    isNew: false,
    description: 'Traditional Islamic song welcoming the Prophet to Madinah',
    year: 2021,
    language: 'Arabic'
  },
  {
    id: 6,
    title: 'Mawlaya',
    artist: 'Maher Zain',
    duration: '4:45',
    category: 'Nasheed',
    plays: 1750000,
    likes: 123000,
    image: '/images/n6.jpeg',
    audioUrl: '/audio/mawlaya.mp3',
    isFeatured: true,
    isNew: false,
    description: 'A beautiful supplication to Allah',
    year: 2022,
    language: 'Arabic'
  },
  {
    id: 7,
    title: 'Qad Kafani',
    artist: 'Humood AlKhudher',
    duration: '3:28',
    category: 'Nasheed',
    plays: 560000,
    likes: 38900,
    image: '/images/n1.jpeg',
    audioUrl: '/audio/qadkafani.mp3',
    isFeatured: false,
    isNew: true,
    description: 'A soothing nasheed about contentment',
    year: 2024,
    language: 'Arabic'
  },
  {
    id: 8,
    title: 'Labbaik Allahumma Labbaik',
    artist: 'Mishary Rashid',
    duration: '6:20',
    category: 'Hajj',
    plays: 3200000,
    likes: 245000,
    image: '/images/n2.jpeg',
    audioUrl: '/audio/labbaik.mp3',
    isFeatured: true,
    isNew: false,
    description: 'The Talbiyah - Hajj pilgrimage chant',
    year: 2020,
    language: 'Arabic'
  },
  {
    id: 9,
    title: 'SubhanAllah',
    artist: 'Maher Zain',
    duration: '3:55',
    category: 'Nasheed',
    plays: 4250000,
    likes: 312000,
    image: '/images/n3.jpeg',
    audioUrl: '/audio/subhanallah.mp3',
    isFeatured: true,
    isNew: false,
    description: 'Glorifying Allah in beautiful melody',
    year: 2021,
    language: 'English/Arabic'
  }
]

// Categories for filtering
const categories = [
  'All',
  'Nasheed',
  'Traditional',
  'Hajj',
  'Ramadan',
  'Quran',
  'Dua'
]

// Artists for filtering
const artists = [
  'All',
  'Mahir Zain',
  'Maher Zain',
  'Humood AlKhudher',
  'Mishary Rashid',
  'Various Artists'
]

// Sort options
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'duration-asc', label: 'Shortest First' },
  { value: 'duration-desc', label: 'Longest First' }
]

export default function NaatsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedArtist, setSelectedArtist] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  // Filter and sort naats
  const filteredNaats = naats
    .filter(naat => {
      // Category filter
      if (selectedCategory !== 'All' && naat.category !== selectedCategory) {
        return false
      }
      
      // Artist filter
      if (selectedArtist !== 'All' && naat.artist !== selectedArtist) {
        return false
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return naat.title.toLowerCase().includes(query) ||
               naat.artist.toLowerCase().includes(query) ||
               naat.description.toLowerCase().includes(query)
      }
      
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.year - a.year
        case 'oldest':
          return a.year - b.year
        case 'duration-asc':
          return parseDuration(a.duration) - parseDuration(b.duration)
        case 'duration-desc':
          return parseDuration(b.duration) - parseDuration(a.duration)
        default:
          return b.plays - a.plays
      }
    })

  // Helper to parse duration string to seconds
  function parseDuration(duration: string): number {
    const [minutes, seconds] = duration.split(':').map(Number)
    return minutes * 60 + seconds
  }

  // Toggle favorite
  const toggleFavorite = (naatId: number) => {
    setFavorites(prev =>
      prev.includes(naatId)
        ? prev.filter(id => id !== naatId)
        : [...prev, naatId]
    )
  }

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
  const togglePlay = (naat: Naat) => {
    if (currentlyPlaying === naat.id) {
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    } else {
      if (audioRef.current) {
        audioRef.current.src = naat.audioUrl
        audioRef.current.load()
        audioRef.current.play()
        setCurrentlyPlaying(naat.id)
        setIsPlaying(true)
      }
    }
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

  // Naat card component
  const NaatCard = ({ naat }: { naat: Naat }) => (
    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      {/* Favorite button */}
      <button
        onClick={() => toggleFavorite(naat.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-pink-500 transition-colors duration-300"
      >
        <svg
          className={`w-5 h-5 ${
            favorites.includes(naat.id) ? 'text-pink-500 fill-current' : 'text-white'
          }`}
          fill={favorites.includes(naat.id) ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Featured badge */}
      {naat.isFeatured && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
          Featured
        </div>
      )}

      {/* New badge */}
      {naat.isNew && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
          NEW
        </div>
      )}

      {/* Naat image with play button overlay */}
      <div className="relative h-48 sm:h-56 md:h-64">
        <Image
          src={naat.image}
          alt={naat.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => togglePlay(naat)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
          >
            {currentlyPlaying === naat.id && isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Naat details */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-pink-400 font-semibold">{naat.category}</span>
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{naat.title}</h3>
          <p className="text-gray-400 text-sm mb-2">{naat.artist}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{formatNumber(naat.plays)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{formatNumber(naat.likes)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{naat.duration}</span>
          </div>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
            {naat.language}
          </span>
          <span className="text-xs text-gray-500">{naat.year}</span>
        </div>
      </div>
    </div>
  )

  // List view naat card
  const NaatListItem = ({ naat }: { naat: Naat }) => (
    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Naat image */}
        <div className="relative w-full md:w-48 h-48">
          <Image
            src={naat.image}
            alt={naat.title}
            fill
            className="object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {naat.isFeatured && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                Featured
              </span>
            )}
            {naat.isNew && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                NEW
              </span>
            )}
          </div>

          {/* Play button */}
          <button
            onClick={() => togglePlay(naat)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
              {currentlyPlaying === naat.id && isPlaying ? (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* Naat details */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs text-pink-400 font-semibold">{naat.category}</span>
              <h3 className="text-white font-bold text-xl mb-1">{naat.title}</h3>
              <p className="text-gray-400 mb-2">{naat.artist}</p>
              <p className="text-gray-500 text-sm mb-4">{naat.description}</p>
            </div>
            
            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(naat.id)}
              className="p-2 rounded-full hover:bg-pink-500/20 transition-colors"
            >
              <svg
                className={`w-6 h-6 ${
                  favorites.includes(naat.id) ? 'text-pink-500 fill-current' : 'text-white'
                }`}
                fill={favorites.includes(naat.id) ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{formatNumber(naat.plays)} plays</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{formatNumber(naat.likes)} likes</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{naat.duration}</span>
            </div>
          </div>

          {/* Language and year */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
              {naat.language}
            </span>
            <span className="text-xs text-gray-500">{naat.year}</span>
          </div>

          {/* Play button */}
          <button
            onClick={() => togglePlay(naat)}
            className="mt-4 button-glow px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          >
            {currentlyPlaying === naat.id && isPlaying ? 'Pause' : 'Play Now'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Hidden audio element */}
      <audio ref={audioRef} />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
            Naat Collection
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Listen to beautiful naats and nasheeds from your favorite artists
        </p>
      </div>

      {/* Audio player bar - shows when playing */}
      {currentlyPlaying && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-pink-900 backdrop-blur-lg border-t border-white/20 p-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4">
              {/* Now playing info */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={naats.find(n => n.id === currentlyPlaying)?.image || ''}
                    alt="Now playing"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {naats.find(n => n.id === currentlyPlaying)?.title}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {naats.find(n => n.id === currentlyPlaying)?.artist}
                  </p>
                </div>
              </div>

              {/* Playback controls */}
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <button className="text-white hover:text-pink-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => togglePlay(naats.find(n => n.id === currentlyPlaying)!)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    )}
                  </button>
                  <button className="text-white hover:text-pink-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4z" />
                    </svg>
                  </button>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2 w-full">
                  <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                  <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Volume control */}
              <div className="relative">
                <button
                  onClick={() => setShowVolumeControl(!showVolumeControl)}
                  className="text-white hover:text-pink-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                {showVolumeControl && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-900 rounded-lg">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
                      style={{ transform: 'rotate(-90deg)' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and filters bar */}
      <div className="relative z-10 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full lg:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search naats, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              />
              <svg
                className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full px-4 py-3 bg-white/10 backdrop-blur-lg rounded-xl text-white font-semibold flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full lg:w-auto px-4 py-3 rounded-xl bg-white/10 backdrop-blur-lg text-white border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value} className="bg-gray-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Categories */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Artists */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Artists
            </h3>
            <div className="space-y-2">
              {artists.map(artist => (
                <button
                  key={artist}
                  onClick={() => setSelectedArtist(artist)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedArtist === artist
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {artist}
                </button>
              ))}
            </div>
          </div>

          {/* Clear filters */}
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSelectedArtist('All')
              setSearchQuery('')
            }}
            className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all"
          >
            Clear All Filters
          </button>
        </div>

        {/* Naats grid */}
        <div className="flex-1">
          {/* Results count */}
          <p className="text-gray-400 mb-4">
            Showing {filteredNaats.length} naats
          </p>

          {/* Naats display */}
          {filteredNaats.length === 0 ? (
            <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-3xl">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-white text-xl font-bold mb-2">No naats found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {filteredNaats.map(naat => (
                viewMode === 'grid' ? (
                  <NaatCard key={naat.id} naat={naat} />
                ) : (
                  <NaatListItem key={naat.id} naat={naat} />
                )
              ))}
            </div>
          )}
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
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .button-glow {
          position: relative;
          overflow: hidden;
        }
        
        .button-glow::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.3) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: rotate(30deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(30deg); }
          20% { transform: translateX(100%) rotate(30deg); }
          100% { transform: translateX(100%) rotate(30deg); }
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}