"use client"
import React from 'react'
import { useCart } from '@/context/CartContext'

function Novelsection({ Bookname, Bookpicture, Author_Name, Price, id }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: id || Bookname,
      Bookname,
      Bookpicture,
      Author_Name,
      Price
    })
    alert(`${Bookname} added to cart!`)
  }

  return (
    <div className='w-60 sm:w-64 md:w-72 bg-gradient-to-br from-slate-50 via-amber-50 to-yellow-50 mt-6 rounded-[30px] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center border-2 border-amber-200 transform hover:scale-105'>
      
      <p className='text-center w-full font-bold text-xl md:text-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white rounded-t-[30px] py-2 shadow-lg tracking-wide'>
        {Bookname}
      </p>

      <div className='flex flex-col items-center mt-4 px-2'>
        <img
          src={Bookpicture}
          alt={Author_Name}
          className='w-[110px] h-[110px] md:w-[130px] md:h-[130px] rounded-2xl shadow-xl border-4 border-amber-300 object-cover hover:scale-110 transition-transform duration-300 transform'
        />
        <p className='text-center text-gray-900 font-semibold mt-3 text-base md:text-lg'>
          {Price}
        </p>
        <button
          onClick={handleAddToCart}
          className='mt-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-xl hover:scale-110 transition-all duration-300 text-sm transform'
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Novelsection
