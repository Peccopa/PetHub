import React, { useState, useEffect } from 'react';
import './app.css';

export const App = () => {
  // comments — список всех комментариев
  // newComment — текст, который пользователь вводит
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Загружаем комментарии при первом рендере
  useEffect(() => {
    fetchComments();
  }, []);

  // Функция получения комментариев с сервера
  // console.log(process);
  // const API_URL =
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://pethub-backend.onrender.com/comments'
  //     : 'http://localhost:3000/comments';

  // const API_URL = process.env.REACT_APP_API_URL;
  // console.log(API_URL);

  const fetchComments = async () => {
    try {
      const res = await fetch('/comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Ошибка загрузки комментариев:', err);
    }
  };

  // Функция отправки комментария
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment }),
      });
      setNewComment(''); // очищаем поле
      fetchComments(); // обновляем список
    } catch (err) {
      console.error('Ошибка отправки комментария:', err);
    }
  };

  return (
    <div className="container">
      {/* Левая часть — фото котёнка */}
      <div className="image-section">
        <img src="https://placecats.com/400/400" alt="Котёнок" />
        <p className="caption">Маленький пушистик ждёт ваших комментариев 😺</p>
      </div>

      {/* Правая часть — комментарии и форма */}
      <div className="comments-section">
        <h2>Комментарии</h2>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment">
                🗨️ {c.text}
              </div>
            ))
          ) : (
            <p>Комментариев пока нет. Будь первым!</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напишите свой комментарий..."
          ></textarea>
          <button type="submit">Запостить комментарий</button>
        </form>
      </div>
    </div>
  );
};

export default App;
