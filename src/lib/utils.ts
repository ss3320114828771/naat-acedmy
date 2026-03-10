// Formatters
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return phone
}

// Validators
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return passwordRegex.test(password)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, char => char.toUpperCase())
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `ORD-${timestamp}-${random}`.toUpperCase()
}

// Cart utilities
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return calculateCartTotal(items)
}

export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return subtotal * taxRate
}

export const calculateShipping = (subtotal: number, freeShippingThreshold: number = 50): number => {
  if (subtotal >= freeShippingThreshold) return 0
  return 5.99
}

export const calculateGrandTotal = (
  subtotal: number, 
  tax: number, 
  shipping: number
): number => {
  return subtotal + tax + shipping
}

// Local storage utilities
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return defaultValue
  }
}

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

// Session storage utilities
export const setSessionStorage = <T>(key: string, value: T): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error saving to sessionStorage:', error)
  }
}

export const getSessionStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error reading from sessionStorage:', error)
    return defaultValue
  }
}

// Cookie utilities
export const setCookie = (name: string, value: string, days: number = 7): void => {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

export const getCookie = (name: string): string | null => {
  const cookieName = name + '='
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length)
    }
  }
  return null
}

export const deleteCookie = (name: string): void => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

// Array utilities
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, currentValue) => {
    const groupKey = String(currentValue[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(currentValue)
    return result
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, ascending: boolean = true): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1
    if (a[key] > b[key]) return ascending ? 1 : -1
    return 0
  })
}

export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

// Pagination utilities
export const paginate = <T>(array: T[], page: number, pageSize: number): T[] => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return array.slice(start, end)
}

export const calculateTotalPages = (totalItems: number, pageSize: number): number => {
  return Math.ceil(totalItems / pageSize)
}

// Color utilities
export const getRandomGradient = (): string => {
  const gradients = [
    'from-pink-500 to-purple-500',
    'from-blue-500 to-green-500',
    'from-yellow-500 to-red-500',
    'from-indigo-500 to-pink-500',
    'from-green-500 to-blue-500',
    'from-purple-500 to-indigo-500',
    'from-red-500 to-yellow-500',
    'from-orange-500 to-pink-500'
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}

export const getRandomColor = (): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Date utilities
export const getTimeAgo = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit)
    if (interval >= 1) {
      return interval + ' ' + unit + (interval === 1 ? '' : 's') + ' ago'
    }
  }
  return 'just now'
}

// Number utilities
export const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Object utilities
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {} as Pick<T, K>)
}

// Type definitions
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface User {
  id: string
  email: string
  name?: string
  role: 'user' | 'admin'
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export interface Naat {
  id: string
  title: string
  artist: string
  audioUrl: string
  duration?: number
  category?: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: Date
}

// Validation messages
export const validationMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number',
  phone: 'Please enter a valid phone number',
  url: 'Please enter a valid URL',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
  match: 'Fields do not match'
}

// Constants
export const APP_CONSTANTS = {
  APP_NAME: 'Naat Academy',
  ADMIN_EMAIL: 'sajid.syed@gmail.com',
  ADMIN_NAME: 'Hafiz Sajid Syed',
  FREE_SHIPPING_THRESHOLD: 50,
  TAX_RATE: 0.08,
  CURRENCY: 'USD',
  MAX_QUANTITY: 10,
  MIN_QUANTITY: 1
}

// Health tips
export const healthTips = [
  "The Prophet (PBUH) said: 'Take advantage of five before five: your youth before your old age, your health before your sickness...'",
  "Maintain a balanced diet as recommended in the Quran: 'Eat and drink but waste not by excess.'",
  "Physical cleanliness is half of faith in Islam.",
  "Walking is excellent exercise - the Prophet (PBUH) encouraged walking to the mosque.",
  "Fasting promotes physical detoxification and spiritual growth.",
  "Early to sleep and early to rise follows the Sunnah and promotes good health.",
  "Moderation in eating is key - fill 1/3 of stomach with food, 1/3 with water, leave 1/3 empty.",
  "Honey is mentioned in the Quran as a healing for mankind.",
  "Black seed (Kalonji) has healing properties according to Prophet's teachings.",
  "Olive oil is blessed and beneficial for health as mentioned in the Quran."
]

export const getRandomHealthTip = (): string => {
  return healthTips[Math.floor(Math.random() * healthTips.length)]
}