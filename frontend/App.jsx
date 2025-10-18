import React, { useState, useEffect } from 'react';
import './app.css';

export const App = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Функция загрузки комментариев
  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Ошибка загрузки комментариев:', err);
    }
  };

  // Первый рендер + периодическое обновление каждые 5 секунд
  useEffect(() => {
    fetchComments(); // сразу загружаем комментарии

    const interval = setInterval(() => {
      fetchComments();
    }, 5000); // 5000 мс = 5 секунд

    return () => clearInterval(interval); // очистка при размонтировании
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment }),
      });
      setNewComment('');
      fetchComments(); // обновляем комментарии сразу после отправки
    } catch (err) {
      console.error('Ошибка отправки комментария:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src="https://placecats.com/400/400" alt="Котёнок" />
        <p className="caption">Маленький пушистик ждёт ваших комментариев 😺</p>
      </div>

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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isSubmitting}
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Запостить комментарий'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
