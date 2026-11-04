import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { Search, Plus, Calendar, Clock, MapPin, Download, Award, FileText, Filter } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { courses } from '../../data/mockData';
import { CreatePhysicalExamModal } from '../../components/teacher/CreatePhysicalExamModal';
import { GradeExamStudentsModal } from '../../components/teacher/GradeExamStudentsModal';

const RED = '#C0392B';

export const Exams = () => {
  const { exams } = useAcademic();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'previous'

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [gradingExam, setGradingExam] = useState(null);

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

  const handleDownloadFile = (exam, e) => {
    e.stopPropagation();
    const blob = new Blob([
      `EVALUACIÓN FÍSICA OFICIAL - ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS\n` +
      `Asignatura: ${exam.courseName}\n` +
      `Evaluación: ${exam.title}\n` +
      `Clase: ${exam.className}\n` +
      `Fecha: ${exam.date} | Horario: ${exam.time}\n` +
      `Aula / Ubicación: ${exam.location}\n\n` +
      `INDICACIONES:\n${exam.instructions || 'Sin indicaciones adicionales'}\n\n` +
      `[Cuadernillo de preguntas y respuestas para impresión física]`
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exam.fileName || `Examen_${exam.title}_${exam.courseName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout currentPage="Exams">
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera institucional */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: RED }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Academia Apu San Antonio de Andahuaylas
                </p>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Programación y Calificación de Evaluaciones Físicas
                </h1>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-sm"
              style={{ backgroundColor: RED }}
            >
              <Plus size={16} />
              + Programar Evaluación Física
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4 max-w-7xl mx-auto">
          {/* Barra de Filtros, Búsqueda y Pestañas */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            {/* Pestañas: Próximas / Pasadas */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Próximas Evaluaciones
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'previous'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Evaluaciones Realizadas
              </button>
            </div>

            {/* Filtros de Curso y Clase */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="text"
                  placeholder="Buscar evaluación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
                />
              </div>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <option value="All">Todos los cursos</option>
                {courses.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <option value="All">Todas las clases</option>
                {allClasses.map(cls => (
                  <option key={cls} value={cls}>Clase {cls}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Listado de Evaluaciones Físicas */}
          {filteredExams.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-400">
              No hay evaluaciones programadas para este filtro.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExams.map(exam => {
                const gradedCount = Object.keys(exam.grades || {}).length;

                return (
                  <div
                    key={exam.id}
                    onClick={() => setGradingExam(exam)}
                    className="bg-white border border-gray-200 hover:border-red-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Cabecera de la tarjeta */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded text-white"
                              style={{ backgroundColor: RED }}
                            >
                              {exam.title}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                              Clase {exam.className}
                            </span>
                          </div>
                          <h3 className="font-bold text-base text-gray-900 mt-1.5">{exam.courseName}</h3>
                        </div>
                      </div>

                      {/* Detalles físicos: fecha, horario, aula */}
                      <div className="space-y-1.5 my-3 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-red-700 flex-shrink-0" />
                          <span className="font-medium text-gray-800">{exam.date}</span>
                          <span className="text-gray-300">•</span>
                          <Clock size={14} className="text-red-700 flex-shrink-0" />
                          <span>{exam.time} ({exam.duration || 90} min)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-red-700 flex-shrink-0" />
                          <span>{exam.location}</span>
                        </div>
                      </div>

                      {/* Indicaciones para el alumno */}
                      {exam.instructions && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          <strong>Pautas:</strong> {exam.instructions}
                        </p>
                      )}
                    </div>

                    {/* Footer de tarjeta: archivo adjunto y botón de calificación */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      {/* Botón de descarga de archivo impreso */}
                      <button
                        type="button"
                        onClick={(e) => handleDownloadFile(exam, e)}
                        className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black py-1 px-2.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Descargar para impresión física"
                      >
                        <Download size={14} style={{ color: RED }} />
                        <span className="truncate max-w-[130px]">{exam.fileName || 'Ficha Examen.pdf'}</span>
                      </button>

                      {/* Botón para abrir modal de calificaciones en base 20 */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGradingExam(exam);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90 shadow-sm"
                        style={{ backgroundColor: RED }}
                      >
                        <Award size={14} />
                        Calificar Alumnos (0–20)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal para programar nueva evaluación física */}
      <CreatePhysicalExamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Modal para ingresar calificaciones en base 20 */}
      {gradingExam && (
        <GradeExamStudentsModal
          isOpen={true}
          exam={gradingExam}
          onClose={() => setGradingExam(null)}
        />
      )}
    </Layout>
  );
};

export default Exams;
