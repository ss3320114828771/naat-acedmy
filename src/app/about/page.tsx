'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('story')

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    { value: '1000+', label: 'Naats', icon: '🎵', color: 'from-pink-500 to-rose-500' },
    { value: '500+', label: 'Products', icon: '📦', color: 'from-purple-500 to-indigo-500' },
    { value: '50K+', label: 'Students', icon: '👥', color: 'from-emerald-500 to-teal-500' },
    { value: '10+', label: 'Years', icon: '📅', color: 'from-orange-500 to-red-500' },
    { value: '100+', label: 'Countries', icon: '🌍', color: 'from-cyan-500 to-blue-500' },
    { value: '24/7', label: 'Support', icon: '🛎️', color: 'from-fuchsia-500 to-pink-500' }
  ]

  const teamMembers = [
    {
      id: 1,
      name: 'Hafiz Sajid Syed',
      role: 'Founder & Administrator',
      email: 'sajid.syed@gmail.com',
      expertise: 'Quran & Naat Studies',
      image: '/n1.jpeg',
      social: { twitter: '#', linkedin: '#', facebook: '#' },
      color: 'from-pink-500 to-rose-500',
      quote: 'Dedicated to preserving the beautiful art of Naat for future generations.'
    },
    {
      id: 2,
      name: 'Qari Abdul Rahman',
      role: 'Senior Naat Instructor',
      email: 'abdul.r@naatacademy.com',
      expertise: 'Tajweed & Naat',
      image: '/n2.jpeg',
      social: { twitter: '#', linkedin: '#', facebook: '#' },
      color: 'from-purple-500 to-indigo-500',
      quote: 'Teaching the art of Naat with proper pronunciation and emotion.'
    },
    {
      id: 3,
      name: 'Rimsha bibi',
      role: 'Islamic Education Director',
      email: 'fatima.k@naatacademy.com',
      expertise: 'Islamic Studies',
      image: '/n3.jpeg',
      social: { twitter: '#', linkedin: '#', facebook: '#' },
      color: 'from-emerald-500 to-teal-500',
      quote: 'Empowering women through Islamic knowledge and spiritual growth.'
    },
    {
      id: 4,
      name: 'Dr. Yusuf Ahmed',
      role: 'Research Scholar',
      email: 'yusuf.a@naatacademy.com',
      expertise: 'Islamic History',
      image: '/n4.jpeg',
      social: { twitter: '#', linkedin: '#', facebook: '#' },
      color: 'from-orange-500 to-red-500',
      quote: 'Preserving the rich history and traditions of Islamic nasheeds.'
    }
  ]

  const milestones = [
    { year: '2015', title: 'Naat Academy Founded', description: 'Started by Hafiz Sajid Syed with a vision to preserve Naat art', icon: '🌟' },
    { year: '2017', title: 'First Online Course', description: 'Launched our first online Naat learning program', icon: '📚' },
    { year: '2019', title: 'Global Reach', description: 'Reached students in 50+ countries worldwide', icon: '🌍' },
    { year: '2021', title: 'E-Commerce Launch', description: 'Started selling Islamic products and naat collections', icon: '🛒' },
    { year: '2023', title: '1 Million Students', description: 'Celebrated teaching over 1 million students globally', icon: '🎉' },
    { year: '2024', title: 'Mobile App Launch', description: 'Launched mobile app for iOS and Android', icon: '📱' }
  ]

  const values = [
    {
      title: 'Authenticity',
      description: 'We ensure all content aligns with authentic Islamic teachings',
      icon: '📖',
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Accessibility',
      description: 'Making Islamic education accessible to everyone, everywhere',
      icon: '🌐',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Excellence',
      description: 'Striving for the highest quality in everything we do',
      icon: '⭐',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      title: 'Community',
      description: 'Building a global community united by love for the Prophet',
      icon: '🤝',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Innovation',
      description: 'Using modern technology to preserve traditional arts',
      icon: '💡',
      color: 'from-purple-500 to-fuchsia-500'
    },
    {
      title: 'Spirituality',
      description: 'Nourishing souls through the beauty of Naat',
      icon: '❤️',
      color: 'from-rose-500 to-pink-500'
    }
  ]

  const testimonials = [
    {
      name: 'Ahmed Khan',
      role: 'Student from UAE',
      text: 'Naat Academy transformed my understanding of Islamic nasheeds. The instructors are world-class!',
      rating: 5,
      image: '/n1.jpeg'
    },
    {
      name: 'Fatima Ali',
      role: 'Student from UK',
      text: 'The best platform for learning Naat. I\'ve improved so much in my recitation.',
      rating: 5,
      image: '/n2.jpeg'
    },
    {
      name: 'Omar Hassan',
      role: 'Student from Malaysia',
      text: 'Amazing collection of naats and excellent teaching methods. Highly recommended!',
      rating: 5,
      image: '/images/n3.jpeg'
    }
  ]

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

      {/* Hero Section */}
      <section className="relative z-10 mb-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Title */}
          <div className="inline-block mb-6">
            <span className="text-8xl animate-bounce inline-block">🕌</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              About Naat Academy
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Preserving and promoting the beautiful art of Naat recitation while providing 
            quality Islamic educational resources to the global Muslim community.
          </p>

          {/* Decorative Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 mb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="relative z-10 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {['story', 'team', 'milestones', 'values', 'testimonials'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Story Tab */}
      {activeTab === 'story' && (
        <section className="relative z-10 container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/n1.jpeg"
                  alt="Naat Academy"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl font-bold">Est. 2015</p>
                  <p className="text-pink-300">10+ Years of Excellence</p>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  <span className="text-pink-400 font-bold">Naat Academy</span> was founded in 2015 by Hafiz Sajid Syed with a simple yet profound mission: to preserve and promote the beautiful art of Naat recitation while providing quality Islamic educational resources to the global Muslim community.
                </p>
                
                <p className="text-lg">
                  What started as a small YouTube channel sharing naats has now grown into a comprehensive platform serving over <span className="text-purple-400 font-bold">50,000 students</span> in more than <span className="text-blue-400 font-bold">100 countries</span>. We've helped countless individuals improve their naat recitation and deepen their love for the Prophet Muhammad (PBUH).
                </p>

                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30 mt-6">
                  <p className="text-white italic text-lg">
                    "The best among you are those who learn the Quran and teach it to others."
                  </p>
                  <p className="text-pink-300 mt-2">- Prophet Muhammad (PBUH)</p>
                </div>

                <p className="text-lg">
                  Today, we continue to innovate and expand our offerings, including <span className="text-emerald-400 font-bold">e-learning courses</span>, a <span className="text-cyan-400 font-bold">digital marketplace</span> for Islamic products, and a growing library of naats from talented artists around the world.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="text-white font-semibold">Our Mission</h3>
                  <p className="text-sm text-gray-400">Preserve and promote Naat art</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl mb-2">👁️</div>
                  <h3 className="text-white font-semibold">Our Vision</h3>
                  <p className="text-sm text-gray-400">Global leader in Islamic content</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <section className="relative z-10 container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Image */}
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-pink-500/30 group-hover:ring-pink-500 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                  <p className={`text-sm text-center bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-semibold mb-2`}>
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-400 text-center mb-3">{member.expertise}</p>
                  
                  <p className="text-sm text-gray-300 text-center italic mb-4">
                    "{member.quote}"
                  </p>

                  {/* Email */}
                  <a
                    href={`mailto:${member.email}`}
                    className="block text-center text-blue-400 hover:text-pink-400 text-sm transition-colors mb-4"
                  >
                    {member.email}
                  </a>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    <a href={member.social.twitter} className="text-gray-400 hover:text-pink-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                    </a>
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-pink-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href={member.social.facebook} className="text-gray-400 hover:text-pink-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <section className="relative z-10 container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="w-1/2 px-6">
                    <div
                      className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105 ${
                        index % 2 === 0 ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div className="text-4xl mb-3">{milestone.icon}</div>
                      <div className="text-2xl font-bold text-pink-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Year Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg z-10">
                    {index + 1}
                  </div>

                  {/* Spacer */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Tab */}
      {activeTab === 'values' && (
        <section className="relative z-10 container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Our Core Values
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10 text-center">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${value.color} bg-clip-text text-transparent mb-3`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 ${value.color.replace('from-', 'border-').split(' ')[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-2xl`}></div>
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 ${value.color.replace('from-', 'border-').split(' ')[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-2xl`}></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Tab */}
      {activeTab === 'testimonials' && (
        <section className="relative z-10 container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              What Our Students Say
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-500 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-6xl text-white/10">"</div>

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 italic mb-6">"{testimonial.text}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-pink-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto mt-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="relative py-16 px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Start your spiritual journey with Naat Academy today
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
              >
                Sign Up Free
              </Link>
              <Link
                href="/naats"
                className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
              >
                Explore Naats
              </Link>
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