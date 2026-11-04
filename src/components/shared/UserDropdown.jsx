import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_LABELS, label } from '../../utils/labels';

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    user?.role === 'teacher'
      ? navigate(`/teacher/teacher-profile/${user.name}`)
      : navigate(`/student/student-profile/${user.name}`);
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    navigate('/settings');
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg hover:bg-gray-200/80 transition-colors border border-transparent hover:border-gray-300"
      >
        <div className="text-right">
          <div className="text-sm font-bold text-gray-900 leading-tight">{user?.name || 'Usuario'}</div>
          <div className="text-xs text-gray-600 font-semibold capitalize mt-0.5">{label(ROLE_LABELS, user?.role) || 'Rol'}</div>
        </div>
        <div className="w-9 h-9 bg-orange-400 rounded-full overflow-hidden border border-gray-300 shadow-xs flex-shrink-0">
          <img
            className="w-full h-full object-cover"
            src={user?.avatar || '/default-avatar.png'}
            alt={user?.name || 'Usuario'}
          />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
          <button
            onClick={handleProfileClick}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="w-4 h-4 mr-2" />
            Perfil
          </button>
          <button
            onClick={handleSettingsClick}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configuración
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
