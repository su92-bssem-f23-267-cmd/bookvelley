"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

function FeaturesPage() {
  const { getCartCount } = useCart()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(getCartCount())
  }, [getCartCount])

  const features = [
    {
      icon: '📚',
      title: 'Wide Book Collection',
      description: 'Explore thousands of books across multiple categories including Novels, Islamic Books, Stories, Medical, Computer, and Educational books.'
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Find your favorite books quickly with our advanced search functionality. Search by book name or author name across all categories.'
    },
    {
      icon: '🛒',
      title: 'Easy Shopping Cart',
      description: 'Add multiple books to your cart, manage quantities, and checkout easily. Your cart is saved automatically.'
    },
    {
      icon: '👤',
      title: 'User Accounts',
      description: 'Create your account to save your preferences, track orders, and enjoy personalized book recommendations.'
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Access Book Valley from any device - desktop, tablet, or mobile. Our website is fully responsive and optimized for all screens.'
    },
    {
      icon: '⚡',
      title: 'Fast & Secure',
      description: 'Enjoy fast loading times and secure transactions. Your data is protected with industry-standard security measures.'
    },
    {
      icon: '🎯',
      title: 'Category Filtering',
      description: 'Browse books by category easily. Find exactly what you\'re looking for with our organized category system.'
    },
    {
      icon: '💳',
      title: 'Easy Checkout',
      description: 'Simple and secure checkout process. Multiple payment options available for your convenience.'
    },
    {
      icon: '📖',
      title: 'Book Details',
      description: 'View detailed information about each book including author, price, and description before making a purchase.'
    },
    {
      icon: '⭐',
      title: 'Best Prices',
      description: 'Get the best prices on all books. Regular discounts and special offers available for our valued customers.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery service. Get your books delivered to your doorstep in no time.'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: 'Not satisfied? Return your books easily with our hassle-free return policy within 7 days of purchase.'
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Navbar */}
      <div className='bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 shadow-xl fixed top-0 left-0 w-full z-50'>
        <nav className='flex justify-between items-center px-6 md:px-12 py-4 text-white'>
          <Link href='/' className='flex items-center space-x-3'>
            <img
              src='/weblogo.png'
              className='h-12 w-16 md:h-16 md:w-20 object-contain'
              alt='Logo'
            />
            <h1 className='text-xl font-bold'>Book Valley</h1>
          </Link>
          <div className='flex items-center gap-4'>
            <Link
              href='/cart'
              className='relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-purple-900 px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform'
            >
              🛒 Cart
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg'>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href='/'
              className='bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-purple-900 px-4 py-2 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 transform shadow-lg'
            >
              Home
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white pt-32 pb-16 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse'></div>
        <div className='container mx-auto text-center relative z-10'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent'>
            Amazing Features 🚀
          </h1>
          <p className='text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto'>
            Discover why Book Valley is the best place to buy books online
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-purple-200 transform'
            >
              <div className='text-5xl mb-4 text-center'>{feature.icon}</div>
              <h3 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 text-center'>
                {feature.title}
              </h3>
              <p className='text-gray-600 text-center leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-16 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse'></div>
        <div className='container mx-auto text-center relative z-10'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Ready to Start Reading? 📖
          </h2>
          <p className='text-xl mb-8 text-gray-100'>
            Join thousands of happy readers and explore our amazing book collection
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/signup'
              className='bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-purple-900 px-8 py-3 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-110 transition-all duration-300 shadow-lg transform'
            >
              Create Free Account
            </Link>
            <Link
              href='/'
              className='bg-white text-purple-700 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 transform'
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-gradient-to-r from-violet-800 via-purple-800 to-fuchsia-800 text-white mt-10 rounded-t-[40px] shadow-2xl'>
        <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
          <div>
            <img src='/weblogo.png' alt='Book Valley Logo' className='h-16 mx-auto md:mx-0 mb-3' />
            <p className='text-sm text-gray-200 leading-relaxed'>
              Your ultimate destination for novels, stories, and books that touch the heart and mind.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link href='/' className='hover:underline'>Home</Link></li>
              <li><Link href='/Features' className='hover:underline'>Features</Link></li>
              <li><a href='#' className='hover:underline'>Products</a></li>
              <li><Link href='/Aboutus' className='hover:underline'>About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3'>Contact Us</h3>
            <p className='text-sm text-gray-200'>Email: mlkrizwan213@gmail.com</p>
            <p className='text-sm text-gray-200'>Phone: +92 309 5693653</p>
          </div>
        </div>
        <div className='text-center py-4 bg-violet-900 text-gray-300 text-sm rounded-b-[40px]'>
          © {new Date().getFullYear()} Book Valley — All Rights Reserved 💫
        </div>
      </footer>
    </div>
  )
}

export default FeaturesPage

