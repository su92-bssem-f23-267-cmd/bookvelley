"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Medicalsection from '../componenets/Medicalsection'
import { useCart } from '@/context/CartContext'

function Page({ Bookname, Bookpicture, Author_Name, Price }) {
  const { getCartCount } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [cartCount, setCartCount] = useState(0)

  React.useEffect(() => {
    setCartCount(getCartCount())
  }, [getCartCount])

  const allBooks = [
    { Bookname: 'Jaan', Bookpicture: '/Jaan.jpeg', Author_Name: 'Rizwan', Price: 'RS:2500' },
    { Bookname: 'Omar O Ayaar', Bookpicture: '/Omar_o_Ayaar.jpg', Author_Name: 'Hassan', Price: 'RS:2700' },
    { Bookname: 'Beast Ka Ishq', Bookpicture: '/Best-Ka-Ishq.jpg', Author_Name: 'Adeel', Price: 'RS:2300' },
    { Bookname: 'Diyaar E Dil', Bookpicture: '/Diyaar_E_Dil.jpg', Author_Name: 'Sana', Price: 'RS:2800' },
    { Bookname: 'Ghulam Baagh', Bookpicture: '/Ghulam_Bagh.jpg', Author_Name: 'Tariq', Price: 'RS:2600' },
    { Bookname: 'Khaali Asmaan', Bookpicture: '/Khaali_Asmaan.jpg', Author_Name: 'Kiran', Price: 'RS:2400' },
    { Bookname: 'Mera Ishq', Bookpicture: '/Mera_Ishq.jpeg', Author_Name: 'Umar', Price: 'RS:2900' },
    { Bookname: 'Ye Dil Mera', Bookpicture: '/Ye_Dil_Mera.webp', Author_Name: 'Bilal', Price: 'RS:2550' },
  ]

  const filteredBooks = allBooks.filter(book =>
    book.Bookname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.Author_Name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col'>
      {/* Navbar */}
      <div className='bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 shadow-xl fixed top-0 left-0 w-full z-50'>
        <nav className='flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-4 text-white'>
          <Link href='/' className='flex items-center'>
            <img src='/weblogo.png' className='h-14 w-16 md:h-16 md:w-20 object-contain mb-2 md:mb-0' alt='Logo' />
          </Link>
          <div className='flex flex-wrap justify-center items-center gap-4 md:gap-6'>
            <div className='flex gap-6 md:gap-10 text-lg font-semibold'>
              <Link href='/'>Home</Link>
              <a href='#'>Categories</a>
              <Link href='/Features'>Features</Link>
              <a href='#'>About</a>
            </div>
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
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <div className='bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-auto md:h-96 w-full flex flex-col md:flex-row justify-center items-center rounded-b-[40px] text-white shadow-2xl px-4 py-8 md:py-0 mt-20 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse'></div>
        <img src='/Books-removebg-preview.png' className='h-40 md:h-72 mb-4 md:mb-0 rounded-4xl relative z-10 transform hover:scale-110 transition-transform duration-300' alt='Books' />
        <div className='flex flex-col items-center w-full px-4 relative z-10'>
          <h2 className='text-2xl md:text-4xl font-bold text-center mb-4 drop-shadow-2xl bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent'>
            Find Your Next Great Read 📚
          </h2>
          <div className='flex w-full max-w-md bg-white rounded-full shadow-xl overflow-hidden border-2 border-purple-200'>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search books by name or author...'
              className='flex-grow px-4 py-2 text-gray-700 focus:outline-none text-sm md:text-base'
            />
            <button 
              type='button'
              className='px-5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-semibold hover:shadow-xl transition-all duration-300'
            >
              Search
            </button>
          </div>
        </div>
        <img src='/girl3.png' className='h-48 md:h-80 mt-4 md:mt-0 relative z-10 transform hover:scale-110 transition-transform duration-300' alt='Girl reading' />
      </div>

      {/* Heading */}
      <div className='text-center py-8 bg-amber-50'>
        <p className='text-2xl md:text-4xl font-extrabold text-gray-800'>
          Medical Books Collection 📚
        </p>
      </div>

      {/* Books Section */}
      <div className='flex flex-wrap justify-center gap-6 px-4 py-8'>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, i) => (
            <Medicalsection
              key={i}
              Bookname={book.Bookname}
              Bookpicture={book.Bookpicture}
              Author_Name={book.Author_Name}
              Price={book.Price}
            />
          ))
        ) : (
          <p className='text-gray-600 text-xl mt-10 font-semibold'>No books found 😢</p>
        )}
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
              <li><a href='#' className='hover:underline'>Products</a></li>
              <li><Link href='/Features' className='hover:underline'>Features</Link></li>
              <li><a href='#' className='hover:underline'>About</a></li>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-3'>Contact Us</h3>
            <p className='text-sm text-gray-200'>Email: mlkrizwan213@gmail.com</p>
            <p className='text-sm text-gray-200'>Phone: +92 309 5693653</p>
          </div>
        </div>
        <div className='text-center py-4 bg-indigo-900 text-gray-300 text-sm rounded-b-[40px]'>
          © {new Date().getFullYear()} Book Valley — All Rights Reserved 💫
        </div>
      </footer>
    </div>
  )
}

export default Page
