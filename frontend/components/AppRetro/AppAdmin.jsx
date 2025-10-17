// frontend/App.jsx
import React from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default function App() {
  return (
    <div className="crt">
      {' '}
      {/* контейнер CRT эффекта */}
      <div className="app">
        <Sidebar />
        <div className="content">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </div>
  );
}
