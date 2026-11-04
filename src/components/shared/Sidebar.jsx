import React from 'react';
import { Home, Users, LibraryBig, Calendar, FileText, ClipboardList, Award, UserCheck, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/shared/Loading';

// Rojo institucional
const RED = '#C0392B';

const Sidebar = ({ currentPage, isOpen, onClose }) => {
  const [activeItem, setActiveItem] = React.useState(currentPage);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { user, logout } = useAuth();

  const menuItemsTeacher = [
    { icon: Home,         label: 'Inicio',      path: '/teacher/dashboard' },
    { icon: Users,        label: 'Alumnos',     path: '/teacher/students-list' },
    { icon: Calendar,     label: 'Horario',     path: '/teacher/schedule' },
    { icon: FileText,     label: 'Exámenes',    path: '/teacher/exams' },
    { icon: ClipboardList,label: 'Tareas',      path: '/teacher/assignments' },
    { icon: Award,        label: 'Notas',       path: '/teacher/grades' },
  ];

  const menuItemsStudent = [
    { icon: Home,         label: 'Inicio',      path: '/student/dashboard' },
    { icon: LibraryBig,   label: 'Asignaturas', path: '/student/courses-list' },
    { icon: Calendar,     label: 'Horario',     path: '/student/schedule' },
    { icon: FileText,     label: 'Exámenes',    path: '/student/exams' },
    { icon: ClipboardList,label: 'Tareas',      path: '/student/assignments' },
    { icon: Award,        label: 'Notas',       path: '/student/grades' },
    { icon: UserCheck,    label: 'Asistencia',  path: '/student/attendance' },
  ];

  const handleItemClick = (label) => {
    if (label === 'Cerrar sesión') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        logout();
        navigate('/');
      }, 800);
    } else if (label === 'Perfil') {
      setActiveItem(label);
      user?.role === 'teacher'
        ? navigate(`/teacher/teacher-profile/${user.name}`)
        : navigate(`/student/student-profile/${user.name}`);
    } else {
      const menu = user?.role === 'teacher' ? menuItemsTeacher : menuItemsStudent;
      const menuItem = menu.find(item => item.label === label);
      if (menuItem) {
        setActiveItem(label);
        navigate(menuItem.path);
        if (onClose) onClose();
      }
    }
  };

  const menuItems = user?.role === 'teacher' ? menuItemsTeacher : menuItemsStudent;

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Columna Izquierda: Menú de Módulos (Sidebar compacto con fondo blanco) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-10 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } bg-white border-r border-gray-200 text-gray-800 h-full flex flex-col flex-shrink-0 select-none`}
      >
        {/* Botón cerrar (exclusivo para móvil) */}
        <div className="lg:hidden flex justify-end p-3 border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
            title="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista vertical de módulos */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.label;
            return (
              <div
                key={index}
                onClick={() => handleItemClick(item.label)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'text-white font-semibold shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                style={isActive ? { backgroundColor: RED } : {}}
              >
                <item.icon size={18} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-90" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Sección inferior: Perfil y Cerrar sesión */}
        <div className="border-t border-gray-100 px-2 py-3 space-y-1 bg-white">
          <div
            onClick={() => handleItemClick('Perfil')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              activeItem === 'Perfil'
                ? 'text-white font-semibold'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            style={activeItem === 'Perfil' ? { backgroundColor: RED } : {}}
          >
            <User size={18} />
            <span className="text-sm">Perfil</span>
          </div>

          <div
            onClick={() => handleItemClick('Cerrar sesión')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all text-gray-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={18} />
            {isLoading ? <Loading /> : <span className="text-sm">Cerrar sesión</span>}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
