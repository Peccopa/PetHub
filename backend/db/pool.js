// подключение к PostgreSQL
import pkg from 'pg';
const { Pool } = pkg;

// Используем переменные окружения для конфиденциальных данных
export const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
