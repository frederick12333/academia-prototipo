import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Trash2, ClipboardList, FileText, Megaphone, Calendar, Loader2 } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RED = '#C0392B';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedNotification, setDeletedNotification] = useState(null);
  const dropdownRef = useRef(null);
  const { showNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isTeacher = user?.role === 'teacher';

  // Centro unificado de alertas del sistema y avisos institucionales
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Aviso Institucional: Rol de Evaluaciones',
      message: 'Inicio del Rol de Evaluaciones Presenciales. Presentarse en sus respectivas aulas en bloques de 2 horas con puntualidad obligatoria.',
      time: 'Hoy, 08:00 AM',
      read: false,
      type: 'announcement',
      badge: 'Aviso Institucional',
    },
    {
      id: 2,
      title: 'Examen Programado',
      message: 'Primer Examen Parcial de Matemáticas el 15/11.',
      time: '15/11 · 08:00 AM',
      read: false,
      type: 'exam',
      badge: 'Examen',
    },
    {
      id: 3,
      title: 'Nueva Tarea Asignada',
      message: 'Resolver ejercicios en el cuaderno de Física.',
      time: 'Hace 15 min',
      read: false,
      type: 'assignment',
      badge: 'Tarea',
    },
    {
      id: 4,
      title: 'Recordatorio Académico',
      message: 'Presentar el cuaderno de trabajo en la sesión presencial de aula para revisión y calificación física.',
      time: 'Ayer',
      read: true,
      type: 'reminder',
      badge: 'Recordatorio',
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = async (id) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
      showNotification('Aviso marcado como revisado', 'success');
    } catch (error) {
      showNotification('No se pudo actualizar el aviso', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotification = async (id) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 250));
      const notificationToDelete = notifications.find(n => n.id === id);
      setNotifications(prev => prev.filter(notification => notification.id !== id));
      setDeletedNotification(notificationToDelete);
      showNotification('Aviso descartado', 'success');
    } catch (error) {
      showNotification('No se pudo eliminar el aviso', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const undoDelete = () => {
    if (deletedNotification) {
      setNotifications(prev => [deletedNotification, ...prev]);
      setDeletedNotification(null);
      showNotification('Aviso restaurado', 'success');
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      setNotifications(prev =>
        prev.map(n => (n.id === notification.id ? { ...n, read: true } : n))
      );
    }

    if (notification.type === 'assignment' || notification.type === 'reminder') {
      navigate(isTeacher ? '/teacher/assignments' : '/student/assignments');
      setIsOpen(false);
    } else if (notification.type === 'exam') {
      navigate(isTeacher ? '/teacher/exams' : '/student/exams');
      setIsOpen(false);
    } else {
      // Aviso institucional
      showNotification(notification.title, 'info');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <Megaphone size={17} />;
      case 'exam':
        return <FileText size={17} />;
      case 'assignment':
        return <ClipboardList size={17} />;
      default:
        return <Calendar size={17} />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'announcement':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'exam':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'assignment':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 cursor-pointer transition-colors bg-gradient-to-br from-[#10062B] to-[#4F0129] rounded-full flex items-center justify-center hover:opacity-90"
        title="Avisos institucionales y alertas"
        aria-label="Campana de avisos institucionales"
      >
        <Bell color="white" size={18} fill="white" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs"
            style={{ backgroundColor: RED }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-xl shadow-xl py-1 z-50 border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Cabecera institucional */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
            <div>
              <h3 className="text-sm font-bold text-gray-900 leading-tight">Avisos y Alertas Institucionales</h3>
              <p className="text-[11px] text-gray-500">Comunicaciones oficiales y eventos académicos</p>
            </div>
            {unreadCount > 0 && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: RED }}
              >
                {unreadCount} nuevo{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Listado de avisos */}
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
            {isLoading ? (
              <div className="flex justify-center items-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50/80 cursor-pointer transition-colors flex items-start gap-3 ${
                    !notification.read ? 'bg-red-50/20' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {/* Icono temático */}
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 mt-0.5 border ${getBadgeStyle(notification.type)}`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  {/* Contenido en español */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${getBadgeStyle(notification.type)}`}>
                        {notification.badge}
                      </span>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {notification.time}
                      </span>
                    </div>

                    <p className={`text-xs leading-snug ${!notification.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {notification.title}
                    </p>

                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {notification.message}
                    </p>

                    {notification.type !== 'announcement' && (
                      <span className="inline-block text-[10px] font-semibold text-red-700 mt-1 hover:underline">
                        {notification.type === 'exam' ? 'Ver Examen →' : 'Ver Tarea →'}
                      </span>
                    )}
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center space-x-1 flex-shrink-0 ml-1">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-green-600 transition-colors"
                        title="Marcar como revisado"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-red-600 transition-colors"
                      title="Descartar aviso"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-xs text-gray-400">
                No hay avisos ni alertas pendientes.
              </div>
            )}
          </div>

          {/* Pie del desplegable */}
          {notifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <button
                onClick={() => setNotifications([])}
                className="text-xs text-gray-500 hover:text-red-700 transition-colors font-medium"
              >
                Limpiar todos los avisos
              </button>
              <span className="text-[10px] text-gray-400 font-medium">
                Academia Apu
              </span>
            </div>
          )}

          {deletedNotification && (
            <div className="px-4 py-2 border-t border-gray-100 bg-amber-50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-800">Aviso descartado</span>
                <button
                  onClick={undoDelete}
                  className="text-red-700 font-semibold hover:underline"
                >
                  Deshacer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
