import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// PUT - Update book
export async function PUT(request, { params }) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { id } = params
    const { bookname, bookpicture, author_name, price, category } = await request.json()

    // Validation
    if (!bookname || !bookpicture || !author_name || !price || !category) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `UPDATE books 
       SET bookname = $1, bookpicture = $2, author_name = $3, price = $4, category = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [bookname, bookpicture, author_name, parseFloat(price), category, id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Book updated successfully',
        book: result.rows[0]
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete book
export async function DELETE(request, { params }) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { id } = params

    const result = await pool.query(
      'DELETE FROM books WHERE id = $1 RETURNING *',
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Book deleted successfully',
        book: result.rows[0]
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}




