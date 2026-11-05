import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserDropdown from './UserDropdown';
import NotificationsDropdown from './NotificationsDropdown';
import { Menu } from 'lucide-react';

const TopNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="w-full h-14 sm:h-16 bg-gray-100 border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between lg:justify-end flex-shrink-0 z-10">
      {/* Botón menú hamburguesa visible únicamente en móviles */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
        title="Abrir menú"
      >
        <Menu size={24} />
      </button>

      {/* Sub-barra fija superior derecha: Tono gris suave con notificaciones y perfil */}
      <div className="flex items-center space-x-4">
        <NotificationsDropdown />
        <UserDropdown user={user} />
      </div>
    </header>
  );
};

export default TopNavbar;
