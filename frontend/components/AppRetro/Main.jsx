// frontend/Main.jsx
import React from 'react';
import Card from './Card.jsx';

const stats = [
  { title: 'ACTIVE USERS', value: '1,234', hint: 'last 24h' },
  { title: 'SESSIONS', value: '5,678', hint: 'concurrent' },
  { title: 'ERRORS', value: '3', hint: 'today' },
  { title: 'UPTIME', value: '99.98%', hint: '30d' },
];

export default function Main() {
  return (
    <main className="main">
      <section className="overview">
        {stats.map((s) => (
          <Card key={s.title} {...s} />
        ))}
      </section>

      <section className="widgets">
        <div className="panel">
          <div className="panel-title">RECENT ACTIVITY</div>
          <div className="table">
            <div className="row header">
              <div>User</div>
              <div>Action</div>
              <div>When</div>
            </div>

            <div className="row">
              <div>alice</div>
              <div>login</div>
              <div>10:12</div>
            </div>
            <div className="row">
              <div>bob</div>
              <div>upload</div>
              <div>09:58</div>
            </div>
            <div className="row">
              <div>eve</div>
              <div>error</div>
              <div>09:45</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">SYSTEM MODULES</div>
          <ul className="module-list">
            <li>CPU MONITOR — ACTIVE</li>
            <li>MEMORY — STANDBY</li>
            <li>NET-GW — CONNECTED</li>
            <li>AUTH — ENABLED</li>
          </ul>
        </div>
      </section>

      <section className="terminal-panel">
        <div className="terminal-line">root@RETRO:~$ initializing...</div>
        <div className="terminal-line">root@RETRO:~$ load modules...</div>
        <div className="terminal-line">
          root@RETRO:~$ ready <span className="cursor" />
        </div>
      </section>
    </main>
  );
}
