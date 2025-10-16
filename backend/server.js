// Подробное объяснение логики
// Статика (GET-запросы)
// Когда браузер открывает страницу, сервер отдает файлы из папки public.
// Если файл не найден → 404.
// Определяем Content-Type по расширению (.html, .js).
// POST /echo
// Сервер принимает данные (JSON) через fetch с фронта.
// Данные собираются по кусочкам (req.on("data")) и парсятся.
// Сервер возвращает JSON с тем же сообщением и текущим временем.
// Обработка всего остального
// Любой другой метод или путь → 404.
// Слушает порт
// Сервер стартует на localhost:3000 локально.
// На Render будет доступен через публичный URL.

// import pool from './db/pool.js';

import 'dotenv/config'; // автоматически загружает переменные из .env в process.env

// Импортируем модуль http, который позволяет создавать HTTP-сервер
import http from 'http';

// Импортируем модуль fs для работы с файловой системой (чтение HTML/JS файлов)
import fs from 'fs';

// Импортируем модуль path для работы с путями к файлам
import path from 'path';

// Импортируем fileURLToPath, чтобы преобразовать URL файла в обычный путь
import { fileURLToPath } from 'url';

// Получаем __dirname, путь к текущей директории файла
// В Node.js с ES-модулями __dirname нет по умолчанию, поэтому используем эту конструкцию
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Создаём HTTP сервер
const server = http.createServer((req, res) => {
  // req — объект запроса (информация о клиенте, метод, URL, тело)
  // res — объект ответа (мы с его помощью отправляем данные клиенту)

  // --- Обработка GET-запросов (например, когда браузер открывает страницу) ---
  if (req.method === 'GET') {
    // Если URL '/' — отдаём index.html, иначе файл по указанному пути
    const filePath = req.url === '/' ? '/index.html' : req.url;

    // Полный путь к файлу в папке public
    const fullPath = path.join(__dirname, 'public', filePath);

    // Читаем файл асинхронно
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        // Если файла нет или произошла ошибка — возвращаем 404
        res.writeHead(404);
        res.end('Not found');
      } else {
        // Определяем тип содержимого по расширению файла
        const ext = path.extname(fullPath);
        const type =
          ext === '.html'
            ? 'text/html'
            : ext === '.js'
            ? 'text/javascript'
            : 'text/plain';

        // Устанавливаем заголовок Content-Type и отправляем содержимое
        res.writeHead(200, { 'Content-Type': type });
        res.end(data); // отправляем файл клиенту
      }
    });
  }
  // --- Обработка POST-запроса на путь /echo ---
  else if (req.method === 'POST' && req.url === '/echo') {
    let body = ''; // переменная для накопления данных из запроса

    // Когда приходят данные от клиента, добавляем их в body
    req.on('data', (chunk) => (body += chunk));

    // Когда все данные получены
    req.on('end', () => {
      // Парсим JSON из тела запроса
      const { message } = JSON.parse(body);

      // Отправляем ответ клиенту в формате JSON
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message, time: new Date().toISOString() }));
    });
  }
  // --- Всё остальное ---
  else {
    // Если метод или URL не поддерживаются, возвращаем 404
    res.writeHead(404);
    res.end();
  }
});

// Сервер слушает порт 3000 и выводит сообщение в консоль
server.listen(3000, () => console.log('Server running on port 3000'));
