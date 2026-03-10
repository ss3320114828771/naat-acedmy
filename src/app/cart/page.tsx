'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Cart item type
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
  inStock: boolean
  maxQuantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Holy Quran with Translation',
      price: 49.99,
      quantity: 1,
      image: '/n1.jpeg',
      category: 'Books',
      inStock: true,
      maxQuantity: 10
    },
    {
      id: 2,
      name: 'Islamic Prayer Mat',
      price: 29.99,
      quantity: 2,
      image: '/n2.jpeg',
      category: 'Prayer',
      inStock: true,
      maxQuantity: 5
    },
    {
      id: 3,
      name: 'Digital Quran Pen',
      price: 89.99,
      quantity: 1,
      image: '/n3.jpeg',
      category: 'Electronics',
      inStock: true,
      maxQuantity: 3
    }
  ])

  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'next-day'>('standard')
  const [giftWrap, setGiftWrap] = useState(false)
  const [notes, setNotes] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = shippingMethod === 'standard' ? 5.99 : shippingMethod === 'express' ? 12.99 : 19.99
  const discount = promoApplied ? subtotal * promoDiscount : 0
  const tax = (subtotal - discount) * 0.08
  const giftWrapFee = giftWrap ? 4.99 : 0
  const total = subtotal - discount + shipping + tax + giftWrapFee

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item
      )
    )
  }

  // Remove item
  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      setCartItems([])
    }
  }

  // Apply promo code
  const applyPromo = () => {
    const validPromos: Record<string, number> = {
      'NAAT10': 0.10,
      'NAAT20': 0.20,
      'WELCOME15': 0.15,
      'SAVE25': 0.25,
      'FREESHIP': 0.00 // Special code for free shipping
    }

    if (promoCode.toUpperCase() in validPromos) {
      setPromoApplied(true)
      setPromoDiscount(validPromos[promoCode.toUpperCase()])
      setPromoError('')
      
      if (promoCode.toUpperCase() === 'FREESHIP') {
        setShippingMethod('standard')
        // Handle free shipping logic
      }
    } else {
      setPromoError('Invalid promo code')
      setPromoApplied(false)
      setPromoDiscount(0)
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      alert('Proceeding to checkout...')
    }, 1500)
  }

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="text-8xl mb-6 animate-bounce">🛒</div>
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-300 text-lg mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="button-glow px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                Browse Products
              </Link>
              <Link
                href="/naats"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-lg transition-all duration-300"
              >
                Explore Naats
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
            Shopping Cart
          </span>
        </h1>
        <p className="text-gray-300 text-lg">
          You have {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Cart Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-semibold">Cart Items ({cartItems.length})</h2>
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:border-pink-500/50 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                      <p className="text-pink-400 text-sm mb-2">{item.category}</p>
                    </div>
                    <p className="text-white font-bold text-xl">{formatCurrency(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center"
                        disabled={item.quantity >= item.maxQuantity}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      
                      <span className="text-gray-400 text-xs ml-2">Max: {item.maxQuantity}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-pink-400 font-semibold">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Order Notes */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
            <label className="block text-white font-semibold mb-2">Order Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes for your order..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              rows={3}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({promoDiscount * 100}%)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              
              {giftWrap && (
                <div className="flex justify-between text-gray-300">
                  <span>Gift Wrap</span>
                  <span>{formatCurrency(giftWrapFee)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-300">
                <span>Tax (8%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              
              <div className="border-t border-white/20 my-3 pt-3">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-pink-400">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Shipping Method</label>
              <select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value as typeof shippingMethod)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 outline-none"
              >
                <option value="standard" className="bg-gray-900">Standard Shipping - $5.99 (5-7 days)</option>
                <option value="express" className="bg-gray-900">Express Shipping - $12.99 (2-3 days)</option>
                <option value="next-day" className="bg-gray-900">Next Day Delivery - $19.99 (1 day)</option>
              </select>
            </div>

            {/* Gift Wrap Option */}
            <div className="mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500 focus:ring-pink-500"
                />
                <span className="text-gray-300">Add gift wrap (+$4.99)</span>
              </label>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 outline-none"
                />
                <button
                  onClick={applyPromo}
                  disabled={promoApplied}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {promoError && (
                <p className="text-red-400 text-xs mt-1">{promoError}</p>
              )}
              {promoApplied && (
                <p className="text-green-400 text-xs mt-1">Promo code applied successfully!</p>
              )}
              
              {/* Available Promos */}
              <div className="mt-3 p-3 bg-white/5 rounded-xl">
                <p className="text-gray-400 text-xs mb-2">Available codes:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-400 rounded">NAAT10</span>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">NAAT20</span>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">WELCOME15</span>
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">SAVE25</span>
                  <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">FREESHIP</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="button-glow w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 mb-3"
            >
              {isCheckingOut ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </div>
              ) : (
                'Proceed to Checkout'
              )}
            </button>

            {/* Payment Methods */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">We accept:</p>
              <div className="flex justify-center gap-3">
                <span className="text-2xl">💳</span>
                <span className="text-2xl">📱</span>
                <span className="text-2xl">🅿️</span>
                <span className="text-2xl">🍎</span>
              </div>
            </div>

            {/* Secure Checkout Note */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="relative z-10 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Link
              key={i}
              href="/products"
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-pink-500/50 transition-all duration-300"
            >
              <div className="relative h-32 w-full mb-3 rounded-lg overflow-hidden">
                <Image
                  src={`/images/n${i}.jpeg`}
                  alt={`Product ${i}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Islamic Product {i}</h3>
              <p className="text-pink-400 font-bold">$29.99</p>
            </Link>
          ))}
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
      `}</style>
    </div>
  )
}