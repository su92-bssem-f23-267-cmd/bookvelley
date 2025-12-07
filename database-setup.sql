-- PostgreSQL Database Setup Script
-- Is file ko manually run kar sakte hain ya automatically table create ho jayega

-- Users table create karein
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index create karein email ke liye (optional, lekin better performance ke liye)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);




