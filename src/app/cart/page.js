"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0))
  }, [cart])

  const getItemPrice = (item) => {
    const priceStr = item.Price || item.price || '0'
    return parseFloat(priceStr.replace('RS:', '').replace('Rs.', '').replace('RS', '').trim()) || 0
  }

  const total = getCartTotal()

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Navbar */}
      <div className='bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 shadow-xl'>
        <nav className='flex justify-between items-center px-6 md:px-12 py-4 text-white'>
          <Link href='/' className='flex items-center space-x-3'>
            <img
              src='/weblogo.png'
              className='h-12 w-16 md:h-16 md:w-20 object-contain'
              alt='Logo'
            />
            <h1 className='text-xl font-bold'>Shopping Cart</h1>
          </Link>
          <Link
            href='/'
            className='bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-purple-900 px-4 py-2 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 transform shadow-lg'
          >
            Continue Shopping
          </Link>
        </nav>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {cart.length === 0 ? (
          <div className='bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-12 text-center border-2 border-purple-200'>
            <div className='text-6xl mb-4'>🛒</div>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4'>Your cart is empty</h2>
            <p className='text-gray-600 mb-6 font-medium'>Add some books to get started!</p>
            <Link
              href='/'
              className='bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 inline-block transform shadow-lg'
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2'>
              <div className='bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 border-2 border-purple-200'>
                <div className='flex justify-between items-center mb-6'>
                  <h2 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>Cart Items ({cartCount})</h2>
                  <button
                    onClick={clearCart}
                    className='text-red-500 hover:text-red-700 font-semibold hover:scale-110 transition-transform duration-200 transform'
                  >
                    Clear Cart
                  </button>
                </div>

                <div className='space-y-4'>
                  {cart.map((item, index) => {
                    const price = getItemPrice(item)
                    const itemTotal = price * item.quantity
                    return (
                      <div
                        key={index}
                        className='flex flex-col md:flex-row gap-4 p-4 border-2 border-purple-200 rounded-xl hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50'
                      >
                        <img
                          src={item.Bookpicture || item.bookpicture}
                          alt={item.Bookname || item.bookname}
                          className='w-24 h-32 object-cover rounded-lg'
                        />
                        <div className='flex-grow'>
                          <h3 className='text-xl font-bold text-gray-800 mb-2'>
                            {item.Bookname || item.bookname}
                          </h3>
                          <p className='text-gray-600 mb-2'>
                            Author: {item.Author_Name || item.author_name}
                          </p>
                          <p className='text-lg font-semibold text-green-600 mb-4'>
                            Rs. {price.toFixed(2)} each
                          </p>
                          <div className='flex items-center gap-4'>
                            <div className='flex items-center gap-2'>
                              <button
                                onClick={() => updateQuantity(item.id || item.Bookname, item.quantity - 1)}
                                className='bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full font-bold'
                              >
                                -
                              </button>
                              <span className='w-12 text-center font-semibold'>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id || item.Bookname, item.quantity + 1)}
                                className='bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full font-bold'
                              >
                                +
                              </button>
                            </div>
                            <p className='text-lg font-bold text-indigo-700'>
                              Total: Rs. {itemTotal.toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id || item.Bookname)}
                              className='ml-auto bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 transform'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl p-6 sticky top-4 border-2 border-purple-200'>
                <h2 className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'>Order Summary</h2>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal ({cartCount} items)</span>
                    <span className='font-semibold'>Rs. {total.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-semibold'>Rs. 200.00</span>
                  </div>
                  <hr className='border-gray-300' />
                  <div className='flex justify-between text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    <span>Total</span>
                    <span>Rs. {(total + 200).toFixed(2)}</span>
                  </div>
                </div>
                <button className='w-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 mb-4 transform shadow-lg'>
                  Proceed to Checkout
                </button>
                <Link
                  href='/'
                  className='block text-center text-purple-600 hover:text-purple-700 hover:underline font-semibold transition-colors duration-200'
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage

