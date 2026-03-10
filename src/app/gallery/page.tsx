'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

// Gallery images data with correct paths
const galleryImages = [
  // Event Images (1-6)
  { id: 1, src: '/n1.jpeg', title: 'Annual Naat Night 2024', category: 'events', date: 'March 2024', location: 'Islamic Center NYC' },
  { id: 2, src: '/n2.jpeg', title: 'Qirat Competition', category: 'events', date: 'February 2024', location: 'Community Hall' },
  { id: 3, src: '/n3.jpeg', title: 'Islamic Art Exhibition', category: 'events', date: 'January 2024', location: 'Cultural Center' },
  { id: 4, src: '/n4.jpeg', title: 'Ramadan Gathering', category: 'events', date: 'March 2024', location: 'Main Mosque' },
  { id: 5, src: '/n5.jpeg', title: 'Eid Celebration', category: 'events', date: 'April 2024', location: 'Community Center' },
  { id: 6, src: '/n6.jpeg', title: 'Youth Workshop', category: 'events', date: 'February 2024', location: 'Education Hall' },
  
  // Students images
  { id: 7, src: '/n1.jpeg', title: 'Students Reciting Naat', category: 'students', date: 'March 2024', location: 'Classroom A' },
  { id: 8, src: '/n2.jpeg', title: 'Graduation Ceremony', category: 'students', date: 'December 2023', location: 'Main Hall' },
  { id: 9, src: '/n3.jpeg', title: 'Learning Session', category: 'students', date: 'January 2024', location: 'Library' },
  { id: 10, src: '/n4.jpeg', title: 'Group Practice', category: 'students', date: 'February 2024', location: 'Studio 1' },
  { id: 11, src: '/n5.jpeg', title: 'Workshop', category: 'students', date: 'March 2024', location: 'Conference Room' },
  { id: 12, src: '/n6.jpeg', title: 'Study Circle', category: 'students', date: 'April 2024', location: 'Prayer Hall' },
  
  // Products images
  { id: 13, src: '/n1.jpeg', title: 'Quran Collection', category: 'products', date: '2024', location: 'Bookstore' },
  { id: 14, src: '/n2.jpeg', title: 'Prayer Mats', category: 'products', date: '2024', location: 'Gift Shop' },
  { id: 15, src: '/n3.jpeg', title: 'Digital Quran', category: 'products', date: '2024', location: 'Electronics' },
  { id: 16, src: '/n4.jpeg', title: 'Islamic Books', category: 'products', date: '2024', location: 'Library' },
  { id: 17, src: '/n5.jpeg', title: 'Tasbeeh Collection', category: 'products', date: '2024', location: 'Accessories' },
  { id: 18, src: '/n6.jpeg', title: 'Wall Art', category: 'products', date: '2024', location: 'Home Decor' },
]

const categories = [
  { id: 'all', name: 'All Photos', icon: '🖼️', color: 'from-pink-500 to-rose-500' },
  { id: 'events', name: 'Events', icon: '🎉', color: 'from-purple-500 to-indigo-500' },
  { id: 'students', name: 'Students', icon: '👥', color: 'from-emerald-500 to-teal-500' },
  { id: 'products', name: 'Products', icon: '📦', color: 'from-orange-500 to-red-500' },
]

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<null | typeof galleryImages[0]>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(img => {
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         img.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Handle image error
  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  // Close lightbox
  const closeLightbox = () => setSelectedImage(null)

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id)
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    
    if (newIndex >= filteredImages.length) newIndex = 0
    if (newIndex < 0) newIndex = filteredImages.length - 1
    
    setSelectedImage(filteredImages[newIndex])
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return
      
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, filteredImages])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-2xl">Loading Gallery...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-float"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${5 + (i % 5)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-12">
        <div className="inline-block mb-6">
          <span className="text-8xl animate-bounce inline-block">🖼️</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-black mb-6">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
            Our Gallery
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore moments from our events, student gatherings, and beautiful Islamic products
        </p>

        {/* Decorative Line */}
        <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Category Filters */}
      <div className="relative z-10 container mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              {selectedCategory === category.id && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-ping"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search and View Toggle */}
      <div className="relative z-10 container mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search Bar */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 outline-none transition-all"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-3 rounded-xl transition-all ${
                viewMode === 'masonry'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="relative z-10 container mx-auto">
        {/* Results Count */}
        <p className="text-gray-400 mb-4">
          Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
        </p>

        {/* Image Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-lg rounded-3xl">
            <div className="text-6xl mb-4">😢</div>
            <h3 className="text-2xl font-bold text-white mb-2">No images found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6'
          }>
            {filteredImages.map((image, index) => {
              const gradients = [
                'from-pink-500 to-rose-500',
                'from-purple-500 to-indigo-500',
                'from-emerald-500 to-teal-500',
                'from-orange-500 to-red-500',
                'from-cyan-500 to-blue-500',
                'from-fuchsia-500 to-pink-500'
              ]
              const gradient = gradients[index % gradients.length]
              const hasError = imageErrors[image.id]
              
              return viewMode === 'grid' ? (
                // Grid View
                <div
                  key={image.id}
                  onClick={() => !hasError && setSelectedImage(image)}
                  className={`group relative cursor-pointer transform hover:scale-105 transition-all duration-500 hover:rotate-1 ${
                    hasError ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 group-hover:border-pink-500/50 transition-all duration-500">
                    <div className="relative h-64 w-full">
                      {!hasError ? (
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={() => handleImageError(image.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                          <div className="text-center text-white p-4">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p className="text-sm">Image unavailable</p>
                          </div>
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="bg-black/70 backdrop-blur-lg rounded-xl p-3">
                          <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                          <p className="text-pink-300 text-xs">{image.date}</p>
                          <p className="text-gray-400 text-xs mt-1">{image.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Masonry View
                <div
                  key={image.id}
                  onClick={() => !hasError && setSelectedImage(image)}
                  className={`group relative cursor-pointer mb-6 break-inside-avoid transform hover:scale-105 transition-all duration-500 ${
                    hasError ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 group-hover:border-pink-500/50 transition-all duration-500">
                    <div className={`relative ${
                      index % 3 === 0 ? 'h-96' : index % 3 === 1 ? 'h-64' : 'h-80'
                    } w-full`}>
                      {!hasError ? (
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={() => handleImageError(image.id)}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                          <div className="text-center text-white p-4">
                            <div className="text-4xl mb-2">🖼️</div>
                            <p className="text-sm">Image unavailable</p>
                          </div>
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}></div>
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="bg-black/70 backdrop-blur-lg rounded-xl p-3">
                          <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                          <p className="text-pink-300 text-xs">{image.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && !imageErrors[selectedImage.id] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeLightbox}
          ></div>

          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative z-40 max-w-5xl w-full max-h-[90vh]">
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedImage.title}</h2>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {selectedImage.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {selectedImage.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    </svg>
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}