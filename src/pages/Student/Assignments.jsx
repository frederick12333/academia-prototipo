import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { Calendar, Download, ClipboardList, Info, CheckCircle2, Clock } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockData';

const RED = '#C0392B';

const Assignments = () => {
  const { assignments } = useAcademic();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCourse, setSelectedCourse] = useState('All');

  const studentCourses = (courses || []).filter(c => c && c.students?.some(s => s && s.id === user?.id));
  const studentCourseNames = studentCourses.map(c => c.name);

  const now = new Date();

  const studentAssignments = (assignments || []).filter(task => {
    if (!task) return false;
    const isEnrolled = studentCourseNames.includes(task.courseName);
    const matchesCourse = selectedCourse === 'All' || task.courseName === selectedCourse;

    const deadline = new Date(task.deadline);
    const isPrevious = deadline < now;
    const isUpcoming = deadline >= now;

    return isEnrolled && matchesCourse && (activeTab === 'previous' ? isPrevious : isUpcoming);
  });

  const handleDownloadFile = (task) => {
    const content = `ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS\n` +
      `GUÍA DE TRABAJO Y EJERCICIOS PARA REVISIÓN FÍSICA\n\n` +
      `Curso: ${task.courseName}\n` +
      `Tarea: ${task.title}\n` +
      `Clase: ${task.className}\n` +
      `Fecha Límite de Revisión Física: ${task.deadline}\n\n` +
      `PAUTAS E INDICACIONES DEL DOCENTE:\n${task.instructions}\n\n` +
      `[Descarga lista para imprimir o trabajar en tu cuaderno cuadriculado]`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = task.fileName || `Tarea_${task.title}.pdf`;
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: RED }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Academia Apu San Antonio de Andahuaylas
                </p>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Guías de Tareas y Revisión Física de Cuadernos
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">
              <Info size={16} className="text-red-700 flex-shrink-0" />
              <span>Las tareas se desarrollan en el cuaderno de trabajo y se presentan físicamente en clase.</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5 max-w-7xl mx-auto">
          {/* Barra de Filtros y Pestañas */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Tareas Vigentes
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'previous'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Tareas Pasadas
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500">Filtrar curso:</span>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                <option value="All">Todas mis asignaturas</option>
                {studentCourses.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Listado de Tareas */}
          {studentAssignments.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-400">
              No tienes tareas pendientes para este filtro.
            </div>
          ) : (
            <div className="space-y-4">
              {studentAssignments.map(task => {
                const studentScore = task.grades?.[user?.id];
                const hasScore = studentScore !== undefined && studentScore !== null;
                const isPassed = hasScore && Number(studentScore) >= 10.5;

                return (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1.5"
                      style={{ backgroundColor: RED }}
                    />

                    <div className="pl-2">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                              {task.courseName}
                            </span>
                            <span className="text-xs text-gray-400">
                              Clase {task.className}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                        </div>

                        {/* Estado o calificación en base 20 */}
                        {hasScore ? (
                          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                            <span className="text-xs font-semibold text-gray-500">Nota de cuaderno:</span>
                            <span
                              className={`text-base font-bold ${
                                isPassed ? 'text-green-700' : 'text-red-700'
                              }`}
                            >
                              {Number(studentScore).toFixed(1)} / 20
                            </span>
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isPassed ? 'Aprobado' : 'Desaprobado'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-yellow-50 text-yellow-800 border border-yellow-200 px-2.5 py-1 rounded-md text-xs font-semibold">
                            <Clock size={14} />
                            <span>Pendiente de revisión física en clase</span>
                          </div>
                        )}
                      </div>

                      {/* Fecha de revisión */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 my-2.5">
                        <Calendar size={15} style={{ color: RED }} />
                        <span className="font-bold text-gray-800">Fecha Límite de Revisión en Aula:</span>
                        <span>{task.deadline?.replace('T', ' ')}</span>
                      </div>

                      {/* Indicaciones detalladas de revisión física */}
                      <div className="p-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 my-3">
                        <p className="font-bold uppercase tracking-wider text-gray-500 mb-1 text-[11px]">
                          Indicaciones para el Cuaderno de Trabajo:
                        </p>
                        <p className="leading-relaxed">
                          {task.instructions}
                        </p>
                      </div>

                      {/* Botón de descarga de material adjunto */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-400">
                          {task.fileSize && <span>Tamaño: {task.fileSize} • </span>}
                          Material adjunto para descargar e imprimir
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDownloadFile(task)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-black rounded-lg text-xs font-semibold transition-colors shadow-sm"
                        >
                          <Download size={14} />
                          Descargar Separata / Ficha ({task.fileName})
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;
