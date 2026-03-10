'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(0)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Clear login error when user types
    if (loginError) {
      setLoginError('')
    }
  }

  // Handle 2FA input
  const handleTwoFactorChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newCode = [...twoFactorCode]
    newCode[index] = value
    setTwoFactorCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`2fa-${index + 1}`)
      nextInput?.focus()
    }
  }

  // Handle 2FA key press
  const handleTwoFactorKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !twoFactorCode[index] && index > 0) {
      const prevInput = document.getElementById(`2fa-${index - 1}`)
      prevInput?.focus()
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
    setLoginError('')

    // Simulate API call
    setTimeout(() => {
      // Demo credentials check
      if (formData.email === 'sajid.syed@gmail.com' && formData.password === 'Admin123') {
        setIsLoading(false)
        setShowTwoFactor(true)
        setCountdown(300) // 5 minutes countdown
        startCountdown()
      } else if (formData.email === 'demo@naatacademy.com' && formData.password === 'Demo1234') {
        setIsLoading(false)
        router.push('/dashboard')
      } else {
        setIsLoading(false)
        setLoginError('Invalid email or password. Please try again.')
      }
    }, 1500)
  }

  // Start countdown for 2FA
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setShowTwoFactor(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Handle 2FA verification
  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = twoFactorCode.join('')
    
    if (code === '123456') { // Demo 2FA code
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        router.push('/dashboard')
      }, 1000)
    } else {
      setLoginError('Invalid verification code')
    }
  }

  // Resend 2FA code
  const resendCode = () => {
    setCountdown(300)
    setTwoFactorCode(['', '', '', '', '', ''])
    setLoginError('')
    // Focus first input
    document.getElementById('2fa-0')?.focus()
  }

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard')
    }, 1000)
  }

  // Format countdown time
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Eye icon component
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

  // Login form
  const LoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Login Error */}
      {loginError && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 animate-shake">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-300 text-sm">{loginError}</p>
          </div>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m4 4l-4 4" />
            </svg>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${
              errors.email ? 'border-red-500' : 'border-white/20'
            } focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border ${
              errors.password ? 'border-red-500' : 'border-white/20'
            } focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
          >
            <EyeIcon show={showPassword} />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1 animate-fadeIn">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 rounded bg-white/10 border-white/20 text-pink-500 focus:ring-pink-500 focus:ring-2 transition-all"
          />
          <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">
            Remember me
          </span>
        </label>
        <Link 
          href="/forgot-password" 
          className="text-sm text-pink-500 hover:text-pink-400 transition-colors relative group"
        >
          Forgot Password?
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="button-glow w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Signing In...
          </div>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Social Login */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-105 hover:border-pink-500/50 group"
        >
          <svg className="w-5 h-5 text-white group-hover:animate-bounce" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-105 hover:border-pink-500/50 group"
        >
          <svg className="w-5 h-5 text-white group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('apple')}
          className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 transform hover:scale-105 hover:border-pink-500/50 group"
        >
          <svg className="w-5 h-5 text-white group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.69 3.56-1.702z" />
          </svg>
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-gray-400">
        Don't have an account?{' '}
        <Link href="/signup" className="text-pink-500 hover:text-pink-400 font-semibold relative group">
          Create Account
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </p>
    </form>
  )

  // 2FA Form
  const TwoFactorForm = () => (
    <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center animate-pulse">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-white text-xl font-bold mb-2">Two-Factor Authentication</h3>
        <p className="text-gray-400 text-sm">
          Please enter the 6-digit verification code sent to your email
        </p>
        <p className="text-pink-500 text-sm mt-2 font-semibold">
          Demo code: 123456
        </p>
      </div>

      {/* 2FA Input */}
      <div className="flex justify-center gap-2 mb-4">
        {twoFactorCode.map((digit, index) => (
          <input
            key={index}
            id={`2fa-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleTwoFactorChange(index, e.target.value)}
            onKeyDown={(e) => handleTwoFactorKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
          />
        ))}
      </div>

      {/* Countdown */}
      <div className="text-center text-gray-400 text-sm">
        Code expires in <span className="text-pink-500 font-mono">{formatCountdown(countdown)}</span>
      </div>

      {/* Error message */}
      {loginError && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
          <p className="text-red-300 text-sm text-center">{loginError}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isLoading || twoFactorCode.join('').length !== 6}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify & Login'}
        </button>
        
        <button
          type="button"
          onClick={resendCode}
          disabled={countdown > 0}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all duration-300 disabled:opacity-50"
        >
          Resend Code {countdown > 0 && `(${formatCountdown(countdown)})`}
        </button>

        <button
          type="button"
          onClick={() => setShowTwoFactor(false)}
          className="w-full py-2 text-gray-400 hover:text-white text-sm transition-colors"
        >
          Back to Login
        </button>
      </div>
    </form>
  )

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-4 animate-bounce">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
              {showTwoFactor ? 'Verify Account' : 'Welcome Back'}
            </span>
          </h2>
          <p className="text-gray-300">
            {showTwoFactor 
              ? 'Enter the verification code sent to your email'
              : 'Sign in to continue your spiritual journey'
            }
          </p>
        </div>

        {/* Login/2FA Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500">
          {/* Admin Info */}
          {!showTwoFactor && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
              <p className="text-purple-300 text-sm font-semibold mb-2">👤 Admin Login:</p>
              <p className="text-gray-300 text-xs">Email: sajid.syed@gmail.com</p>
              <p className="text-gray-300 text-xs">Password: Admin123</p>
              <div className="mt-2 h-px bg-purple-500/30"></div>
              <p className="text-purple-300 text-sm font-semibold mt-2 mb-1">👥 Demo User:</p>
              <p className="text-gray-300 text-xs">Email: demo@naatacademy.com</p>
              <p className="text-gray-300 text-xs">Password: Demo1234</p>
            </div>
          )}

          {showTwoFactor ? <TwoFactorForm /> : <LoginForm />}
        </div>

        {/* Trust Badges */}
        {!showTwoFactor && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl mb-1 animate-pulse">🔒</div>
              <p className="text-xs text-gray-400">Secure Login</p>
            </div>
            <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl mb-1 animate-pulse animation-delay-200">🛡️</div>
              <p className="text-xs text-gray-400">2FA Protected</p>
            </div>
            <div className="text-center p-3 bg-white/5 backdrop-blur-lg rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl mb-1 animate-pulse animation-delay-400">⚡</div>
              <p className="text-xs text-gray-400">Fast Access</p>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
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