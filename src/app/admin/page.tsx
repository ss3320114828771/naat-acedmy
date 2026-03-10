'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

// Define types for better TypeScript support
interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is admin
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user?.role === 'admin') {
          setUser(data.user)
        } else {
          router.push('/dashboard')
        }
        setLoading(false)
      })
      .catch(() => {
        router.push('/login')
        setLoading(false)
      })
  }, [router])

  // Sample data for admin
  const stats = [
    { label: 'Total Users', value: '1,234', icon: '👥', change: '+12%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Orders', value: '456', icon: '🛒', change: '+8%', color: 'from-green-500 to-emerald-500' },
    { label: 'Total Products', value: '89', icon: '📦', change: '+5%', color: 'from-purple-500 to-pink-500' },
    { label: 'Total Revenue', value: '$45,678', icon: '💰', change: '+15%', color: 'from-orange-500 to-red-500' }
  ]

  const recentOrders = [
    { id: '#ORD001', customer: 'Ahmed Khan', amount: '$129.99', status: 'Delivered', date: '2024-03-15' },
    { id: '#ORD002', customer: 'Fatima Ali', amount: '$79.99', status: 'Processing', date: '2024-03-14' },
    { id: '#ORD003', customer: 'Omar Hassan', amount: '$249.99', status: 'Shipped', date: '2024-03-13' },
    { id: '#ORD004', customer: 'Aisha Rahman', amount: '$39.99', status: 'Pending', date: '2024-03-12' },
    { id: '#ORD005', customer: 'Yusuf Ibrahim', amount: '$189.99', status: 'Delivered', date: '2024-03-11' }
  ]

  const products = [
    { id: 1, name: 'Holy Quran', price: '$49.99', stock: 45, sales: 123, image: '/images/n1.jpeg' },
    { id: 2, name: 'Prayer Mat', price: '$29.99', stock: 32, sales: 89, image: '/images/n2.jpeg' },
    { id: 3, name: 'Digital Quran Pen', price: '$89.99', stock: 18, sales: 56, image: '/images/n3.jpeg' },
    { id: 4, name: 'Islamic Books Set', price: '$149.99', stock: 12, sales: 34, image: '/images/n4.jpeg' },
    { id: 5, name: 'Miswak', price: '$9.99', stock: 67, sales: 145, image: '/images/n5.jpeg' }
  ]

  const users = [
    { id: 1, name: 'Hafiz Sajid Syed', email: 'sajid.syed@gmail.com', role: 'Admin', joined: '2024-01-01' },
    { id: 2, name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'User', joined: '2024-02-15' },
    { id: 3, name: 'Fatima Ali', email: 'fatima@example.com', role: 'User', joined: '2024-02-20' },
    { id: 4, name: 'Omar Hassan', email: 'omar@example.com', role: 'User', joined: '2024-03-01' },
    { id: 5, name: 'Aisha Rahman', email: 'aisha@example.com', role: 'User', joined: '2024-03-05' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading admin panel...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-gray-300">
              Welcome back, {user?.name || 'Administrator'} (Administrator)
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              User Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="relative z-10 mb-8 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('naats')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'naats'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Naats
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-white text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <span className="text-4xl">{stat.icon}</span>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-white/90 text-sm font-semibold">{stat.change}</span>
                    <span className="text-white/60 text-xs ml-2">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                  <button className="text-pink-400 hover:text-pink-300 text-sm">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 text-gray-400 text-sm">Order ID</th>
                        <th className="text-left py-3 text-gray-400 text-sm">Customer</th>
                        <th className="text-left py-3 text-gray-400 text-sm">Amount</th>
                        <th className="text-left py-3 text-gray-400 text-sm">Status</th>
                        <th className="text-left py-3 text-gray-400 text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 text-white text-sm">{order.id}</td>
                          <td className="py-3 text-gray-300 text-sm">{order.customer}</td>
                          <td className="py-3 text-white text-sm">{order.amount}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                              order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 text-gray-400 text-sm">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300">
                    Add New Product
                  </button>
                  <button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300">
                    Process Orders
                  </button>
                  <button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300">
                    Update Inventory
                  </button>
                  <button className="w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300">
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Products Management</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-emerald-500 hover:to-green-500 transition-all duration-300">
                + Add New Product
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400">Product</th>
                    <th className="text-left py-3 text-gray-400">Price</th>
                    <th className="text-left py-3 text-gray-400">Stock</th>
                    <th className="text-left py-3 text-gray-400">Sales</th>
                    <th className="text-left py-3 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <span className="text-white">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-white">{product.price}</td>
                      <td className="py-4">
                        <span className={product.stock < 20 ? 'text-orange-400' : 'text-green-400'}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="py-4 text-gray-300">{product.sales}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                            Edit
                          </button>
                          <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Users Management</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-4 py-2 bg-white/10 text-white rounded-xl border border-white/20 focus:border-pink-500 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400">Name</th>
                    <th className="text-left py-3 text-gray-400">Email</th>
                    <th className="text-left py-3 text-gray-400">Role</th>
                    <th className="text-left py-3 text-gray-400">Joined</th>
                    <th className="text-left py-3 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userItem) => (
                    <tr key={userItem.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-4 text-white">{userItem.name}</td>
                      <td className="py-4 text-gray-300">{userItem.email}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          userItem.role === 'Admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {userItem.role}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{userItem.joined}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                            Edit
                          </button>
                          {userItem.role !== 'Admin' && (
                            <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === 'orders' || activeTab === 'naats' || activeTab === 'settings') && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
            <p className="text-gray-400">This section is under development</p>
          </div>
        )}
      </div>

      {/* Admin Info Card */}
      <div className="relative z-10 mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-3xl">👑</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Administrator: Hafiz Sajid Syed</h3>
            <p className="text-gray-300 text-sm">sajid.syed@gmail.com</p>
            <p className="text-purple-400 text-sm mt-1">You have full administrative access</p>
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
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}