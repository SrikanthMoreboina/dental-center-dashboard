import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './styles/output.css';
import 'react-toastify/dist/ReactToastify.css';

// Main entry point with toast notifications
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </BrowserRouter>
  </React.StrictMode>
);