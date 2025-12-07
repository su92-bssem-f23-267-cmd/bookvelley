import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request) {
  try {
    if (!pool) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Get user from request (you can add proper authentication here)
    // For now, we'll just return all users if admin
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    )

    return NextResponse.json(
      { 
        users: result.rows
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}




