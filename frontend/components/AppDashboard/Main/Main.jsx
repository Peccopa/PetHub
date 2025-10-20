import React from 'react';
import './Main.css';
import { AppComments } from '../../AppComments/AppComments';
import MicrochatStatus from '../MicroChat/MicroChat';

const Main = () => {
  return (
    <main className="main">
      <h2>Обзор системы</h2>
      <p>Здесь можно отобразить метрики, графики или статистику приложения.</p>

      <div className="cards">
        <div className="card">
          <h4>Активные пользователи</h4>
          <p>1,024</p>
        </div>
        <div className="card">
          <h4>Задачи в очереди</h4>
          <p>58</p>
        </div>
        <div className="card">
          <h4>Ошибки</h4>
          <p>2 критические</p>
        </div>
          <MicrochatStatus />
      </div>
      <AppComments />
    </main>
  );
};

export default Main;
