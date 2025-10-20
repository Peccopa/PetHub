import React from 'react';
import './AppDashboard.css';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
import Footer from './Footer/Footer';

const AppDashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <div className="content">
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export default AppDashboard;
