import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Навигация</h3>
      <div className="nav-item">Главная</div>
      <div className="nav-item">Пользователи</div>
      <div className="nav-item">Отчёты</div>
      <div className="nav-item">Настройки</div>
    </aside>
  );
};

export default Sidebar;
