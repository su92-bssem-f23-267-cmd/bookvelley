"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id || item.Bookname === book.Bookname)
    
    if (existingItem) {
      setCart(cart.map(item =>
        (item.id === book.id || item.Bookname === book.Bookname)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...book, quantity: 1 }])
    }
  }

  const removeFromCart = (bookId) => {
    setCart(cart.filter(item => (item.id !== bookId && item.Bookname !== bookId)))
  }

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
    } else {
      setCart(cart.map(item =>
        (item.id === bookId || item.Bookname === bookId)
          ? { ...item, quantity }
          : item
      ))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const priceStr = item.Price || item.price || '0'
      const price = parseFloat(priceStr.replace('RS:', '').replace('Rs.', '').replace('RS', '').trim()) || 0
      return total + (price * (item.quantity || 1))
    }, 0)
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

