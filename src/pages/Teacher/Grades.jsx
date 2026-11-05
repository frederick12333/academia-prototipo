import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { courses } from '../../data/mockData';
import { GradesTableTeacher } from '../../components/teacher/GradesTableTeacher';
import { Search, Filter, BookOpen } from 'lucide-react';

const RED = '#C0392B';

const Grades = () => {
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState(location.state?.selectedCourse || 'All');
  const [selectedClass, setSelectedClass] = useState(location.state?.selectedClass || 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    if (selectedCourse && selectedCourse !== 'All') {
      const course = courses.find(c => c.name === selectedCourse);
      if (course) {
        const courseClasses = [...new Set(course.classes || [])];
        setAvailableClasses(['All', ...courseClasses]);
      } else {
        setAvailableClasses(['All']);
      }
    } else {
      const allUniqueClasses = [...new Set(courses.flatMap(course => course.classes || []))];
      setAvailableClasses(['All', ...allUniqueClasses]);
    }
  }, [selectedCourse]);

  return (
    <Layout currentPage="Grades">
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera limpia */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: RED }} />
            <h1 className="text-lg font-bold text-gray-900">
              Registro de Calificaciones
            </h1>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Barra de Filtros y Búsqueda (Estilo Plano Corporativo) */}
          <div className="bg-white p-4 rounded-none border border-gray-300 shadow-none flex flex-wrap items-center justify-between gap-3">
            {/* Buscador de alumnos */}
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar alumno por nombre o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-none focus:outline-none focus:ring-1 focus:ring-red-600 text-gray-700 bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Filtro Asignatura */}
              <div className="flex items-center gap-1.5">
                <BookOpen size={16} className="text-gray-400" />
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-300 rounded-none bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  <option value="All">Todas las asignaturas</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>

              {/* Filtro Clase */}
              <div className="flex items-center gap-1.5">
                <Filter size={16} className="text-gray-400" />
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 text-xs border border-gray-300 rounded-none bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-600"
                >
                  <option value="All">Todas las clases</option>
                  {availableClasses.filter(c => c !== 'All').map((className) => (
                    <option key={className} value={className}>Clase {className}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de Calificaciones con Edición y Ponderaciones */}
          <GradesTableTeacher
            selectedCourse={selectedCourse}
            selectedClass={selectedClass}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Grades;
