import pkg from 'pg';
import 'dotenv/config';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DB_URL,
  // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  ssl: { rejectUnauthorized: false },
});

async function testDB() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Server time:', result.rows[0].now);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

testDB();
