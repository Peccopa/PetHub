import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db/pool';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fullPath = path.join(__dirname, '../frontend/public', filePath);

    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        const ext = path.extname(fullPath);
        const type =
          ext === '.html'
            ? 'text/html'
            : ext === '.js'
            ? 'text/javascript'
            : 'text/plain';
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/messages') {
    let body = '';

    req.on('data', (chunk) => (body += chunk));

    req.on('end', async () => {
      try {
        const { username, text } = JSON.parse(body);

        // сохраняем сообщение в базу данных
        await pool.query(
          'INSERT INTO messages (username, text) VALUES ($1, $2)',
          [username, text]
        );

        // возвращаем успешный ответ
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', message: 'Message saved' }));
      } catch (err) {
        console.error('❌ Error inserting message:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to save message' }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/messages') {
    try {
      const result = await pool.query(
        'SELECT * FROM messages ORDER BY created_at DESC'
      );
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      console.error('❌ Error fetching messages:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to fetch messages' }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => console.log('Server running on port 3000'));
