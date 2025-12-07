import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET all books
export async function GET(request) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = 'SELECT * FROM books ORDER BY created_at DESC'
    let params = []

    if (category) {
      query = 'SELECT * FROM books WHERE category = $1 ORDER BY created_at DESC'
      params = [category]
    }

    const result = await pool.query(query, params)

    return NextResponse.json(
      { books: result.rows },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new book
export async function POST(request) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { bookname, bookpicture, author_name, price, category } = await request.json()

    // Validation
    if (!bookname || !bookpicture || !author_name || !price || !category) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `INSERT INTO books (bookname, bookpicture, author_name, price, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [bookname, bookpicture, author_name, parseFloat(price), category]
    )

    return NextResponse.json(
      { 
        message: 'Book created successfully',
        book: result.rows[0]
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}




