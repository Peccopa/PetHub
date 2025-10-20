import React, { useState, useEffect } from 'react';
import './AppComments.css';
import telepood from './telepood.svg';

export const AppComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  ); // новое состояние для имени
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [color, setColor] = useState(
    localStorage.getItem('color') || '#333333'
  ); // цвет по умолчанию

  // Загрузка комментариев
  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Ошибка загрузки комментариев:', err);
    }
  };

  // Периодическое обновление комментариев каждые 5 секунд
  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment, username, color }),
      });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Ошибка отправки комментария:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={telepood} alt="Telepood" />
      </div>

      <div className="comments-section">
        <h2>Комментарии</h2>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment">
                <strong>{c.username || 'Аноним'}:</strong> 🗨️{' '}
                <span style={{ color: c.color || '#333333' }}>{c.text}</span>
              </div>
            ))
          ) : (
            <p>Комментариев пока нет. Будь первым!</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
          <div className="inputs">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                localStorage.setItem('username', e.target.value);
              }}
              placeholder="Ваше имя"
              textarea
              maxLength="20"
              // style={{ color: color }}
              disabled={isSubmitting}
              required
            />
            <input
              type="color"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                localStorage.setItem('color', e.target.value);
              }}
              title="Выберите цвет комментария"
              disabled={isSubmitting}
            />
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            textarea
            maxLength="1000"
            placeholder="Напишите свой комментарий..."
            style={{ color: color }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isSubmitting}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Запостить комментарий'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppComments;
