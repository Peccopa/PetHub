// server.js — простой Node.js сервер с поддержкой username
import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { pool } from './db/pool.js';
import https from 'https';

// Путь к фронтенду
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, '../frontend/dist');
const API_KEY = process.env.RENDER_API_KEY;

// Универсальная функция для отправки JSON-ответа
const sendJSON = (res, data, status = 200) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Создаём HTTP-сервер
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  //====получаем статус сервисов Рендера======
  if (req.method === 'GET' && parsedUrl.pathname === '/api/render-services') {
    const options = {
      hostname: 'api.render.com',
      path: '/v1/services',
      method: 'GET',
      headers: { Authorization: `Bearer ${process.env.RENDER_API_KEY}` },
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', (chunk) => (data += chunk));
      apiRes.on('end', () => {
        try {
          const json = JSON.parse(data); // безопасно парсим JSON
          sendJSON(res, json, 200);
        } catch (err) {
          sendJSON(res, { error: 'Invalid JSON from Render API' }, 500);
        }
      });
    });

    apiReq.on('error', (err) => sendJSON(res, { error: err.message }, 500));
    apiReq.end();
    return;
  }

  // === GET /api/status ===
  if (req.method === 'GET' && parsedUrl.pathname === '/api/status') {
    try {
      // Проверяем доступность базы и количество комментариев
      const { rows } = await pool.query(
        'SELECT COUNT(*) AS count FROM comments'
      );
      const messagesCount = parseInt(rows[0].count, 10);

      sendJSON(res, {
        service: 'microchat',
        status: 'ok',
        messagesCount,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      sendJSON(
        res,
        {
          service: 'microchat',
          status: 'error',
          error: err.message,
          timestamp: new Date().toISOString(),
        },
        500
      );
    }
    return;
  }

  // === 1️⃣ GET /api/comments ===
  if (req.method === 'GET' && parsedUrl.pathname === '/api/comments') {
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

  // === 2️⃣ POST /api/comments ===
  if (req.method === 'POST' && parsedUrl.pathname === '/api/comments') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { text, username, color } = JSON.parse(body);

        // Проверяем, что оба поля заполнены
        if (!text || !username) {
          sendJSON(res, { error: 'Text and username are required' }, 400);
          return;
        }

        await pool.query(
          'INSERT INTO comments (username, text, color) VALUES ($1, $2, $3)',
          [username, text, color || '#333333']
        );

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
          : ext === '.svg'
          ? 'image/svg+xml'
          : 'text/plain';
      res.writeHead(200, { 'Content-Type': type });
      res.end(content);
    }
  });
});

// PORT задаётся Render'ом или локально 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
