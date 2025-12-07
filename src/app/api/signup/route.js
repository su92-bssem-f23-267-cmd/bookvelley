import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  // Check if database is configured
  if (!pool) {
    console.error('❌ Database pool is null')
    return NextResponse.json(
      { error: 'Database not configured. Please set POSTGRES_URL in .env.local' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, password } = body

    console.log('📝 Signup request received:', { name, email, password: '***' })

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Ensure table exists before querying
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
    } catch (tableError) {
      console.error('Table creation error:', tableError)
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(pool, email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user (default role is 'user')
    const user = await User.create(pool, {
      name,
      email,
      password: hashedPassword,
      role: 'user'
    })

    console.log('✅ User created successfully:', user.id)

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || 'user'
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Signup error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    
    // PostgreSQL specific error handling
    if (error.code === '23505') { // Unique violation
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    if (error.code === '42P01') { // Table does not exist
      return NextResponse.json(
        { error: 'Database table not found. Please check database connection.' },
        { status: 500 }
      )
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return NextResponse.json(
        { error: 'Cannot connect to database. Please check PostgreSQL server is running.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

