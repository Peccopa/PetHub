import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Для работы с __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Папка со статикой (Webpack dist)
const staticPath = path.join(__dirname, '../frontend/dist');

const server = http.createServer((req, res) => {
  // Определяем путь к файлу
  let filePath = path.join(
    staticPath,
    req.url === '/' ? 'index.html' : req.url
  );

  // Проверяем расширение для Content-Type
  const ext = path.extname(filePath);
  const contentType =
    ext === '.html'
      ? 'text/html'
      : ext === '.js'
      ? 'text/javascript'
      : ext === '.css'
      ? 'text/css'
      : 'text/plain';

  // Читаем файл
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// Порт из Render или локальный
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
