"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AdminPanel() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('books') // 'users' or 'books'
  const [showAddBookModal, setShowAddBookModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [bookForm, setBookForm] = useState({
    bookname: '',
    bookpicture: '',
    author_name: '',
    price: '',
    category: 'Novel'
  })

  const categories = ['Novel', 'Islamic', 'Story', 'Medical', 'Computer', 'Educational']

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const loggedIn = localStorage.getItem('isLoggedIn')
    
    if (loggedIn === 'true' && userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      if (parsedUser.role !== 'admin') {
        alert('Access denied! Admin access required.')
        router.push('/')
        return
      }
      
      fetchUsers()
      fetchBooks()
    } else {
      alert('Please login first!')
      router.push('/LoginPage')
    }
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      if (response.ok) {
        const data = await response.json()
        setBooks(data.books || [])
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookForm)
      })

      if (response.ok) {
        alert('Book added successfully!')
        setShowAddBookModal(false)
        setBookForm({ bookname: '', bookpicture: '', author_name: '', price: '', category: 'Novel' })
        fetchBooks()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to add book')
      }
    } catch (error) {
      alert('Error adding book')
      console.error(error)
    }
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
    setBookForm({
      bookname: book.bookname,
      bookpicture: book.bookpicture,
      author_name: book.author_name,
      price: book.price.toString(),
      category: book.category
    })
    setShowAddBookModal(true)
  }

  const handleUpdateBook = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/books/${editingBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookForm)
      })

      if (response.ok) {
        alert('Book updated successfully!')
        setShowAddBookModal(false)
        setEditingBook(null)
        setBookForm({ bookname: '', bookpicture: '', author_name: '', price: '', category: 'Novel' })
        fetchBooks()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to update book')
      }
    } catch (error) {
      alert('Error updating book')
      console.error(error)
    }
  }

  const handleDeleteBook = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Book deleted successfully!')
        fetchBooks()
      } else {
        alert('Failed to delete book')
      }
    } catch (error) {
      alert('Error deleting book')
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-indigo-700">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100">
      {/* Navbar */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-md">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 text-white">
          <div className="flex items-center space-x-3">
            <img
              src="/weblogo.png"
              className="h-12 w-16 md:h-16 md:w-20 object-contain"
              alt="Logo"
            />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-amber-400 text-purple-900 px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Welcome, {user?.name} 👋
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'books'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📚 Books Management
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            👥 Users Management
          </button>
        </div>

        {/* Books Tab */}
        {activeTab === 'books' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-indigo-700">Books Management</h3>
              <button
                onClick={() => {
                  setEditingBook(null)
                  setBookForm({ bookname: '', bookpicture: '', author_name: '', price: '', category: 'Novel' })
                  setShowAddBookModal(true)
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
              >
                + Add New Book
              </button>
            </div>

            {/* Books Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Image</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Book Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Author</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Price</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Category</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                        No books found. Add your first book!
                      </td>
                    </tr>
                  ) : (
                    books.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">{book.id}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <img src={book.bookpicture} alt={book.bookname} className="w-16 h-20 object-cover rounded" />
                        </td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">{book.bookname}</td>
                        <td className="border border-gray-300 px-4 py-3">{book.author_name}</td>
                        <td className="border border-gray-300 px-4 py-3 font-bold text-green-600">Rs. {book.price}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                            {book.category}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBook(book)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-all"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center text-gray-600">
              <p>Total Books: <span className="font-bold text-indigo-700">{books.length}</span></p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">Users Management</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="border border-gray-300 px-4 py-3 text-left">ID</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Role</th>
                    <th className="border border-gray-300 px-4 py-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3">{u.id}</td>
                        <td className="border border-gray-300 px-4 py-3 font-semibold">{u.name}</td>
                        <td className="border border-gray-300 px-4 py-3">{u.email}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            u.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {u.role || 'user'}
                          </span>
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center text-gray-600">
              <p>Total Users: <span className="font-bold text-indigo-700">{users.length}</span></p>
            </div>
          </div>
        )}

        {/* Add/Edit Book Modal */}
        {showAddBookModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                {editingBook ? 'Edit Book' : 'Add New Book'}
              </h3>
              <form onSubmit={editingBook ? handleUpdateBook : handleAddBook} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Book Name</label>
                  <input
                    type="text"
                    required
                    value={bookForm.bookname}
                    onChange={(e) => setBookForm({ ...bookForm, bookname: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter book name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    required
                    value={bookForm.bookpicture}
                    onChange={(e) => setBookForm({ ...bookForm, bookpicture: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={bookForm.author_name}
                    onChange={(e) => setBookForm({ ...bookForm, author_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter author name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={bookForm.price}
                    onChange={(e) => setBookForm({ ...bookForm, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Category</label>
                  <select
                    required
                    value={bookForm.category}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition-all"
                  >
                    {editingBook ? 'Update Book' : 'Add Book'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddBookModal(false)
                      setEditingBook(null)
                      setBookForm({ bookname: '', bookpicture: '', author_name: '', price: '', category: 'Novel' })
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
