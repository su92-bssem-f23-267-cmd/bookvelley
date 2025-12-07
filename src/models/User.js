// PostgreSQL ke liye direct queries use karenge
// Model file ab zaroori nahi hai, lekin structure ke liye rakha hai

export default class User {
  static async create(pool, { name, email, password, role = 'user' }) {
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, created_at
    `
    const values = [name, email, password, role]
    const result = await pool.query(query, values)
    return result.rows[0]
  }

  static async findByEmail(pool, email) {
    const query = 'SELECT * FROM users WHERE email = $1'
    const result = await pool.query(query, [email])
    return result.rows[0]
  }

  static async findById(pool, id) {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0]
  }
}
