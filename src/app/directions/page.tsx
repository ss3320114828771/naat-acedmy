'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DirectionsPage() {
  const [selectedTransport, setSelectedTransport] = useState<'car' | 'train' | 'bus' | 'walk'>('car')
  const [showMap, setShowMap] = useState(true)
  const [fromLocation, setFromLocation] = useState('')
  const [directions, setDirections] = useState<string | null>(null)

  // Location coordinates (example: Islamic Center of New York)
  const location = {
    name: "Naat Academy Head Office",
    address: "123 Islamic Center Street, Manhattan, NY 10001",
    phone: "+1 (212) 555-7867",
    email: "directions@naatacademy.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM, Sun: Closed",
    lat: 40.7128,
    lng: -74.0060,
    landmark: "Near Islamic Cultural Center"
  }

  // Transport icons
  const TransportIcon = ({ type }: { type: string }) => {
    switch(type) {
      case 'car':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 7h8m-8 7h8M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
        )
      case 'train':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
        )
      case 'bus':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4m-9 4v10" />
          </svg>
        )
      case 'walk':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      default:
        return null
    }
  }

  // Get directions based on transport mode
  const getDirections = () => {
    if (!fromLocation) {
      alert('Please enter your starting location')
      return
    }

    // Simulate getting directions
    setDirections(`Directions from ${fromLocation} to ${location.name}:
    
🅿️ By Car (estimated 25 minutes):
• Head north on Main St toward Islamic Center Blvd
• Turn right onto Islamic Center Blvd
• Continue straight for 2.5 miles
• Turn left onto Prophet's Way
• Destination will be on your right

🚇 Public Transport:
• Take the subway to 96th Street Station
• Exit and walk east toward Islamic Center Blvd
• Board bus #72 towards Cultural District
• Get off at Islamic Center stop
• Walk 2 minutes north to destination

🚶 Walking directions (if nearby):
• Head northeast on Islamic Center Blvd
• Pass the Islamic Bookstore
• Turn right at the minaret
• Continue past the fountain
• Enter through the main gate with green dome`)

    // Scroll to directions
    setTimeout(() => {
      document.getElementById('directions-result')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  // Nearby places
  const nearbyPlaces = [
    {
      name: "Islamic Cultural Center",
      distance: "0.2 miles",
      icon: "🕌"
    },
    {
      name: "Halal Food Market",
      distance: "0.3 miles",
      icon: "🥘"
    },
    {
      name: "Muslim Community Center",
      distance: "0.5 miles",
      icon: "🏛️"
    },
    {
      name: "Islamic Bookstore",
      distance: "0.1 miles",
      icon: "📚"
    },
    {
      name: "Halal Restaurant",
      distance: "0.4 miles",
      icon: "🍽️"
    },
    {
      name: "Parking Garage",
      distance: "0.2 miles",
      icon: "🅿️"
    }
  ]

  // Parking information
  const parkingInfo = [
    {
      name: "Islamic Center Parking Lot",
      spots: "50 spaces",
      rate: "Free for visitors",
      hours: "24/7"
    },
    {
      name: "Street Parking",
      spots: "Metered",
      rate: "$2/hour",
      hours: "8 AM - 8 PM"
    },
    {
      name: "Premium Garage",
      spots: "200 spaces",
      rate: "$10/day",
      hours: "24/7"
    }
  ]

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
        <div className="inline-block p-4 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mb-4 animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Directions & Location
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Find your way to Naat Academy. We're located in the heart of the Islamic Cultural District.
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Location Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Address Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Location
            </h2>
            <div className="space-y-3">
              <p className="text-white font-semibold">{location.name}</p>
              <p className="text-gray-400">{location.address}</p>
              <p className="text-pink-400">{location.landmark}</p>
              
              <div className="pt-3 border-t border-white/10">
                <a 
                  href={`tel:${location.phone}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {location.phone}
                </a>
                
                <a 
                  href={`mailto:${location.email}`}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {location.email}
                </a>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hours of Operation
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-red-400">Closed</span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-yellow-400 text-sm">* Jumu'ah prayers: 1:30 PM</p>
              </div>
            </div>
          </div>

          {/* Transport Selection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Select Transport
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(['car', 'train', 'bus', 'walk'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedTransport(mode)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedTransport === mode
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <TransportIcon type={mode} />
                  <span className="capitalize">{mode}</span>
                </button>
              ))}
            </div>

            {/* From Location Input */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter your starting location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              />
              <button
                onClick={getDirections}
                className="button-glow w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-green-500 transition-all duration-300"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Map and Directions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
            <div className="relative h-96 w-full bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Custom Map Representation */}
              <div className="absolute inset-0">
                {/* Grid lines */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
                
                {/* Streets */}
                <div className="absolute left-1/4 top-0 w-1 h-full bg-blue-500/20"></div>
                <div className="absolute left-3/4 top-0 w-1 h-full bg-green-500/20"></div>
                <div className="absolute top-1/3 left-0 w-full h-1 bg-purple-500/20"></div>
                <div className="absolute top-2/3 left-0 w-full h-1 bg-pink-500/20"></div>
                
                {/* Location Marker */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <span className="text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
                        Naat Academy
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nearby landmarks */}
                <div className="absolute left-1/3 top-1/4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                  <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap bg-black/50 px-1 rounded">Masjid</span>
                </div>
                
                <div className="absolute right-1/3 bottom-1/4">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping animation-delay-1000"></div>
                  <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap bg-black/50 px-1 rounded">Market</span>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Directions Result */}
          {directions && (
            <div id="directions-result" className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/50 animate-slideUp">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Your Directions
              </h2>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-300 bg-white/5 p-4 rounded-xl">
                  {directions}
                </pre>
              </div>
            </div>
          )}

          {/* Nearby Places */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Nearby Places
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {nearbyPlaces.map((place, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">{place.icon}</div>
                  <p className="text-white text-sm font-semibold">{place.name}</p>
                  <p className="text-gray-400 text-xs">{place.distance}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Parking Information */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Parking Information
            </h2>
            <div className="space-y-4">
              {parkingInfo.map((parking, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold">{parking.name}</h3>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      {parking.spots}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rate: {parking.rate}</span>
                    <span className="text-gray-400">Hours: {parking.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="relative z-10 mt-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold mb-2">Important Notes:</h3>
            <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
              <li>Free parking available for visitors at the Islamic Center Parking Lot</li>
              <li>Wheelchair accessible entrance on the north side of the building</li>
              <li>Prayer facilities available for visitors</li>
              <li>Please check in at the reception desk upon arrival</li>
              <li>For large groups, please notify us in advance</li>
            </ul>
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
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
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
        
        .animation-delay-1000 {
          animation-delay: 1s;
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
      `}</style>
    </div>
  )
}