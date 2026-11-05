import React, { useRef, useEffect, useState } from "react";
import Sidebar from '../shared/Sidebar';
import TopNavbar from '../shared/TopNavbar';
import { useLocation } from "react-router-dom";
import Documentation from '../shared/Documentation';
import { Book } from 'lucide-react';

const Layout = ({ children, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const mainRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden bg-[#f3f4f6]">
      {/* Columna Izquierda: Menú de Módulos (Sidebar dinámico con Logotipo en esquina 0,0) */}
      <Sidebar 
        currentPage={currentPage} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Columna Derecha: Barra de Perfil Gris Superior + Contenedor Dinámico Principal */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#f3f4f6]">
        {/* Barra superior fija continua (h-16 con borde inferior alineado al del logo) */}
        <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Área dinámica con scroll independiente */}
        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto px-3 sm:px-5 lg:px-6 pt-2 pb-6 bg-[#f3f4f6]"
        >
          {children}
        </main>
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
