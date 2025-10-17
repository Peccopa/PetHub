import React, { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { Games } from './components/Games';
import { Pets } from './components/Pets';

export const App = () => {
  const [activePage, setActivePage] = useState('home');

  let content;
  switch (activePage) {
    case 'pets':
      content = <Pets />;
      break;
    case 'games':
      content = <Games />;
      break;
    default:
      content = <Main />;
  }

  return (
    <>
      <Header onNavigate={setActivePage} active={activePage} />
      {content}
      <Footer />
    </>
  );
};
