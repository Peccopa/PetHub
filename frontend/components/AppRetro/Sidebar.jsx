// frontend/Sidebar.jsx
import React from 'react';

const links = [
  'DASHBOARD',
  'USERS',
  'ANALYTICS',
  'PROJECTS',
  'LOGS',
  'SETTINGS',
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">RETRO SYS v1.0</div>
      <div className="divider">────────────────────────</div>

      <nav className="nav">
        {links.map((l) => (
          <div key={l} className="nav-item">
            &gt; {l}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div>TERM MODE</div>
        <div className="small">connected</div>
      </div>
    </aside>
  );
}
