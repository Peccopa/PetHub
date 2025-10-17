import React from 'react';
import { Sidebar } from './Sidebar.jsx';
import { Header } from './Header.jsx';
import { Main } from './Main.jsx';
import { Footer } from './Footer.jsx';

export const App = () => {
  return (
    <div style={styles.app}>
      <Sidebar />
      <div style={styles.content}>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F3F4F6',
  },
};
