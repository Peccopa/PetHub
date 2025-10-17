import 'dotenv/config';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from './db/pool.js'; // импорт подключения к Postgres

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer(async (req, res) => {
  // --- GET index.html ---
  if (req.method === 'GET' && req.url === '/') {
    const fullPath = path.join(__dirname, '../frontend/index.html');
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  // --- GET /comments ---
  else if (req.method === 'GET' && req.url === '/comments') {
    try {
      const { rows } = await pool.query('SELECT * FROM comments ORDER BY id DESC');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(rows));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
  }

  // --- POST /comments ---
  else if (req.method === 'POST' && req.url === '/comments') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const { author, text } = JSON.parse(body);
        const { rows } = await pool.query(
          'INSERT INTO comments(author, text) VALUES($1, $2) RETURNING *',
          [author || 'Гость', text]
        );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows[0]));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  }

  // --- Всё остальное ---
  else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
