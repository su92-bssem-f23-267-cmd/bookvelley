import React from 'react'
import Link from 'next/link'

function Aboutus() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col'>
      
      {/* 🔹 Navbar */}
      <div className='bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 shadow-xl'>
        <nav className='flex justify-between items-center px-8 py-4 text-white'>
          <div className='flex items-center gap-3'>
            <img src='/weblogo.png' className='h-14 w-18 object-contain' alt='Logo' />
            <h1 className='text-2xl font-bold'>Book Valley</h1>
          </div>
          <div className='flex gap-8 text-lg font-semibold'>
            <Link href='/'>Home</Link>
            <Link href='/About'>About</Link>
            <a href='#'>Products</a>
            <Link href='/Features'>Features</Link>
          </div>
        </nav>
      </div>

      {/* 🔹 About Section */}
      <div className='flex flex-col md:flex-row justify-center items-center py-16 px-8 md:px-20 bg-gradient-to-r from-cyan-200 via-purple-100 to-pink-200 rounded-b-[50px] shadow-2xl border-t-4 border-purple-300'>
          <img
          src='/myimage.jpeg'
          alt='Muhammad Rizwan'
          className='h-64 w-64 rounded-full shadow-2xl border-4 border-purple-500 object-cover mb-8 md:mb-0 md:mr-10 transform hover:scale-105 transition-transform duration-300'
        />
        <div className='text-center md:text-left max-w-lg'>
          <h2 className='text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3'>Muhammad Rizwan</h2>
          <p className='text-lg text-gray-700 font-medium mb-4'>
            <span className='font-semibold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent'>Full Stack Web Developer</span>
          </p>
          <p className='text-gray-600 leading-relaxed mb-6'>
            I’m passionate about building modern, user-friendly, and responsive web applications using the latest
            technologies like React, Next.js, Node.js, and MongoDB. My goal is to create digital experiences that are both
            functional and visually appealing.
          </p>
          <div className='bg-gradient-to-br from-white to-purple-50 shadow-xl rounded-xl p-5 border-2 border-purple-200 hover:shadow-2xl transition-all duration-300'>
            <p className='text-gray-800 mb-2'><strong className='text-purple-600'>📞 Contact:</strong> +92 309 5693653</p>
            <p className='text-gray-800'><strong className='text-purple-600'>📧 Email:</strong> mlkrizwan213@gmail.com</p>
          </div>
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className='bg-gradient-to-r from-violet-800 via-purple-800 to-fuchsia-800 text-white mt-auto py-8 rounded-t-[50px] shadow-2xl'>
        <div className='text-center space-y-2'>
          <p className='text-xl font-bold'>Book Valley</p>
          <p className='text-sm text-gray-200'>Turning Pages, Opening Minds</p>
          <p className='text-gray-300 text-sm mt-3'>
            © {new Date().getFullYear()} Book Valley. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Aboutus
