import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserDropdown from './UserDropdown';
import NotificationsDropdown from './NotificationsDropdown';

const TopNavbar = () => {
  const { user } = useAuth();

  return (
    <div className="w-full h-14 bg-gray-100 border-b border-gray-200 px-6 flex items-center justify-end flex-shrink-0 z-10 shadow-2xs">
      {/* Sub-barra fija superior derecha: Tono gris suave y elegante con contraste optimizado */}
      <div className="flex items-center space-x-4">
        <NotificationsDropdown />
        <UserDropdown user={user} />
      </div>
    </div>
  );
};

export default TopNavbar;
