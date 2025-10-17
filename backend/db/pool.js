import dotenv from 'dotenv';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;

const isProd = process.env.NODE_ENV === 'production';
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

// dotenv.config({
//   path: isProd ? path.resolve('../.env.prod') : path.resolve('../.env.local'),
// });

// export const pool = new Pool({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: Number(process.env.DB_PORT),
//   ssl: isProd ? { rejectUnauthorized: false } : { rejectUnauthorized: false },
// });

// Проверим соединение при старте
// (async () => {
//   try {
//     const client = await pool.connect();
//     console.log('✅ Database connected successfully');
//     client.release();
//   } catch (err) {
//     console.error('❌ Database connection failed:', err.message);
//   }
// })();
