import React from 'react';

export const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <div style={styles.icons}>
        <span>🔔</span>
        <span>🔍</span>
        <span>👤</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    height: '60px',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  icons: { display: 'flex', gap: '15px', fontSize: '20px' },
};
