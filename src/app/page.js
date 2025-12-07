"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Section1 from './componenets/Sectin1'
import Novelsection from './componenets/Novelsection'
import Storysection from './componenets/Storysection'
import Medicalpage from './MedicalBooks/page'
import LoginPage from './LoginPage/page'
import Signup from './signup/page'
import Aboutus from './Aboutus/page'

function Page({ image, CategoryName, Details, pagelink }) {
  const router = useRouter()
  const { getCartCount } = useCart()
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    const loggedIn = localStorage.getItem('isLoggedIn')
    
    if (loggedIn === 'true' && userData) {
      setUser(JSON.parse(userData))
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    // Update cart count
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }
    updateCartCount()
    // Listen for cart changes
    const interval = setInterval(updateCartCount, 500)
    return () => clearInterval(interval)
  }, [getCartCount])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    setUser(null)
    setIsLoggedIn(false)
    router.push('/')
    router.refresh()
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col'>
      
      {/* 🔹 Fixed Navbar */}
      <div className='bg-gradient-to-r fixed top-0 left-0 w-full z-50 from-violet-700 via-purple-700 to-fuchsia-700 shadow-xl backdrop-blur-sm bg-opacity-95'>
        <nav className='flex justify-between items-center px-6 md:px-12 py-4 text-white relative'>
          
          {/* Logo (Left) */}
          <div className='flex items-center space-x-3'>
            <img
              src='/weblogo.png'
              className='h-12 w-16 md:h-16 md:w-20 object-contain'
              alt='Logo'
            />
            
          </div>

          {/* 🔸 Center Menu with Dropdown */}
          <div className='hidden md:flex gap-8 text-lg font-semibold items-center relative'>
            <Link href='/' className='hover:text-amber-300 transition-all duration-200'>Home</Link>

            {/* 🔹 Dropdown Menu */}
            <div className='group relative cursor-pointer'>
              <span className='hover:text-amber-300 transition-all duration-200'>
                Products ▼
              </span>

              {/* Dropdown Items */}
              <div className='absolute hidden group-hover:flex flex-col bg-white text-gray-800 rounded-xl shadow-2xl mt-2 min-w-[220px] py-2 z-50 border border-purple-100'>
                <Link href='/NovelBooks' className='px-4 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium'>
                  Novel Books
                </Link>
                <Link href='/IslamicBooks' className='px-4 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium'>
                  Islamic Books
                </Link>
                <Link href='/StoryBooks' className='px-4 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium'>
                  Story Books
                </Link>
                <Link href='/MedicalBooks' className='px-4 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium'>
                  Medical Books
                </Link>
                <Link href='/ComputerBooks' className='px-4 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium'>
                  Computer Books
                </Link>
                <Link href='/EducationalBooks' className='px-4 py-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-200 font-medium'>
                  Educational Books
                </Link>
              </div>
            </div>
            

            <Link href='/Features' className='hover:text-amber-300 transition-all duration-200'>Features</Link>
            <Link href='/Aboutus' className='hover:text-amber-300 transition-all duration-200'>About</Link>
          </div>

          {/* 🔸 Cart & Login Section (Right) */}
          <div className='flex items-center gap-4'>
            {/* Cart Icon with Counter */}
            <Link
              href='/cart'
              className='relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-purple-900 px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform'
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn && user ? (
              <div className='flex items-center gap-3'>
                <div className='text-right'>
                  <p className='text-sm font-semibold text-yellow-300'>Welcome,</p>
                  <p className='text-base font-bold'>{user.name}</p>
                  {user.role === 'admin' && (
                    <Link 
                      href='/admin'
                      className='text-xs text-yellow-300 hover:underline'
                    >
                      Admin Panel
                    </Link>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className='bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform'
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href='/LoginPage'
                  className='bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-purple-900 px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform'
                >
                  Login
                </Link>
                <Link
                  href='/signup'
                  className='bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform'
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* 🔹 Hero Section */}
      <div className='pt-28 md:pt-26 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-auto md:h-96 w-full flex flex-col md:flex-row justify-center items-center rounded-b-[40px] md:rounded-b-[50px] text-white shadow-2xl px-4 md:px-10 py-10 md:py-0 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse'></div>
        <img src='/Books-removebg-preview.png' className='h-52 md:h-72 mb-4 md:mb-0 relative z-10 transform hover:scale-110 transition-transform duration-300' alt='Books' />
        <p className='text-3xl md:text-5xl font-bold max-w-md text-center leading-snug drop-shadow-2xl relative z-10 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent'>
          Turning Pages, Opening Minds
        </p>
        <img src='/Girlphoto-removebg-preview.png' className='h-56 md:h-80 mt-6 md:mt-0 relative z-10 transform hover:scale-110 transition-transform duration-300' alt='Girl reading' />
      </div>

      {/* 🔹 Heading */}
      <div className='text-center py-8 md:py-10 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-y-2 border-amber-200'>
        <p className='text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent'>
          Discover Your Favourite Books Now 📚
        </p>
      </div>

      {/* 🔹 Book Sections */}
      <div className='bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-10 flex-grow'>
        <div className='flex justify-center md:justify-around items-center flex-wrap gap-6 md:gap-8'>
          <Section1 image='/novel3.jpg' CategoryName='Novel Books' Details='Imagination, Emotion, Adventure.' pagelink='/NovelBooks' />
          <Section1 image='/islamic.jpg' CategoryName='Islamic Books' Details='Faith, Wisdom, and Peace.' pagelink='/IslamicBooks' /> 
          <Section1 image='/story.jpg' CategoryName='Story Books' Details='Fun, Lessons, and Wonder.' pagelink='/StoryBooks'  /> 
        </div>

        <div className='flex justify-center md:justify-around items-center flex-wrap gap-6 md:gap-8 mt-10'>
          <Section1 image='/medical.jpg' CategoryName='Medical Books' Details='Knowledge for Healing.' pagelink='/MedicalBooks' />
          <Section1 image='/computer.jpg' CategoryName='Computer Books' Details='Technology, Coding, and Logic.' pagelink='/Computerbooks' />
          <Section1 image='/educational.webp' CategoryName='Educational Books' Details='Learn, Grow, and Achieve.' pagelink='/EducationalBooks' />
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className='bg-gradient-to-r from-violet-800 via-purple-800 to-fuchsia-800 text-white mt-10 py-8 md:py-10 rounded-t-[40px] md:rounded-t-[50px] shadow-2xl'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6 text-center md:text-left'>
          
          {/* Logo Section */}
          <div className='flex flex-col items-center md:items-start'>
            <img src='/weblogo.png' className='h-12 w-16 md:h-16 md:w-20 object-contain' alt='Logo' />
            <p className='text-lg md:text-xl font-bold mt-2'>Book Valley</p>
            <p className='text-sm text-gray-200'>Turning Pages, Opening Minds</p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col items-center'>
            <h3 className='font-semibold text-lg mb-2'>Quick Links</h3>
            <ul className='space-y-1 text-gray-200'>
              <li><Link href='/'>Home</Link></li>
              <li><a href='#'>Products</a></li>
              <li><Link href='/Features'>Features</Link></li>
              <li><a href='#'>About</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='flex flex-col items-center md:items-end'>
            <h3 className='font-semibold text-lg mb-2'>Follow Us</h3>
            <div className='flex gap-4 text-2xl'>
              <a href='#' className='hover:text-amber-300 hover:scale-125 transition-all duration-300 transform'><i className='fab fa-facebook'></i></a>
              <a href='#' className='hover:text-amber-300 hover:scale-125 transition-all duration-300 transform'><i className='fab fa-instagram'></i></a>
              <a href='#' className='hover:text-amber-300 hover:scale-125 transition-all duration-300 transform'><i className='fab fa-twitter'></i></a>
            </div>
          </div>
        </div>

        <div className='text-center text-gray-300 text-sm mt-6 border-t border-gray-400 pt-4'>
          © {new Date().getFullYear()} Book Valley. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Page
