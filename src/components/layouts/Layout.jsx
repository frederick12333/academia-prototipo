import React, { useRef, useEffect, useState } from "react";
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../shared/Sidebar';
import TopNavbar from '../shared/TopNavbar';
import { useLocation, useNavigate } from "react-router-dom";
import Documentation from '../shared/Documentation';
import { Book, Menu } from 'lucide-react';

const Layout = ({ children, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const { user } = useAuth();
  const mainRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const handleLogoClick = () => {
    if (user?.role === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden bg-[#f3f4f6]">
      {/* ─── Capa Superior: Barra Horizontal Fija (100% ancho) ─── */}
      <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0 z-30">
        {/* Contenedor del Logotipo a la izquierda (alineado de lado a lado con el ancho del menú inferior w-64) */}
        <div className="w-64 h-full flex items-center justify-between px-3 lg:px-4 border-r border-gray-200 flex-shrink-0 bg-white">
          <div
            onClick={handleLogoClick}
            className="w-full h-full flex items-center justify-center cursor-pointer py-1.5"
            title="Ir al panel de inicio"
          >
            <img
              src="/image/imagenacademia.png"
              alt="Academia Apu San Antonio de Andahuaylas"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Botón hamburguesa para dispositivos móviles */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ml-2"
            title="Abrir menú"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Franja horizontal superior continua blanca */}
        <div className="flex-1 h-full bg-white flex items-center justify-end px-6">
          {/* Barra superior delgada y limpia */}
        </div>
      </header>

      {/* ─── Capa Inferior: Dos Columnas (Flexbox) ─── */}
      <div className="w-full flex-1 flex flex-row overflow-hidden">
        {/* Columna Izquierda: Menú de Módulos (Sidebar) */}
        <Sidebar 
          currentPage={currentPage} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Columna Derecha: Contenedor de Contenido y Perfil */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f3f4f6]">
          {/* Sub-barra fija superior derecha (Campana de notificaciones, Nombre, Rol y Avatar) */}
          <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Área dinámica con scroll independiente */}
          <main 
            ref={mainRef}
            className="flex-1 overflow-y-auto px-3 sm:px-5 lg:px-6 pt-2 pb-6 bg-[#f3f4f6]"
          >
            {children}
          </main>
        </div>
      </div>

      {/* Botón flotante institucional de Documentación */}
      <button
        onClick={() => setIsDocumentationOpen(true)}
        className="fixed bottom-4 right-4 bg-red-700 text-white p-3 rounded-full shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors z-30"
        aria-label="Abrir documentación"
        title="Documentación del sistema"
      >
        <Book size={22} />
      </button>

      {/* Modal de Documentación */}
      <Documentation 
        isOpen={isDocumentationOpen} 
        onClose={() => setIsDocumentationOpen(false)} 
      />
    </div>
  );
};

export default Layout;
