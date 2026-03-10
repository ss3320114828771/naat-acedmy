'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]+/)) strength++
    if (password.match(/[A-Z]+/)) strength++
    if (password.match(/[0-9]+/)) strength++
    if (password.match(/[$@#&!]+/)) strength++
    setPasswordStrength(strength)
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 2000)
  }

  // Eye icon components
  const EyeIcon = ({ show }: { show: boolean }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-5 h-5"
    >
      {show ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      )}
    </svg>
  )

  // Password strength indicator
  const PasswordStrengthIndicator = () => {
    const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
    const strengthColor = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-blue-500',
      'bg-green-500'
    ]

    return (
      <div className="mt-2">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                index < passwordStrength ? strengthColor[passwordStrength - 1] : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        {passwordStrength > 0 && (
          <p className={`text-xs mt-1 ${strengthColor[passwordStrength - 1].replace('bg-', 'text-')}`}>
            {strengthText[passwordStrength - 1]} Password
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              Create Account
            </span>
          </h2>
          <p className="text-gray-300">
            Join Naat Academy and start your spiritual journey
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${
                    errors.fullName ? 'border-red-500' : 'border-white/20'
                  } focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${
                    errors.email ? 'border-red-500' : 'border-white/20'
                  } focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
              >
                <option value="">Select your country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="PK">Pakistan</option>
                <option value="IN">India</option>
                <option value="BD">Bangladesh</option>
                <option value="AE">UAE</option>
                <option value="SA">Saudi Arabia</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${
                    errors.password ? 'border-red-500' : 'border-white/20'
                  } focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all pr-12`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  <EyeIcon show={showPassword} />
                </button>
              </div>
              {errors.password ? (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              ) : (
                <PasswordStrengthIndicator />
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-white/20'
                  } focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all pr-12`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                >
                  <EyeIcon show={showConfirmPassword} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500 focus:ring-pink-500 focus:ring-2"
                />
              </div>
              <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-300">
                I agree to the{' '}
                <Link href="/terms" className="text-pink-500 hover:text-pink-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-pink-500 hover:text-pink-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs -mt-2">{errors.agreeToTerms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="button-glow w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-pink-500 hover:text-pink-400 font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* Features List */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl">
            <div className="text-2xl mb-1">🎵</div>
            <p className="text-xs text-gray-300">Access to Naats</p>
          </div>
          <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl">
            <div className="text-2xl mb-1">📚</div>
            <p className="text-xs text-gray-300">Islamic Resources</p>
          </div>
          <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl">
            <div className="text-2xl mb-1">🎁</div>
            <p className="text-xs text-gray-300">Member Discounts</p>
          </div>
          <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl">
            <div className="text-2xl mb-1">💬</div>
            <p className="text-xs text-gray-300">Community Access</p>
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
      `}</style>
    </div>
  )
}