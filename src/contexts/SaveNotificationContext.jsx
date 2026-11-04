import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const SaveNotificationContext = createContext(null);

export const useSaveNotification = () => {
  const context = useContext(SaveNotificationContext);
  if (!context) {
    throw new Error('useSaveNotification must be used within a SaveNotificationProvider');
  }
  return context;
};

export const SaveNotificationProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('Saved');
  const [timeoutId, setTimeoutId] = useState(null);

  const showSaveNotification = useCallback((msg = 'Saved', duration = 5000) => {
    setMessage(msg);
    setShow(true);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setShow(false);
    }, duration);
    setTimeoutId(id);
  }, [timeoutId]);

  const hideSaveNotification = useCallback(() => {
    setShow(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  return (
    <SaveNotificationContext.Provider value={{ showSaveNotification, hideSaveNotification }}>
      {children}
      <div
        className={`fixed h-10 z-999999 left-1/2 -translate-x-1/2 top-0 p-3 rounded-full border border-green-400 shadow-lg flex items-center justify-center space-x-2 transition-all duration-500 ease-in-out
          bg-gradient-to-br from-[#10062B] to-[#4F0129]
          ${show ? 'translate-y-4 opacity-100' : '-translate-y-full opacity-0'}
        `}
        style={{ zIndex: 1001, width: 'fit-content' }}
        title="Los datos se guardan localmente para evitar pérdidas si se cierra la ventana por accidente. Debes enviar el formulario para guardarlos en la base de datos."
      >
        <span className="font-bold text-lg text-white">{message}</span>
        <CheckCircle size={24} className="text-green-400" />
      </div>
    </SaveNotificationContext.Provider>
  );
}; 