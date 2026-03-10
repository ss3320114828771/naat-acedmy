'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function InformationPage() {
  const [activeTab, setActiveTab] = useState('about')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showHealthTip, setShowHealthTip] = useState(false)
  const [currentHealthTip, setCurrentHealthTip] = useState('')

  // Health tips data
  const healthTips = [
    {
      id: 1,
      title: "The Prophet's (PBUH) Guidance on Health",
      content: "The Prophet Muhammad (PBUH) said: 'Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your preoccupation, and your life before your death.' (Narrated by Ibn Abbas)",
      category: "Spiritual Health"
    },
    {
      id: 2,
      title: "Moderation in Eating",
      content: "The Prophet (PBUH) said: 'The son of Adam does not fill any vessel worse than his stomach. It is sufficient for the son of Adam to eat a few mouthfuls to keep his back straight. If he must eat more, then he should fill one third with food, one third with drink, and leave one third for easy breathing.' (Tirmidhi)",
      category: "Physical Health"
    },
    {
      id: 3,
      title: "Benefits of Fasting",
      content: "Fasting not only brings spiritual rewards but also has numerous health benefits. It helps in detoxification, improves insulin sensitivity, promotes autophagy (cellular cleanup), and can aid in weight management. The Prophet (PBUH) recommended fasting on Mondays and Thursdays.",
      category: "Physical Health"
    },
    {
      id: 4,
      title: "Honey: A Healing Remedy",
      content: "The Quran mentions: 'There emerges from their bellies a drink, varying in colors, in which there is healing for people.' (Surah An-Nahl 16:69). Honey has antibacterial properties, soothes sore throats, boosts immunity, and provides natural energy.",
      category: "Natural Remedies"
    },
    {
      id: 5,
      title: "Black Seed (Kalonji)",
      content: "The Prophet (PBUH) said: 'Use the black seed, because it contains a cure for every type of disease except death.' (Bukhari). Black seed oil boosts immunity, aids digestion, and has anti-inflammatory properties.",
      category: "Natural Remedies"
    },
    {
      id: 6,
      title: "Olive Oil Blessings",
      content: "Allah says in the Quran: 'And a tree (olive) that springs forth from Mount Sinai, which grows oil; and it is a relish for the eaters.' (Surah Al-Mu'minun 23:20). Olive oil is rich in healthy fats, antioxidants, and supports heart health.",
      category: "Nutrition"
    },
    {
      id: 7,
      title: "Physical Cleanliness",
      content: "The Prophet (PBUH) emphasized cleanliness, saying: 'Cleanliness is half of faith.' (Muslim). Regular bathing, oral hygiene (using miswak), and maintaining purity are essential for physical and spiritual well-being.",
      category: "Hygiene"
    },
    {
      id: 8,
      title: "Walking and Exercise",
      content: "The Prophet (PBUH) encouraged walking to the mosque and physical activities like swimming, archery, and horse riding. Regular exercise improves cardiovascular health, strengthens muscles, and boosts mental well-being.",
      category: "Physical Activity"
    },
    {
      id: 9,
      title: "Early to Sleep, Early to Rise",
      content: "Following the Sunnah of sleeping early and waking early for Fajr prayer aligns with our natural circadian rhythms. This habit improves productivity, mental clarity, and overall health.",
      category: "Lifestyle"
    },
    {
      id: 10,
      title: "Dates: The Blessed Fruit",
      content: "The Prophet (PBUH) recommended breaking fast with dates. Dates are rich in fiber, natural sugars, potassium, and magnesium. They provide instant energy and aid digestion.",
      category: "Nutrition"
    }
  ]

  // FAQs data
  const faqs = [
    {
      id: 1,
      question: "What is Naat Academy?",
      answer: "Naat Academy is an online platform dedicated to preserving and promoting the beautiful art of Naat recitation. We provide a collection of naats from various artists, Islamic educational resources, and products to support your spiritual journey."
    },
    {
      id: 2,
      question: "Who is the administrator of Naat Academy?",
      answer: "Naat Academy is administered by Hafiz Sajid Syed, a dedicated scholar with years of experience in Islamic education and naat recitation. You can contact him at sajid.syed@gmail.com for any inquiries."
    },
    {
      id: 3,
      question: "Is the content on Naat Academy free?",
      answer: "Many of our naats and educational resources are available for free. However, some premium content and products may require purchase to support our platform and artists."
    },
    {
      id: 4,
      question: "How can I download naats?",
      answer: "Registered users can download naats by clicking the download button on each naat's page. You'll need to be logged in to your account to access downloads."
    },
    {
      id: 5,
      question: "Can I submit my own naat recordings?",
      answer: "Yes! We welcome submissions from talented naat reciters. Please contact our administrator at sajid.syed@gmail.com with your recordings and credentials for review."
    },
    {
      id: 6,
      question: "How do I purchase products from the shop?",
      answer: "Simply browse our products page, add items to your cart, and proceed to checkout. You can pay using various methods including credit cards, PayPal, and other payment options."
    },
    {
      id: 7,
      question: "What is the return policy?",
      answer: "We offer a 30-day return policy for most physical products. Digital downloads and naat purchases are non-refundable. Please contact us for any issues with your order."
    },
    {
      id: 8,
      question: "How can I support Naat Academy?",
      answer: "You can support us by purchasing products, sharing our content, submitting your naats, or making a donation. Contact us for more information on supporting our mission."
    }
  ]

  // Team members
  const teamMembers = [
    {
      name: "Hafiz Sajid Syed",
      role: "Founder & Administrator",
      email: "sajid.syed@gmail.com",
      expertise: "Quran & Naat Studies",
      image: "/images/n1.jpeg"
    },
    {
      name: "Qari Abdul Rahman",
      role: "Senior Naat Instructor",
      email: "abdul.r@naatacademy.com",
      expertise: "Tajweed & Naat",
      image: "/images/n2.jpeg"
    },
    {
      name: "Ustadha Fatima Khan",
      role: "Islamic Education Director",
      email: "fatima.k@naatacademy.com",
      expertise: "Islamic Studies",
      image: "/images/n3.jpeg"
    }
  ]

  // Get random health tip
  const getRandomHealthTip = () => {
    const randomIndex = Math.floor(Math.random() * healthTips.length)
    setCurrentHealthTip(healthTips[randomIndex].content)
    setShowHealthTip(true)
    setTimeout(() => setShowHealthTip(false), 5000)
  }

  // Toggle FAQ
  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
            Information Center
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Learn more about Naat Academy, Islamic health practices, and frequently asked questions
        </p>
      </div>

      {/* Quick Health Tip Button */}
      <div className="relative z-10 flex justify-center mb-8">
        <button
          onClick={getRandomHealthTip}
          className="button-glow px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg hover:from-blue-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
        >
          <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Get Random Health Tip
        </button>
      </div>

      {/* Health Tip Popup */}
      {showHealthTip && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full animate-slideDown">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 shadow-2xl border-2 border-white/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white text-sm">{currentHealthTip}</p>
              </div>
              <button
                onClick={() => setShowHealthTip(false)}
                className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tabs */}
      <div className="relative z-10">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'health'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Health in Islam
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'team'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Our Team
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'faq'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          {/* About Us Tab */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-block p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">About Naat Academy</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Naat Academy was founded with a simple yet profound mission: to preserve and promote the beautiful art of Naat recitation while providing quality Islamic educational resources to the global Muslim community.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
                  <p className="text-gray-400">
                    To provide a comprehensive platform for learning, sharing, and experiencing the spiritual beauty of Naat and Islamic teachings, making them accessible to Muslims worldwide.
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-3">👁️</div>
                  <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
                  <p className="text-gray-400">
                    To become the world's leading digital destination for Islamic spiritual content, fostering love for Prophet Muhammad (PBUH) through the powerful medium of Naat.
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="text-xl font-bold text-white mb-2">Our Values</h3>
                  <p className="text-gray-400">
                    Authenticity, accessibility, and spiritual excellence guide everything we do. We ensure all content aligns with Islamic teachings and promotes genuine love for the Prophet (PBUH).
                  </p>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-3">🌍</div>
                  <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
                  <p className="text-gray-400">
                    Serving thousands of students and customers worldwide, we're building a global community united by love for the Prophet (PBUH) and commitment to Islamic learning.
                  </p>
                </div>
              </div>

              {/* Administrator Highlight */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Meet Our Founder</h3>
                <p className="text-white text-lg mb-4">Hafiz Sajid Syed</p>
                <p className="text-white/90 mb-4">
                  A dedicated scholar with years of experience in Islamic education and naat recitation, Hafiz Sajid founded Naat Academy to share the beauty of Naat with the world.
                </p>
                <a 
                  href="mailto:sajid.syed@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  sajid.syed@gmail.com
                </a>
              </div>
            </div>
          )}

          {/* Health in Islam Tab */}
          {activeTab === 'health' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">The Importance of Health in Islam</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Islam places great emphasis on maintaining good health, considering it one of the greatest blessings from Allah. The Prophet Muhammad (PBUH) said: "There are two blessings which many people waste: health and free time." (Bukhari)
                </p>
              </div>

              {/* Health Tips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 hover:border-green-500/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full">
                          {tip.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-3 mb-2">{tip.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{tip.content}</p>
                  </div>
                ))}
              </div>

              {/* Quranic Verses */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Quranic Guidance on Health</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-white text-lg mb-2 text-center font-arabic">
                      "And eat and drink, but be not excessive. Indeed, He likes not those who commit excess."
                    </p>
                    <p className="text-white/80 text-sm text-center">Surah Al-A'raf (7:31)</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-white text-lg mb-2 text-center font-arabic">
                      "And We sent down from the Quran that which is healing and mercy for the believers."
                    </p>
                    <p className="text-white/80 text-sm text-center">Surah Al-Isra (17:82)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Our Team</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Meet the dedicated individuals working behind the scenes to bring you the best Islamic content and products.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-pink-400 text-sm mb-2">{member.role}</p>
                      <p className="text-gray-400 text-sm mb-3">{member.expertise}</p>
                      <a 
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Team */}
              <div className="bg-white/5 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Want to Join Our Team?</h3>
                <p className="text-gray-400 mb-6">
                  We're always looking for talented individuals passionate about Islamic content and education.
                </p>
                <a 
                  href="mailto:careers@naatacademy.com"
                  className="button-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Careers@naatacademy.com
                </a>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-300 max-w-3xl mx-auto">
                  Find answers to common questions about Naat Academy, our services, and how to make the most of your experience.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="text-white font-semibold">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          expandedFaq === faq.id ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-4 animate-fadeIn">
                        <p className="text-gray-400">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Still Have Questions */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
                <p className="text-white/90 mb-6">
                  Can't find the answer you're looking for? Please contact our support team.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a 
                    href="mailto:support@naatacademy.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    support@naatacademy.com
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Us
                  </Link>
                </div>
              </div>
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
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
        
        .font-arabic {
          font-family: 'Traditional Arabic', 'Amiri', serif;
        }
      `}</style>
    </div>
  )
}