import React from 'react';

export const Header = ({ onNavigate, active }) => {
  const linkStyle = (page) => ({
    cursor: 'pointer',
    color: active === page ? '#007acc' : '#333',
    textDecoration: active === page ? 'underline' : 'none',
  });

  return (
    <header style={styles.header}>
      <h1>🐾 PetHub</h1>
      <nav>
        <span style={linkStyle('home')} onClick={() => onNavigate('home')}>
          Главная
        </span>{' '}
        |{' '}
        <span style={linkStyle('pets')} onClick={() => onNavigate('pets')}>
          Питомцы
        </span>{' '}
        |{' '}
        <span style={linkStyle('games')} onClick={() => onNavigate('games')}>
          Игры
        </span>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '1rem',
    background: '#f5f5f5',
    borderBottom: '1px solid #ddd',
    textAlign: 'center',
  },
};
