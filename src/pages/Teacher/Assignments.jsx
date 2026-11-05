import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { Plus, Users, Edit3, Calendar, Folder, ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { CreateHybridAssignmentModal } from '../../components/teacher/CreateHybridAssignmentModal';
import { GradeAssignmentStudentsModal } from '../../components/teacher/GradeAssignmentStudentsModal';

const RED = '#C0392B';

const Assignments = () => {
  const { assignments } = useAcademic();

  // Estado de navegación jerárquica: null = Vista Inicial de Cursos, objeto = Vista Interna de Tareas
  const [selectedCourseCard, setSelectedCourseCard] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [gradingAssignment, setGradingAssignment] = useState(null);

  // Lista oficial de cursos y secciones del docente
  const teacherCourses = [
    {
      id: 1,
      courseName: 'Física',
      className: '3A',
      level: '3.° Secundaria',
      room: 'Aula 201',
      schedule: 'Lunes y Miércoles · 08:00 – 10:00 AM',
    },
    {
      id: 2,
      courseName: 'Matemáticas',
      className: '2B',
      level: '2.° Secundaria',
      room: 'Aula 104',
      schedule: 'Martes y Jueves · 10:00 AM – 12:00 PM',
    },
    {
      id: 3,
      courseName: 'Literatura',
      className: '3A',
      level: '3.° Secundaria',
      room: 'Aula 102',
      schedule: 'Martes y Jueves · 08:00 – 10:00 AM',
    },
  ];

  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsCreateModalOpen(true);
  };

  // Tareas filtradas para el curso actualmente seleccionado
  const currentCourseAssignments = selectedCourseCard
    ? (assignments || []).filter(
        a => a.courseName === selectedCourseCard.courseName && a.className === selectedCourseCard.className
      )
    : [];

  return (
    <Layout search={false} currentPage="Assignments">
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera institucional limpia */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 rounded-none" style={{ backgroundColor: RED }} />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  Gestión de Tareas
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedCourseCard
                    ? `Actividades presenciales · ${selectedCourseCard.courseName} (Clase ${selectedCourseCard.className})`
                    : 'Selecciona una asignatura oficial para consultar y gestionar sus actividades'}
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 px-4 py-2 rounded-none text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-none uppercase tracking-wider"
              style={{ backgroundColor: RED }}
            >
              <Plus size={16} />
              + Crear Nueva Tarea
            </button>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto space-y-5">
          {/* ============================================================ */}
          {/* VISTA 1: VISTA INICIAL (CURSOS A CARGO DEL DOCENTE)           */}
          {/* ============================================================ */}
          {!selectedCourseCard ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Cursos a cargo · Periodo Académico 2026-I
                </span>
                <span className="text-xs font-semibold text-gray-400">
                  {teacherCourses.length} secciones registradas
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {teacherCourses.map((c) => {
                  const count = (assignments || []).filter(
                    a => a.courseName === c.courseName && a.className === c.className
                  ).length;

                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCourseCard(c)}
                      className="bg-white border border-gray-300 rounded-none shadow-none flex flex-col justify-between hover:border-gray-500 hover:shadow-sm cursor-pointer transition-all group"
                    >
                      <div>
                        {/* Cabecera rectangular sólida en Rojo Institucional */}
                        <div
                          className="px-5 py-3.5 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-between"
                          style={{ backgroundColor: RED }}
                        >
                          <div className="flex items-center gap-2">
                            <Folder size={18} />
                            <span>{c.courseName} – Clase {c.className}</span>
                          </div>
                          <span className="text-[11px] bg-black/20 px-2 py-0.5 rounded-none font-normal">
                            {c.level}
                          </span>
                        </div>

                        {/* Contenido de la tarjeta de curso */}
                        <div className="p-5 space-y-3 text-xs text-gray-700">
                          <div className="space-y-1">
                            <p className="text-gray-500">
                              Ubicación: <strong className="text-gray-800">{c.room}</strong>
                            </p>
                            <p className="text-gray-500">
                              Horario: <span className="text-gray-800">{c.schedule}</span>
                            </p>
                          </div>

                          <div className="p-3 bg-gray-50 border border-gray-200 rounded-none flex items-center justify-between">
                            <span className="text-gray-600 font-medium">Actividades asignadas:</span>
                            <span className="font-bold text-gray-900 bg-white border border-gray-300 px-2.5 py-0.5">
                              {count} {count === 1 ? 'tarea' : 'tareas'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Botón de acceso a la subcarpeta */}
                      <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs font-bold text-red-700 uppercase tracking-wider">
                        <span>Ver Tareas del Curso</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ============================================================ */
            /* VISTA 2: VISTA INTERNA (ACTIVIDADES DE LA ASIGNATURA)        */
            /* ============================================================ */
            <div className="space-y-4">
              {/* Barra superior de navegación interna con botón de retorno */}
              <div className="bg-white p-3.5 border border-gray-300 rounded-none flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCourseCard(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-800 hover:text-red-700 transition-colors uppercase tracking-wider group"
                  title="Regresar a la cuadrícula de cursos"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  <span>← Volver a Cursos</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-none">
                    {selectedCourseCard.courseName} – Clase {selectedCourseCard.className}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    ({currentCourseAssignments.length} {currentCourseAssignments.length === 1 ? 'actividad' : 'actividades'})
                  </span>
                </div>
              </div>

              {/* Listado de Tarjetas de Tareas del Curso */}
              {currentCourseAssignments.length === 0 ? (
                <div className="bg-white p-12 rounded-none border border-gray-300 text-center space-y-3">
                  <p className="text-gray-500 text-sm">
                    No hay tareas registradas actualmente para <strong>{selectedCourseCard.courseName} (Clase {selectedCourseCard.className})</strong>.
                  </p>
                  <button
                    onClick={handleOpenCreateModal}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white uppercase tracking-wider rounded-none"
                    style={{ backgroundColor: RED }}
                  >
                    <Plus size={14} /> + Crear Primera Tarea
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCourseAssignments.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white border border-gray-300 rounded-none shadow-none flex flex-col justify-between hover:border-gray-400 transition-colors"
                    >
                      <div>
                        {/* Cabecera rectangular sólida con Materia y Sección */}
                        <div
                          className="px-4 py-2.5 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between"
                          style={{ backgroundColor: RED }}
                        >
                          <span>{task.courseName} – Clase {task.className}</span>
                          <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-none font-normal">
                            Actividad #{task.id}
                          </span>
                        </div>

                        <div className="p-4 space-y-3">
                          {/* Título de la actividad destacado */}
                          <h3 className="text-base font-bold text-gray-800 leading-snug">
                            {task.title}
                          </h3>

                          {/* Fecha o Plazo */}
                          {(task.deadline || task.dueDate) && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                              <Calendar size={13} className="text-red-700" />
                              <span>Entrega: {task.deadline || task.dueDate}</span>
                            </div>
                          )}

                          {/* Indicación compacta de la tarea en texto truncado */}
                          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed bg-gray-50 p-2.5 border border-gray-200 rounded-none">
                            Las tareas se desarrollan en el cuaderno de trabajo y se presentan físicamente en clase.
                          </p>
                        </div>
                      </div>

                      {/* Acciones Rápidas Inferiores con dos botones rectos y minimalistas */}
                      <div className="p-3 border-t border-gray-200 bg-gray-50/70 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGradingAssignment(task)}
                          className="px-2.5 py-2 text-xs font-bold text-white uppercase tracking-wider rounded-none transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5"
                          style={{ backgroundColor: RED }}
                          title="Revisar entregas recibidas del aula"
                        >
                          <Users size={14} />
                          <span>Ver Entregas</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(task)}
                          className="px-2.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-none transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider"
                          title="Modificar parámetros de la tarea"
                        >
                          <Edit3 size={14} />
                          <span>Editar Tarea</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal para Crear / Editar Tarea */}
      <CreateHybridAssignmentModal
        isOpen={isCreateModalOpen}
        taskToEdit={taskToEdit}
        defaultCourse={selectedCourseCard}
        onClose={() => {
          setIsCreateModalOpen(false);
          setTaskToEdit(null);
        }}
      />

      {/* Modal para revisar el estado general del aula */}
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
