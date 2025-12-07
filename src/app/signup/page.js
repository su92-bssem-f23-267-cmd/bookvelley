"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()
      console.log('Response status:', response.status)
      console.log('Response data:', data)

      if (response.ok) {
        // User data ko localStorage mein save karo (auto login)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('isLoggedIn', 'true')
        
        router.push('/')
        router.refresh() // Page refresh karein taake navbar update ho
      } else {
        setError(data.error || 'Registration failed. Please try again.')
        console.error('Signup failed:', data)
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 flex justify-center items-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      
      {/* Signup Card */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-10 flex flex-col items-center transition-transform duration-300 hover:scale-[1.02] relative z-10 border-2 border-purple-200">
        
        {/* Logo */}
        <img 
          src="/weblogo.png" 
          alt="Book Valley Logo" 
          className="w-20 h-20 mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2 text-center">
          Create Your Account ✨
        </h1>
        <p className="text-gray-600 text-center mb-6 font-medium">
          Join Book Valley and start your reading journey today!
        </p>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              required
            />
          </div>

          {/* Signup Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center w-full">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Signup */}
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 transform">
            <i className="fab fa-facebook-f mr-2"></i> Facebook
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 transform">
            <i className="fab fa-google mr-2"></i> Google
          </button>
        </div>

        {/* Redirect to Login */}
        <p className="text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/LoginPage" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors duration-200">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
