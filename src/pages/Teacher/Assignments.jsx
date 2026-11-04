import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { Search, Plus, Calendar, Download, Award, ClipboardCheck, Filter, BookOpen } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { courses } from '../../data/mockData';
import { CreateHybridAssignmentModal } from '../../components/teacher/CreateHybridAssignmentModal';
import { GradeAssignmentStudentsModal } from '../../components/teacher/GradeAssignmentStudentsModal';

const RED = '#C0392B';

const Assignments = () => {
  const { assignments } = useAcademic();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'previous'

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [gradingAssignment, setGradingAssignment] = useState(null);

  const allClasses = [...new Set(courses.flatMap(c => c.classes || []))];

  const now = new Date();

  const filteredAssignments = (assignments || []).filter(assignment => {
    if (!assignment) return false;
    const matchesSearch =
      (assignment.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (assignment.courseName || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse === 'All' || assignment.courseName === selectedCourse;
    const matchesClass = selectedClass === 'All' || assignment.className === selectedClass;

    const deadlineDate = new Date(assignment.deadline);
    const isPrevious = deadlineDate < now;
    const isUpcoming = deadlineDate >= now;

    return matchesSearch && matchesCourse && matchesClass &&
      (activeTab === 'previous' ? isPrevious : isUpcoming);
  });

  const handleDownloadFile = (assignment, e) => {
    e.stopPropagation();
    const blob = new Blob([
      `GUÍA DE TRABAJO - ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS\n` +
      `Curso: ${assignment.courseName}\n` +
      `Tarea: ${assignment.title}\n` +
      `Clase: ${assignment.className}\n` +
      `Fecha Límite: ${assignment.deadline}\n\n` +
      `PAUTAS:\n${assignment.instructions || 'Resolver en el cuaderno oficial de trabajo.'}\n`
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = assignment.fileName || `Guia_${assignment.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout search={false} currentPage="Assignments">
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
                  Gestión de Tareas y Revisión Física de Cuadernos
                </h1>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-sm"
              style={{ backgroundColor: RED }}
            >
              <Plus size={16} />
              + Crear Tarea Híbrida
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4 max-w-7xl mx-auto">
          {/* Barra de Filtros y Búsqueda */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            {/* Pestañas */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Tareas Vigentes
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'previous'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Tareas Vencidas / Pasadas
              </button>
            </div>

            {/* Buscador y selects */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="text"
                  placeholder="Buscar tarea..."
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

          {/* Listado de Tareas Híbridas */}
          {filteredAssignments.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-400">
              No hay tareas registradas para este filtro.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssignments.map(task => {
                return (
                  <div
                    key={task.id}
                    onClick={() => setGradingAssignment(task)}
                    className="bg-white border border-gray-200 hover:border-red-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                            Clase {task.className}
                          </span>
                          <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                            {task.courseName}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-base text-gray-900 mt-1">{task.title}</h3>

                      <div className="space-y-1 my-3 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-red-700 flex-shrink-0" />
                          <span className="font-semibold text-gray-800">Fecha Límite de Revisión Física:</span>
                          <span>{task.deadline?.replace('T', ' ')}</span>
                        </div>
                      </div>

                      {task.instructions && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          <strong>Indicaciones:</strong> {task.instructions}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleDownloadFile(task, e)}
                        className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black py-1 px-2.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Download size={14} style={{ color: RED }} />
                        <span className="truncate max-w-[130px]">{task.fileName || 'Ficha Tarea.pdf'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGradingAssignment(task);
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

      <CreateHybridAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {gradingAssignment && (
        <GradeAssignmentStudentsModal
          isOpen={true}
          assignment={gradingAssignment}
          onClose={() => setGradingAssignment(null)}
        />
      )}
    </Layout>
  );
};

export default Assignments;
