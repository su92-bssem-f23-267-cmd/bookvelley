import React from 'react'
import Link from 'next/link'

function Section1({ image, CategoryName, Details, pagelink }) {
  return (
    <div className='h-64 w-64 sm:h-72 sm:w-72 bg-gradient-to-br from-violet-200 via-purple-200 to-pink-200 mt-6 rounded-[30px] sm:rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center transform hover:scale-105 border-2 border-purple-300'>
      
      {/* Category Title */}
      <p className='text-center w-full font-bold text-xl sm:text-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-t-[30px] sm:rounded-t-[40px] py-2 shadow-lg'>
        {CategoryName}
      </p>

      {/* Image + Details */}
      <div className='flex flex-col items-center mt-4 px-3'>
        <img
          src={image}
          alt={CategoryName}
          className='w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-2xl shadow-xl border-4 border-white object-cover hover:scale-110 transition-transform duration-300 transform'
        />
        <p className='text-center text-gray-800 font-semibold mt-3 text-sm sm:text-base'>
          {Details}
        </p>

        {/* Button */}
        <div className='flex justify-center items-center w-full mt-4'>
          <Link href={pagelink}>
            <button className='px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl text-white font-semibold hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg text-sm sm:text-base transform'>
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Section1
