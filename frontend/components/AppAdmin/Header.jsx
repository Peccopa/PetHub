// frontend/Header.jsx
import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="chip">●</div>
        <div className="title">RETRO ADMIN PANEL</div>
      </div>

      <div className="header-right">
        <div className="status">ADMIN@LOCAL</div>
        <div className="clock">{new Date().toLocaleTimeString()}</div>
      </div>
    </header>
  );
}
