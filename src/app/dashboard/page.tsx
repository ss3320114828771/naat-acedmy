'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showSettings, setShowSettings] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // User data
  const user = {
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    role: 'Administrator',
    memberSince: 'January 2024',
    avatar: '/images/n1.jpeg',
    totalOrders: 156,
    totalSpent: 3450.75,
    wishlistCount: 23,
    downloadsCount: 89
  }

  // Recent orders
  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-03-15',
      items: 3,
      total: 89.97,
      status: 'Delivered',
      products: ['Holy Quran', 'Prayer Mat', 'Digital Tasbeeh']
    },
    {
      id: 'ORD-2024-002',
      date: '2024-03-10',
      items: 2,
      total: 45.98,
      status: 'Shipped',
      products: ['Islamic Books Set', 'Miswak']
    },
    {
      id: 'ORD-2024-003',
      date: '2024-03-05',
      items: 1,
      total: 29.99,
      status: 'Processing',
      products: ['Naat Collection CD']
    },
    {
      id: 'ORD-2024-004',
      date: '2024-02-28',
      items: 4,
      total: 124.96,
      status: 'Delivered',
      products: ['Digital Quran Pen', 'Islamic Wall Art', 'Tasbeeh', 'Book Set']
    },
    {
      id: 'ORD-2024-005',
      date: '2024-02-20',
      items: 2,
      total: 59.98,
      status: 'Delivered',
      products: ['Prayer Mat', 'Quran Translation']
    }
  ]

  // Favorite naats
  const favoriteNaats = [
    {
      id: 1,
      title: 'Ya Rasool Allah',
      artist: 'Mahir Zain',
      duration: '4:32',
      image: '/images/n1.jpeg',
      plays: 1250000
    },
    {
      id: 2,
      title: 'Salamo Alika',
      artist: 'Mahir Zain',
      duration: '5:15',
      image: '/n2.jpeg',
      plays: 980000
    },
    {
      id: 3,
      title: 'Akkia Ya Habeeb',
      artist: 'Mahir Zain',
      duration: '3:48',
      image: '/n3.jpeg',
      plays: 750000
    },
    {
      id: 4,
      title: 'Rahmatun Lil\'Alameen',
      artist: 'Maher Zain',
      duration: '4:10',
      image: '/n4.jpeg',
      plays: 2100000
    }
  ]

  // Wishlist items
  const wishlistItems = [
    {
      id: 1,
      name: 'Digital Quran Pen',
      price: 89.99,
      image: '/n3.jpeg',
      inStock: true
    },
    {
      id: 2,
      name: 'Islamic Wall Art',
      price: 39.99,
      image: '/n6.jpeg',
      inStock: true
    },
    {
      id: 3,
      name: 'Premium Prayer Mat',
      price: 49.99,
      image: '/n2.jpeg',
      inStock: false
    }
  ]

  // Downloads
  const downloads = [
    {
      id: 1,
      name: 'Ya Rasool Allah - Mahir Zain',
      size: '4.2 MB',
      date: '2024-03-15',
      format: 'MP3'
    },
    {
      id: 2,
      name: 'Salamo Alika - Mahir Zain',
      size: '5.8 MB',
      date: '2024-03-10',
      format: 'MP3'
    },
    {
      id: 3,
      name: 'Quran Translation PDF',
      size: '2.1 MB',
      date: '2024-03-05',
      format: 'PDF'
    }
  ]

  // Activity timeline
  const activityTimeline = [
    {
      id: 1,
      action: 'Purchased Holy Quran',
      date: '2 hours ago',
      icon: '🛒'
    },
    {
      id: 2,
      action: 'Downloaded Ya Rasool Allah',
      date: '5 hours ago',
      icon: '⬇️'
    },
    {
      id: 3,
      action: 'Added to wishlist - Islamic Wall Art',
      date: '1 day ago',
      icon: '❤️'
    },
    {
      id: 4,
      action: 'Listened to Salamo Alika',
      date: '2 days ago',
      icon: '🎵'
    },
    {
      id: 5,
      action: 'Updated profile information',
      date: '3 days ago',
      icon: '👤'
    }
  ]

  // Format number
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'text-green-400 bg-green-400/20'
      case 'Shipped':
        return 'text-blue-400 bg-blue-400/20'
      case 'Processing':
        return 'text-yellow-400 bg-yellow-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
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
      <div className="relative z-10 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-300">Welcome back, {user.name}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="relative z-10 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'favorites'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'wishlist'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'downloads'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Downloads
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-500/50">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900"></div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                  <p className="text-pink-400 mb-2">{user.role}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {user.email}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Member since {user.memberSince}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-pink-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">🛒</div>
                  <div className="text-sm text-gray-400">Total Orders</div>
                </div>
                <div className="text-3xl font-bold text-white">{user.totalOrders}</div>
                <div className="text-sm text-green-400 mt-2">↑ 12% from last month</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">💰</div>
                  <div className="text-sm text-gray-400">Total Spent</div>
                </div>
                <div className="text-3xl font-bold text-white">${formatNumber(user.totalSpent)}</div>
                <div className="text-sm text-green-400 mt-2">↑ 8% from last month</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">❤️</div>
                  <div className="text-sm text-gray-400">Wishlist</div>
                </div>
                <div className="text-3xl font-bold text-white">{user.wishlistCount}</div>
                <div className="text-sm text-blue-400 mt-2">3 items in stock</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">⬇️</div>
                  <div className="text-sm text-gray-400">Downloads</div>
                </div>
                <div className="text-3xl font-bold text-white">{user.downloadsCount}</div>
                <div className="text-sm text-purple-400 mt-2">2 new this week</div>
              </div>
            </div>

            {/* Recent Orders & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Recent Orders
                </h3>
                <div className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-semibold">{order.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{order.date}</span>
                        <span className="text-white">${formatNumber(order.total)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{order.items} items</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-pink-400 hover:text-pink-300 text-sm transition-colors">
                  View All Orders →
                </button>
              </div>

              {/* Activity Timeline */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {activityTimeline.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.action}</p>
                        <p className="text-gray-500 text-xs">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorite Naats Preview */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Favorite Naats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favoriteNaats.map((naat) => (
                  <Link
                    key={naat.id}
                    href={`/naats/${naat.id}`}
                    className="group bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="relative h-20 w-20 mx-auto mb-2 rounded-lg overflow-hidden">
                      <Image
                        src={naat.image}
                        alt={naat.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <p className="text-white text-sm font-semibold text-center truncate">{naat.title}</p>
                    <p className="text-gray-400 text-xs text-center">{naat.artist}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Items</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Total</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{order.date}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{order.items}</td>
                      <td className="py-3 px-4 text-white text-sm">${formatNumber(order.total)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-pink-400 hover:text-pink-300 text-sm transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Favorite Naats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {favoriteNaats.map((naat) => (
                <div key={naat.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="relative h-40 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={naat.image}
                      alt={naat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold">{naat.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{naat.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{naat.duration}</span>
                    <span className="text-gray-500 text-xs">{formatNumber(naat.plays)} plays</span>
                  </div>
                  <button className="w-full mt-3 px-3 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-lg text-sm transition-colors">
                    Play Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold">{item.name}</h3>
                  <p className="text-pink-400 font-bold mb-2">${formatNumber(item.price)}</p>
                  <div className="flex gap-2">
                    <button className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.inStock 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-purple-500 hover:to-pink-500'
                        : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!item.inStock}>
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Downloads Tab */}
        {activeTab === 'downloads' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">My Downloads</h2>
            <div className="space-y-3">
              {downloads.map((download) => (
                <div key={download.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <h3 className="text-white font-semibold">{download.name}</h3>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{download.size}</span>
                        <span>•</span>
                        <span>{download.format}</span>
                        <span>•</span>
                        <span>{download.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-sm hover:from-blue-500 hover:to-green-500 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Again
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 max-w-2xl w-full border border-white/20 animate-slideUp">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            
            <div className="space-y-6">
              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500" defaultChecked />
                    <span className="text-gray-300">Email notifications for new naats</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500" defaultChecked />
                    <span className="text-gray-300">Order updates via email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500" />
                    <span className="text-gray-300">SMS notifications</span>
                  </label>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Privacy</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500" defaultChecked />
                    <span className="text-gray-300">Make profile public</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500" />
                    <span className="text-gray-300">Show activity to followers</span>
                  </label>
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Language</h3>
                <select className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 outline-none">
                  <option value="en" className="bg-gray-900">English</option>
                  <option value="ar" className="bg-gray-900">Arabic</option>
                  <option value="ur" className="bg-gray-900">Urdu</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                  Save Changes
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setEditMode(false)}></div>
          <div className="relative bg-gradient-to-br from-gray-900 to-purple-900 rounded-3xl p-8 max-w-md w-full border border-white/20 animate-slideUp">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 outline-none"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          animation: slideUp 0.3s ease-out;
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
      `}</style>
    </div>
  )
}