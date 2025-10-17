// Простенький сервер без Express — используем Node.js стандартные модули
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { pool } from './db/pool.js';

// Путь к фронтенду
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, '../frontend');

// Универсальная функция для отправки JSON-ответа
const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Создаём HTTP-сервер

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // --- CORS ---
  const allowedOrigins = [
    'http://localhost:8080',
    'https://pethub.onrender.com',
    'https://pethub-o2ap.onrender.com',
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // === 1️⃣ API: получить комментарии ===
  if (req.method === 'GET' && parsedUrl.pathname === '/comments') {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM comments ORDER BY id DESC'
      );
      sendJSON(res, rows);
    } catch (err) {
      sendJSON(res, { error: err.message }, 500);
    }
    return;
  }

  // === 2️⃣ API: добавить комментарий ===
  if (req.method === 'POST' && parsedUrl.pathname === '/comments') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { text } = JSON.parse(body);
        await pool.query('INSERT INTO comments (text) VALUES ($1)', [text]);
        sendJSON(res, { message: 'Comment added' });
      } catch (err) {
        sendJSON(res, { error: err.message }, 500);
      }
    });
    return;
  }

  // === 3️⃣ Отдаём фронтенд ===
  let filePath = path.join(frontendPath, parsedUrl.pathname);
  if (parsedUrl.pathname === '/')
    filePath = path.join(frontendPath, 'index.html');

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      const ext = path.extname(filePath);
      const type =
        ext === '.html'
          ? 'text/html'
          : ext === '.js'
          ? 'application/javascript'
          : ext === '.css'
          ? 'text/css'
          : 'text/plain';
      res.writeHead(200, { 'Content-Type': type });
      res.end(content);
    }
  });
});

// PORT задаётся Render'ом или локально 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
