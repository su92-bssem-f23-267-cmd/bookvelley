'use client'
import React from 'react'

function Bookdetails() {
  const book = {
    Bookname: 'Peer e Kamil',
    Author: 'Umera Ahmed',
    Published: 'March 2004',
    Image: '/Peer_E_Kamil.jpeg',
    Description: `Peer e Kamil (The Perfect Mentor) is one of the most popular Urdu novels ever written. 
    It’s a powerful spiritual and emotional story that explores faith, love, repentance, and transformation. 
    The novel follows the journey of Imama Hashim and Salar Sikandar as they discover the meaning of true guidance and redemption.`,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center py-12 px-6">
      
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent text-center mb-8 drop-shadow-lg">
        {book.Bookname}
      </h1>

      {/* Book Container */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl max-w-4xl w-full p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 transition-transform hover:scale-[1.02] duration-300 border-2 border-purple-200">
        
        {/* Book Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={book.Image}
            alt={book.Bookname}
            className="rounded-2xl w-[260px] h-[360px] object-cover shadow-xl border-4 border-purple-400 transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Book Info */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 text-gray-800">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Author: {book.Author}</h2>
          <p className="text-lg font-medium text-gray-600">Published: {book.Published}</p>
          <p className="text-gray-700 text-justify leading-relaxed">{book.Description}</p>

          {/* Button */}
          <div className="mt-4">
            <button className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-6 py-2 rounded-full font-semibold hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Book Valley — All Rights Reserved 📚
      </footer>
    </div>
  )
}

export default Bookdetails
