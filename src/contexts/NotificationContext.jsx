import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X } from 'lucide-react';

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newNotification = { id, message, type, animationClass: 'entering' };

    setNotifications(prev => [...prev, newNotification]);

    // Start enter animation
    setTimeout(() => {
      setNotifications(prev =>
        prev.map(notif => (notif.id === id ? { ...notif, animationClass: 'active' } : notif))
      );
    }, 50);

    // Schedule exit animation and removal
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev =>
          prev.map(notif => (notif.id === id ? { ...notif, animationClass: 'leaving' } : notif))
        );
        setTimeout(() => {
          setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 500); // Duration of the leaving animation
      }, duration);
    }
  }, []);

  const hideNotification = useCallback((idToHide) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === idToHide ? { ...notif, animationClass: 'leaving' } : notif))
    );
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== idToHide));
    }, 500); // Duration of the leaving animation
  }, []);

  const getNotificationClasses = (animationClass, type) => {
    let baseClasses = "p-4 w-96 rounded-lg shadow-lg flex items-center justify-between transition-all duration-500 ease-out transform";
    let colorClasses = type === 'success' ? 'bg-green-200 border-l-4 border-green-600 text-green-800' : 'text-red-800 bg-red-200 border-l-4 border-red-600';

    if (animationClass === 'entering' || animationClass === 'leaving') {
      baseClasses += " opacity-0 translate-x-full";
    } else if (animationClass === 'active') {
      baseClasses += " opacity-100 translate-x-0";
    }

    return `${baseClasses} ${colorClasses}`;
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <div className="fixed top-4 right-4 flex flex-col-reverse items-end space-y-2" style={{ zIndex: 1000 }}>
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={getNotificationClasses(notif.animationClass, notif.type)}
          >
            <div>
              <p className="font-bold text-lg">{notif.type === 'success' ? 'Enviado' : '¡Error!'}</p>
              <p className="text-sm">{notif.message}</p>
            </div>
            <button onClick={() => hideNotification(notif.id)} className="ml-4 text-black hover:text-gray-500">
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}; 