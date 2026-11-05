import React from 'react';
import { 
  Home, 
  Users, 
  LibraryBig, 
  Calendar, 
  FileText, 
  ClipboardList, 
  Award, 
  Trophy, 
  UserCheck, 
  User, 
  LogOut, 
  X 
} from 'lucide-react';
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
    { icon: ClipboardList,label: 'Tareas',      path: '/student/assignments' },
    { icon: Award,        label: 'Notas',       path: '/student/grades' },
    { icon: Trophy,       label: 'Ranking',     path: '/student/ranking' },
    { icon: UserCheck,    label: 'Asistencia',  path: '/student/attendance' },
  ];

  const handleLogoClick = () => {
    if (user?.role === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/student/dashboard');
    }
    if (onClose) onClose();
  };

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
      if (onClose) onClose();
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

      {/* Columna Izquierda: Menú Lateral con Ancho Controlado y Logo Compacto (Corona del Sidebar) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-10 w-60 sm:w-64 max-w-[260px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } bg-white border-r border-gray-200 text-gray-800 h-full flex flex-col flex-shrink-0 select-none shadow-xl lg:shadow-none`}
      >
        {/* Cabecera / Logotipo Compacto Restringido Exactamente al Ancho del Menú */}
        <div className="relative h-14 sm:h-16 w-full p-0 m-0 border-b border-gray-200 flex items-center justify-center bg-white flex-shrink-0 overflow-hidden px-3">
          <div
            onClick={handleLogoClick}
            className="w-full h-full p-0 m-0 cursor-pointer flex items-center justify-center overflow-hidden"
            title="Ir al inicio"
          >
            <img
              src="/image/imagenacademia.png"
              alt="Academia Apu San Antonio de Andahuaylas"
              className="h-11 sm:h-12 w-auto max-w-[210px] sm:max-w-[230px] object-contain object-center block select-none pointer-events-none"
            />
          </div>

          {/* Botón cerrar para móvil */}
          <button
            onClick={onClose}
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 bg-white/90 shadow-xs"
            title="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista vertical de módulos con escala reducida (-20%) y alineación estricta a la izquierda */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 sm:px-3 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = activeItem === item.label;
            return (
              <div
                key={index}
                onClick={() => handleItemClick(item.label)}
                className={`flex items-center justify-start text-left gap-2.5 sm:gap-3 pl-2.5 sm:pl-3 pr-4 py-2 sm:py-2.5 rounded-lg cursor-pointer transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold shadow-xs'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
                }`}
                style={isActive ? { backgroundColor: RED } : {}}
              >
                <item.icon size={24} className="w-6 h-6 flex-shrink-0" />
                <span className="text-base sm:text-lg tracking-tight leading-none whitespace-nowrap">
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white opacity-90 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </nav>

        {/* Sección inferior: Perfil y Cerrar sesión reducidos y alineados a la izquierda */}
        <div className="border-t border-gray-100 px-2 sm:px-3 py-3 space-y-1 bg-white flex-shrink-0">
          <div
            onClick={() => handleItemClick('Perfil')}
            className={`flex items-center justify-start text-left gap-2.5 sm:gap-3 pl-2.5 sm:pl-3 pr-4 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap ${
              activeItem === 'Perfil'
                ? 'text-white font-bold'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-semibold'
            }`}
            style={activeItem === 'Perfil' ? { backgroundColor: RED } : {}}
          >
            <User size={22} className="w-5.5 h-5.5 flex-shrink-0" />
            <span className="text-base sm:text-lg tracking-tight leading-none whitespace-nowrap">Perfil</span>
          </div>

          <div
            onClick={() => handleItemClick('Cerrar sesión')}
            className="flex items-center justify-start text-left gap-2.5 sm:gap-3 pl-2.5 sm:pl-3 pr-4 py-2 rounded-lg cursor-pointer transition-all whitespace-nowrap text-gray-700 hover:bg-red-50 hover:text-red-700 font-semibold"
          >
            <LogOut size={22} className="w-5.5 h-5.5 flex-shrink-0" />
            {isLoading ? <Loading /> : <span className="text-base sm:text-lg tracking-tight leading-none whitespace-nowrap">Cerrar sesión</span>}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
