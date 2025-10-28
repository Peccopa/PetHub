import dotenv from 'dotenv';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;

// Определяем, продакшен или нет
const isProd = process.env.NODE_ENV === 'production';

// ✅ Загружаем .env только в режиме разработки
if (!isProd) {
  dotenv.config({
    path: path.resolve('../.env.local'),
  });
}

// ✅ Конфигурация пула
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: String(process.env.DB_PASS || ''), // обязательно строка
  database: process.env.DB_NAME,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

// Логирование для отладки
// console.log('🔌 DB config:', {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   db: process.env.DB_NAME,
//   ssl: isProd,
// });

// Проверка соединения при старте
(async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();
