// Объяснение:
// document.getElementById("send").onclick = async () => { ... }
// Когда пользователь нажимает кнопку «Send», выполняется функция.
// const msg = document.getElementById("msg").value;
// Берём текст из поля ввода.
// fetch("/echo", { ... })
// Отправляем POST-запрос на сервер по пути /echo.
// Указываем метод, заголовки и тело запроса в формате JSON.
// const data = await res.json();
// Ждём ответ сервера и парсим его как JSON.
// document.getElementById("out").textContent = JSON.stringify(data, null, 2);
// Отображаем ответ сервера в блоке <pre>, красиво отформатированный.

// Находим кнопку по id и назначаем обработчик клика
document.getElementById('send').onclick = async () => {
  // Получаем значение из поля ввода
  const msg = document.getElementById('msg').value;

  // Отправляем POST-запрос на сервер
  const res = await fetch('/echo', {
    method: 'POST', // метод запроса
    headers: { 'Content-Type': 'application/json' }, // отправляем JSON
    body: JSON.stringify({ message: msg }), // тело запроса: объект с message
  });

  // Получаем JSON-ответ от сервера
  const data = await res.json();

  // Выводим ответ в блок <pre id="out">
  document.getElementById('out').textContent = JSON.stringify(data, null, 2);
};
