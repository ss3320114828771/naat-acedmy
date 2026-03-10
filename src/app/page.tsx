'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Parallax effect on mouse move - only run after mount
  useEffect(() => {
    if (!mounted) return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  // Auto-rotate hero content
  useEffect(() => {
    if (!mounted) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [mounted])

  // Fixed particle positions - no random values during render
  const particlePositions = Array.from({ length: 50 }, (_, i) => ({
    left: `${(i * 7) % 100}%`,
    top: `${(i * 13) % 100}%`,
    delay: `${(i * 0.1) % 5}s`,
    duration: `${3 + (i % 5)}s`
  }))

  const featuredProducts = [
    { id: 1, name: 'Islamic Book Set', price: 49.99, image: '/n1.jpeg', color: 'from-pink-500 to-rose-500', discount: 20 },
    { id: 2, name: 'Digital Quran', price: 89.99, image: '/n2.jpeg', color: 'from-purple-500 to-indigo-500', discount: 15 },
    { id: 3, name: 'Prayer Mat', price: 29.99, image: '/n3.jpeg', color: 'from-emerald-500 to-teal-500', discount: 10 },
    { id: 4, name: 'Tasbeeh Counter', price: 19.99, image: '/n4.jpeg', color: 'from-orange-500 to-red-500', discount: 25 },
    { id: 5, name: 'Islamic Wall Art', price: 39.99, image: '/n5.jpeg', color: 'from-cyan-500 to-blue-500', discount: 0 },
    { id: 6, name: 'Naat Collection', price: 24.99, image: '/n6.jpeg', color: 'from-fuchsia-500 to-pink-500', discount: 30 }
  ]

  const featuredNaats = [
    { id: 1, title: 'Ya Rasool Allah', artist: 'Mahir Zain', duration: '4:32', color: 'from-amber-500 to-orange-500' },
    { id: 2, title: 'Salamo Alika', artist: 'Mahir Zain', duration: '5:15', color: 'from-lime-500 to-green-500' },
    { id: 3, title: 'Akkia Ya Habeeb', artist: 'Mahir Zain', duration: '3:48', color: 'from-sky-500 to-indigo-500' },
    { id: 4, title: 'Rahmatun Lil\'Alameen', artist: 'Maher Zain', duration: '4:10', color: 'from-violet-500 to-purple-500' },
    { id: 5, title: 'Mawlaya', artist: 'Maher Zain', duration: '4:45', color: 'from-rose-500 to-pink-500' },
    { id: 6, title: 'SubhanAllah', artist: 'Maher Zain', duration: '3:55', color: 'from-teal-500 to-cyan-500' }
  ]

  const testimonials = [
    { name: 'Ahmed Khan', text: 'Beautiful collection of naats! The quality is amazing.', rating: 5, image: '/n1.jpeg' },
    { name: 'Fatima Ali', text: 'My favorite place for Islamic products. JazakAllah!', rating: 5, image: '/n2.jpeg' },
    { name: 'Omar Hassan', text: 'Excellent service and high quality items.', rating: 4, image: '/n3.jpeg' }
  ]

  const heroSlides = [
    {
      title: 'Welcome to Naat Academy',
      subtitle: 'Your Spiritual Journey Begins Here',
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      emoji: '✨'
    },
    {
      title: 'Discover Beautiful Naats',
      subtitle: 'Featuring Mahir Zain & More',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      emoji: '🎵'
    },
    {
      title: 'Islamic Products',
      subtitle: 'Quality Items for Your Faith',
      gradient: 'from-orange-500 via-red-500 to-rose-500',
      emoji: '🛒'
    }
  ]

  // Don't render animated content until after mount
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* Animated Background with Particles - Fixed positions */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900"></div>
        <div className="absolute inset-0 opacity-30">
          {particlePositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-particle"
              style={{
                left: pos.left,
                top: pos.top,
                animationDelay: pos.delay,
                animationDuration: pos.duration
              }}
            />
          ))}
        </div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-float"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-float-delayed"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
      </div>

      {/* Hero Section with 3D Effect */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute top-40 right-40 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 px-4">
          {/* Animated Emoji */}
          <div className="text-8xl animate-bounce-slow">
            {heroSlides[currentSlide].emoji}
          </div>

          {/* Main Title with Gradient */}
          <h1 className="text-6xl md:text-8xl font-black">
            <span className={`bg-gradient-to-r ${heroSlides[currentSlide].gradient} bg-clip-text text-transparent animate-gradient`}>
              {heroSlides[currentSlide].title}
            </span>
          </h1>

          {/* Subtitle with Glow */}
          <p className="text-2xl md:text-3xl text-white/90 animate-pulse-slow">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Link
              href="/products"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/naats"
              className="group relative px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg text-white font-bold text-lg overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              Listen to Naats
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 pt-8">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === i
                    ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '1000+', label: 'Naats', icon: '🎵', color: 'from-pink-500 to-rose-500' },
              { value: '500+', label: 'Products', icon: '📦', color: 'from-purple-500 to-indigo-500' },
              { value: '50K+', label: 'Happy Customers', icon: '😊', color: 'from-emerald-500 to-teal-500' },
              { value: '24/7', label: 'Support', icon: '🛎️', color: 'from-orange-500 to-red-500' }
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className={`text-4xl mb-2 transform group-hover:scale-125 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section with Rainbow Effect */}
      <section className="relative z-10 container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-rainbow">
            Our Colorful Gallery
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const gradients = [
              'from-pink-500 to-rose-500',
              'from-purple-500 to-indigo-500',
              'from-emerald-500 to-teal-500',
              'from-orange-500 to-red-500',
              'from-cyan-500 to-blue-500',
              'from-fuchsia-500 to-pink-500'
            ]
            return (
              <div
                key={num}
                className={`group relative h-48 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 hover:rotate-1`}
              >
                <Image
                  src={`/images/n${num}.jpeg`}
                  alt={`Gallery ${num}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${gradients[num-1]} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-2xl font-bold">✨</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Products with Rainbow Cards */}
      <section className="relative z-10 container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            ✨ Featured Products ✨
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-gradient-to-br ${product.color} rounded-2xl p-1 transform hover:scale-105 transition-all duration-500 hover:rotate-1`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gray-900/90 rounded-2xl p-6 h-full backdrop-blur-sm">
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${(product.price * (1 + product.discount/100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-white/20 to-white/5 rounded-xl text-white hover:from-pink-500 hover:to-purple-500 transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Naats with Music Player Style */}
      <section className="relative z-10 container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            🎵 Mahir Zain Collection 🎵
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredNaats.map((naat, index) => (
            <div
              key={naat.id}
              className={`group bg-gradient-to-br ${naat.color} rounded-2xl p-1 transform hover:scale-105 transition-all duration-500`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gray-900/90 rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                    <span className="text-2xl animate-pulse">🎵</span>
                  </div>
                  <span className="text-sm text-gray-400">{naat.duration}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{naat.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{naat.artist}</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-white/20 to-white/5 rounded-xl text-white hover:from-pink-500 hover:to-purple-500 transition-all duration-300">
                    Play
                  </button>
                  <button className="p-2 bg-white/10 rounded-xl text-white hover:bg-pink-500 transition-all duration-300">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials with Rainbow Cards */}
      <section className="relative z-10 container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            ⭐ What Our Customers Say ⭐
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold">{testimonial.name}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Health Importance with Animated Background */}
      <section className="relative z-10 container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 animate-gradient"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative p-12 text-white text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-yellow-300 via-green-300 to-blue-300 bg-clip-text text-transparent">
                🌿 The Importance of Health in Islam 🌿
              </span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-gray-200 leading-relaxed">
                "There are two blessings which many people waste: <span className="text-yellow-300 font-bold">health</span> and <span className="text-green-300 font-bold">free time</span>." 
                <span className="block text-sm text-gray-400 mt-2">- Prophet Muhammad (PBUH) [Bukhari]</span>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl mb-2 animate-bounce">💪</div>
                  <h3 className="font-bold text-lg">Physical Health</h3>
                  <p className="text-sm text-gray-300">Exercise, diet, and hygiene as per Sunnah</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl mb-2 animate-bounce animation-delay-200">🧠</div>
                  <h3 className="font-bold text-lg">Mental Health</h3>
                  <p className="text-sm text-gray-300">Peace through prayer and remembrance</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="text-4xl mb-2 animate-bounce animation-delay-400">❤️</div>
                  <h3 className="font-bold text-lg">Spiritual Health</h3>
                  <p className="text-sm text-gray-300">Nourish your soul with naats and Quran</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Administrator Section with Glow */}
      <section className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
          <div className="bg-gray-900/90 backdrop-blur-lg rounded-3xl p-8 px-16">
            <div className="text-6xl mb-4 animate-bounce">👑</div>
            <h3 className="text-3xl font-bold text-white mb-2">Administrator</h3>
            <p className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Hafiz Sajid Syed
            </p>
            <p className="text-xl text-blue-400 mt-2 hover:text-pink-400 transition-colors cursor-pointer">
              sajidsyedhafizsajidsyed@gmail.com
            </p>
            <div className="mt-4 flex gap-2 justify-center">
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Founder</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Admin</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Qari</span>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes particle {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle 8s linear infinite;
        }
        
        .animate-rainbow {
          background-size: 300% 300%;
          animation: rainbow 5s ease infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  )
}