import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = http.createServer((req, res) => {
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
  } else if (req.method === 'POST' && req.url === '/echo') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const { message } = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message, time: new Date().toISOString() }));
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => console.log('Server running on port 3000'));
