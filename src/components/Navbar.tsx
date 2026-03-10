'use client'

import { useState } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Naats', href: '/naats' },
  { name: 'Contact', href: '/contact' },
  { name: 'Information', href: '/information' },
  { name: 'Directions', href: '/directions' },
  { name: 'Cart', href: '/cart' },
  { name: 'Login', href: '/login' },
  { name: 'Sign Up', href: '/signup' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Admin', href: '/admin' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Custom Hamburger Icon SVG
  const HamburgerIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-6 h-6"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
      />
    </svg>
  )

  // Custom Close/X Icon SVG
  const CloseIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-6 h-6"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6 18L18 6M6 6l12 12" 
      />
    </svg>
  )

  return (
    <nav className="relative z-50">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap justify-center gap-4 py-6 px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="button-glow px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold text-sm uppercase tracking-wider hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              style={{
                boxShadow: '0 0 15px rgba(255,105,180,0.5), 0 0 30px rgba(138,43,226,0.3)'
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg rounded-b-2xl">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-110"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
          
          <span className="text-white font-bold text-lg md:text-xl animate-pulse">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Naat Academy
            </span>
          </span>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"></div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav absolute top-20 left-4 right-4 rounded-2xl p-4 z-50 backdrop-blur-xl bg-purple-900/30 border border-white/20 shadow-2xl">
            <div className="flex flex-col space-y-2 max-h-[70vh] overflow-y-auto">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`button-glow px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold text-sm text-center hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fadeIn`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    boxShadow: '0 0 20px rgba(255,20,147,0.5), 0 0 40px rgba(138,43,226,0.3)'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
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
          0% {
            transform: translateX(-100%) rotate(30deg);
          }
          20% {
            transform: translateX(100%) rotate(30deg);
          }
          100% {
            transform: translateX(100%) rotate(30deg);
          }
        }
        
        .mobile-nav {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  )
}