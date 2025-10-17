import React, { useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Games } from './Games';
import { Pets } from './Pets';

export const AppAnimals = () => {
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
