// Reset temporal de localStorage para limpiar estados antiguos o corruptos
try {
  localStorage.clear();
} catch (e) {
  console.warn('No se pudo limpiar localStorage:', e);
}

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 font-semibold text-sm">Cargando sistema...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
