import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import { Search, Plus, Calendar, Clock, MapPin, Award, Filter, BookOpen } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { courses } from '../../data/mockData';
import { CreatePhysicalExamModal } from '../../components/teacher/CreatePhysicalExamModal';

const RED = '#C0392B';

export const Exams = () => {
  const navigate = useNavigate();
  const { exams } = useAcademic();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'previous'

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Lista única de clases de los cursos
  const allClasses = [...new Set(courses.flatMap(c => c.classes || []))];

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const filteredExams = (exams || []).filter(exam => {
    if (!exam) return false;
    const matchesSearch =
      (exam.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (exam.courseName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (exam.location || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse === 'All' || exam.courseName === selectedCourse;
    const matchesClass = selectedClass === 'All' || exam.className === selectedClass;

    const examDate = new Date(exam.date);
    const isPrevious = examDate < todayStart;
    const isUpcoming = examDate >= todayStart;

    return matchesSearch && matchesCourse && matchesClass &&
      (activeTab === 'previous' ? isPrevious : isUpcoming);
  });

  const handleRedirectToGrades = (exam) => {
    navigate('/teacher/grades', {
      state: {
        selectedCourse: exam.courseName,
        selectedClass: exam.className,
      },
    });
  };

  return (
    <Layout currentPage="Exams">
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera limpia institucional */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 rounded-none" style={{ backgroundColor: RED }} />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  Cronograma y Repositorio de Exámenes
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Organizador oficial de fechas y evaluaciones presenciales · Academia Apu San Antonio
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-none text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-none"
              style={{ backgroundColor: RED }}
            >
              <Plus size={16} />
              + Programar Evaluación Física
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4 max-w-7xl mx-auto">
          {/* Barra de Filtros, Búsqueda y Pestañas Corporativas */}
          <div className="bg-white p-3.5 border border-gray-300 rounded-none shadow-none flex flex-wrap items-center justify-between gap-3">
            {/* Pestañas: Próximas / Pasadas */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1.5 text-xs font-bold rounded-none border transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Próximas Evaluaciones
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`px-3 py-1.5 text-xs font-bold rounded-none border transition-colors ${
                  activeTab === 'previous'
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Evaluaciones Realizadas
              </button>
            </div>

            {/* Filtros de Búsqueda, Curso y Clase */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="text"
                  placeholder="Buscar evaluación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-none focus:outline-none focus:border-red-600 bg-white text-gray-800"
                />
              </div>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-none bg-white text-gray-700 focus:outline-none focus:border-red-600"
              >
                <option value="All">Todos los cursos</option>
                {courses.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-none bg-white text-gray-700 focus:outline-none focus:border-red-600"
              >
                <option value="All">Todas las secciones</option>
                {allClasses.map(cls => (
                  <option key={cls} value={cls}>Sección {cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Listado de Tarjetas de Evaluación sin texto redundante ni adjuntos */}
          {filteredExams.length === 0 ? (
            <div className="bg-white p-12 rounded-none border border-gray-300 text-center text-gray-400">
              No hay evaluaciones programadas para los filtros seleccionados.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExams.map(exam => (
                <div
                  key={exam.id}
                  className="bg-white border border-gray-300 rounded-none p-5 shadow-none flex flex-col justify-between hover:border-gray-400 transition-colors"
                >
                  <div>
                    {/* Cabecera de la tarjeta */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-none text-white uppercase tracking-wider"
                          style={{ backgroundColor: RED }}
                        >
                          {exam.title}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-none bg-gray-100 text-gray-800 border border-gray-300">
                          Sección {exam.className}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 mt-2 mb-1">
                      {exam.courseName}
                    </h3>

                    {/* Datos esenciales: fecha, horario, aula */}
                    <div className="space-y-1.5 my-3 text-xs text-gray-700 bg-gray-50 p-3 rounded-none border border-gray-200">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-red-700 flex-shrink-0" />
                        <span className="font-semibold text-gray-900">{exam.date}</span>
                        <span className="text-gray-300">•</span>
                        <Clock size={14} className="text-red-700 flex-shrink-0" />
                        <span>{exam.time} ({exam.duration || 90} min)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-red-700 flex-shrink-0" />
                        <span>{exam.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botón Inteligente de Redirección Directa al Módulo de Notas */}
                  <div className="pt-3 border-t border-gray-200 mt-2">
                    <button
                      type="button"
                      onClick={() => handleRedirectToGrades(exam)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-none text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-none uppercase tracking-wider"
                      style={{ backgroundColor: RED }}
                      title={`Ir al registro de notas oficial de ${exam.courseName} (${exam.className})`}
                    >
                      <Award size={15} />
                      Calificar Alumnos (0–20)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal para programar nueva evaluación física (Repositorio de fechas) */}
      <CreatePhysicalExamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Layout>
  );
};

export default Exams;
