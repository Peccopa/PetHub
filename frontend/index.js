// frontend/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppAdmin from './components/AppAdmin/AppAdmin.jsx';
// import { App } from './App.jsx';
import './components/AppAdmin/styles.css';
// import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppAdmin />);
