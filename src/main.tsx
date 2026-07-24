import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EmptyMethodFooterCredit } from './components/EmptyMethodFooterCredit';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <EmptyMethodFooterCredit />
  </React.StrictMode>,
);
