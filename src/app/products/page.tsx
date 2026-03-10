'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Product type definition
interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
}

// Sample products data
const products: Product[] = [
  {
    id: 1,
    name: 'Holy Quran with Translation',
    description: 'Beautiful Quran with English translation and transliteration',
    price: 49.99,
    originalPrice: 69.99,
    image: '/n1.jpeg',
    category: 'Books',
    rating: 5,
    reviews: 128,
    inStock: true,
    isNew: true,
    discount: 28
  },
  {
    id: 2,
    name: 'Islamic Prayer Mat',
    description: 'Premium quality prayer mat with beautiful design',
    price: 29.99,
    originalPrice: 39.99,
    image: '/n2.jpeg',
    category: 'Prayer',
    rating: 4,
    reviews: 89,
    inStock: true,
    discount: 25
  },
  {
    id: 3,
    name: 'Digital Quran Pen',
    description: 'Interactive Quran reading pen with multiple languages',
    price: 89.99,
    image: '/n3.jpeg',
    category: 'Electronics',
    rating: 5,
    reviews: 56,
    inStock: true,
    isFeatured: true
  },
  {
    id: 4,
    name: 'Islamic Books Set',
    description: 'Collection of 10 Islamic books for knowledge',
    price: 149.99,
    originalPrice: 199.99,
    image: '/n4.jpeg',
    category: 'Books',
    rating: 4,
    reviews: 34,
    inStock: true,
    discount: 25
  },
  {
    id: 5,
    name: 'Miswak Toothbrush',
    description: 'Natural miswak toothbrush for oral hygiene',
    price: 9.99,
    originalPrice: 14.99,
    image: '/n5.jpeg',
    category: 'Personal Care',
    rating: 4,
    reviews: 67,
    inStock: true,
    discount: 33
  },
  {
    id: 6,
    name: 'Islamic Wall Art',
    description: 'Beautiful Arabic calligraphy wall decoration',
    price: 39.99,
    image: '/n6.jpeg',
    category: 'Home Decor',
    rating: 5,
    reviews: 42,
    inStock: false,
    isFeatured: true
  },
  {
    id: 7,
    name: 'Tasbeeh Digital Counter',
    description: 'Electronic tasbeeh counter for dhikr',
    price: 19.99,
    originalPrice: 24.99,
    image: '/n1.jpeg',
    category: 'Prayer',
    rating: 4,
    reviews: 23,
    inStock: true,
    discount: 20
  },
  {
    id: 8,
    name: 'Islamic Clothing Set',
    description: 'Traditional Islamic clothing for men',
    price: 79.99,
    image: '/n2.jpeg',
    category: 'Clothing',
    rating: 4,
    reviews: 15,
    inStock: true
  },
  {
    id: 9,
    name: 'Naat Collection CD',
    description: 'Collection of beautiful naats by various artists',
    price: 24.99,
    originalPrice: 29.99,
    image: '/n3.jpeg',
    category: 'Media',
    rating: 5,
    reviews: 91,
    inStock: true,
    discount: 17,
    isFeatured: true
  }
]

// Categories for filtering
const categories = [
  'All',
  'Books',
  'Prayer',
  'Electronics',
  'Personal Care',
  'Home Decor',
  'Clothing',
  'Media'
]

// Sort options
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' }
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [wishlist, setWishlist] = useState<number[]>([])
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }
      
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }
      
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      }
    })

  // Toggle wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  // Handle add to cart
  const handleAddToCart = (productId: number) => {
    setAddedToCart(productId)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-400'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">({rating})</span>
    </div>
  )

  // Product card component
  const ProductCard = ({ product }: { product: Product }) => (
    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-pink-500 transition-colors duration-300"
      >
        <svg
          className={`w-5 h-5 ${
            wishlist.includes(product.id) ? 'text-pink-500 fill-current' : 'text-white'
          }`}
          fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
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

      {/* Discount badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
          {product.discount}% OFF
        </div>
      )}

      {/* New badge */}
      {product.isNew && (
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
          NEW
        </div>
      )}

      {/* Out of stock overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center">
          <span className="text-white font-bold text-lg transform -rotate-45">Out of Stock</span>
        </div>
      )}

      {/* Product image */}
      <div className="relative h-48 sm:h-56 md:h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product details */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-pink-400 font-semibold">{product.category}</span>
          <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">{product.reviews} reviews</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-white font-bold text-xl">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => handleAddToCart(product.id)}
          disabled={!product.inStock}
          className="button-glow w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addedToCart === product.id ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>
    </div>
  )

  // List view product card
  const ProductListItem = ({ product }: { product: Product }) => (
    <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Product image */}
        <div className="relative w-full md:w-48 h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.discount && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                {product.discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                NEW
              </span>
            )}
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs text-pink-400 font-semibold">{product.category}</span>
              <h3 className="text-white font-bold text-xl mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
            </div>
            
            {/* Wishlist button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 rounded-full hover:bg-pink-500/20 transition-colors"
            >
              <svg
                className={`w-6 h-6 ${
                  wishlist.includes(product.id) ? 'text-pink-500 fill-current' : 'text-white'
                }`}
                fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
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

          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-400">{product.reviews} reviews</span>
          </div>

          {/* Price and add to cart */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-white font-bold text-2xl">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 text-sm line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <button
              onClick={() => handleAddToCart(product.id)}
              disabled={!product.inStock}
              className="button-glow px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50"
            >
              {addedToCart === product.id ? 'Added!' : 'Add to Cart'}
            </button>
          </div>

          {/* Stock status */}
          {!product.inStock && (
            <p className="text-red-400 text-sm mt-2">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
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
            Islamic Products
          </span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Discover our collection of high-quality Islamic products for your spiritual journey
        </p>
      </div>

      {/* Search and filters bar */}
      <div className="relative z-10 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="w-full lg:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
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

          {/* Price range */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Price Range
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-sm text-gray-300">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* In stock only */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <label className="flex items-center gap-3 text-white cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500 focus:ring-pink-500"
              />
              <span>Show only in-stock items</span>
            </label>
          </div>

          {/* Clear filters */}
          <button
            onClick={() => {
              setSelectedCategory('All')
              setPriceRange([0, 200])
              setSearchQuery('')
            }}
            className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-all"
          >
            Clear All Filters
          </button>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          {/* Results count */}
          <p className="text-gray-400 mb-4">
            Showing {filteredProducts.length} products
          </p>

          {/* Products display */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-3xl">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-white text-xl font-bold mb-2">No products found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }>
              {filteredProducts.map(product => (
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
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