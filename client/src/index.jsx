import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import './styles/tailwind.css';
import './styles/index.css';

// Solution ultra-simple pour remplacer alert()
window.alert = function(msg) {
  // Crée une div de notification
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #2563eb;
      color: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
      font-family: 'Inter', sans-serif;
    ">
      <strong>Notification</strong><br>
      ${msg}
    </div>
  `;
  
  document.body.appendChild(div);
  
  // Supprime après 3 secondes
  setTimeout(() => {
    div.remove();
  }, 5000);
  
  return true;
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);