import { Pool } from 'pg'

// Get connection string from environment
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

// Only create pool if connection string exists
let pool = null

if (connectionString) {
  try {
    pool = new Pool({
      connectionString: connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      // Connection timeout settings
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 20
    })
    console.log('✅ PostgreSQL Pool created successfully')
  } catch (error) {
    console.error('❌ Error creating PostgreSQL pool:', error)
    console.error('Connection string:', connectionString ? 'Set' : 'Not set')
  }
} else {
  console.warn('⚠️  Warning: POSTGRES_URL or DATABASE_URL not found in environment variables')
  console.warn('⚠️  Please create .env.local file with your PostgreSQL connection string')
}

// Test connection
if (pool) {
  pool.on('connect', () => {
    console.log('✅ PostgreSQL Connected Successfully!')
  })

  pool.on('error', (err) => {
    console.error('❌ PostgreSQL Connection Error:', err)
  })
}

// Create users table if it doesn't exist
const createTable = async () => {
  if (!pool) {
    console.warn('⚠️  Cannot create table: Database pool not initialized')
    return false
  }
  
  try {
    // First, test the connection
    await pool.query('SELECT NOW()')
    console.log('✅ Database connection test successful')
    
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    await pool.query(query)
    console.log('✅ Users table ready!')
    
    // Add role column if it doesn't exist (for existing tables)
    try {
      await pool.query(`
        DO $$ 
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name='users' AND column_name='role') THEN
            ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
          END IF;
        END $$;
      `)
    } catch (alterError) {
      // Column might already exist, ignore error
      console.log('Role column check completed')
    }
    
    // Create books table
    const booksQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        bookname VARCHAR(255) NOT NULL,
        bookpicture VARCHAR(500) NOT NULL,
        author_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    await pool.query(booksQuery)
    console.log('✅ Books table ready!')
    
    // Create admin user if it doesn't exist
    await createAdminUser()
    
    return true
  } catch (error) {
    console.error('❌ Error creating table:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    return false
  }
}

// Initialize table on first connection
let tableInitialized = false
const initializeTable = async () => {
  if (!tableInitialized && pool) {
    await createTable()
    tableInitialized = true
  }
}

// Initialize table when module loads (only if pool exists)
if (pool) {
  initializeTable().catch((error) => {
    console.error('❌ Failed to initialize table:', error)
  })
}

// Create admin user
const createAdminUser = async () => {
  if (!pool) return
  
  try {
    const bcrypt = await import('bcryptjs')
    const adminEmail = 'admin@bookvalley.com'
    const adminPassword = 'admin123'
    
    // Check if admin already exists
    const existingAdmin = await pool.query('SELECT * FROM users WHERE email = $1', [adminEmail])
    
    if (existingAdmin.rows.length === 0) {
      // Hash password
      const hashedPassword = await bcrypt.default.hash(adminPassword, 10)
      
      // Create admin user
      await pool.query(
        `INSERT INTO users (name, email, password, role) 
         VALUES ($1, $2, $3, $4)`,
        ['Admin', adminEmail, hashedPassword, 'admin']
      )
      console.log('✅ Admin user created successfully!')
      console.log('📧 Email: admin@bookvalley.com')
      console.log('🔑 Password: admin123')
    } else {
      // Update existing admin if role is not set
      if (existingAdmin.rows[0].role !== 'admin') {
        await pool.query(
          'UPDATE users SET role = $1 WHERE email = $2',
          ['admin', adminEmail]
        )
        console.log('✅ Admin role updated!')
      }
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  }
}

// Export a function to manually initialize table if needed
export const ensureTable = async () => {
  if (pool) {
    return await createTable()
  }
  return false
}

// Export pool or a function that returns pool
export default pool
