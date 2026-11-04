import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { Calendar, Clock, MapPin, Download, FileText, Info, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockData';

const RED = '#C0392B';

export const Exams = () => {
  const { exams } = useAcademic();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Filtrar cursos del estudiante
  const studentCourses = courses.filter(c => c.students?.some(s => s.id === user?.id));
  const studentCourseNames = studentCourses.map(c => c.name);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Filtrar exámenes relevantes para el estudiante (cursos donde está matriculado)
  const studentExams = (exams || []).filter(exam => {
    if (!exam) return false;
    const isEnrolled = studentCourseNames.includes(exam.courseName);
    const matchesClass = !exam.className || exam.className === user?.class || user?.role === 'admin' || true;
    const matchesCourse = selectedCourse === 'All' || exam.courseName === selectedCourse;

    const examDate = new Date(exam.date);
    const isPrevious = examDate < todayStart;
    const isUpcoming = examDate >= todayStart;

    return isEnrolled && matchesCourse && (activeTab === 'previous' ? isPrevious : isUpcoming);
  });

  const handleDownloadAttachment = (exam) => {
    const content = `ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS\n` +
      `FICHA OFICIAL DE EVALUACIÓN FÍSICA\n\n` +
      `Curso: ${exam.courseName}\n` +
      `Evaluación: ${exam.title}\n` +
      `Clase: ${exam.className}\n` +
      `Fecha: ${exam.date} | Horario: ${exam.time}\n` +
      `Lugar: ${exam.location}\n\n` +
      `INDICACIONES DEL DOCENTE:\n${exam.instructions || 'Presentarse puntualmente con lápiz 2B y carné estudiantil.'}\n\n` +
      `[Descarga lista para imprimir o resolver como práctica]`;

    const blob = new Blob([content], { type: 'text/plain' });
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: RED }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Academia Apu San Antonio de Andahuaylas
                </p>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Tablero Informativo de Evaluaciones Físicas
                </h1>
              </div>
            </div>

            {/* Aviso informativo de evaluaciones presenciales */}
            <div className="flex items-center gap-2 bg-red-50 text-red-800 border border-red-200 px-3 py-1.5 rounded-lg text-xs font-medium">
              <Info size={16} className="text-red-700 flex-shrink-0" />
              <span>Todas las evaluaciones se rinden de forma física y presencial en las aulas de la academia.</span>
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
                Próximas Evaluaciones
              </button>
              <button
                onClick={() => setActiveTab('previous')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeTab === 'previous'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Evaluaciones Realizadas
              </button>
            </div>

            {/* Filtro por Asignatura */}
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

          {/* Cartelera tipo Foro de Evaluaciones Físicas */}
          {studentExams.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-400">
              No tienes evaluaciones programadas en este momento.
            </div>
          ) : (
            <div className="space-y-4">
              {studentExams.map(exam => {
                const studentScore = exam.grades?.[user?.id];
                const hasScore = studentScore !== undefined && studentScore !== null;
                const isPassed = hasScore && Number(studentScore) >= 10.5;

                return (
                  <div
                    key={exam.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Línea lateral roja institucional */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1.5"
                      style={{ backgroundColor: RED }}
                    />

                    <div className="pl-2">
                      {/* Cabecera del aviso de examen */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-bold px-2.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: RED }}
                            >
                              {exam.title}
                            </span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                              {exam.courseName}
                            </span>
                            <span className="text-xs text-gray-400">
                              Clase {exam.className}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mt-1">
                            Evaluación Presencial: {exam.courseName}
                          </h3>
                        </div>

                        {/* Si la evaluación ya fue rendida, muestra la nota vigesimal */}
                        {hasScore ? (
                          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                            <span className="text-xs font-semibold text-gray-500">Tu calificación:</span>
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
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                            Pendiente de calificación
                          </span>
                        )}
                      </div>

                      {/* Datos de convocatoria física: Fecha, horario, aula */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar size={15} style={{ color: RED }} />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400">Fecha de Examen</p>
                            <p className="font-semibold text-gray-900">{exam.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock size={15} style={{ color: RED }} />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400">Horario de Ingreso</p>
                            <p className="font-semibold text-gray-900">{exam.time} ({exam.duration || 90} min)</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={15} style={{ color: RED }} />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-gray-400">Lugar / Aula Asignada</p>
                            <p className="font-semibold text-gray-900">{exam.location}</p>
                          </div>
                        </div>
                      </div>

                      {/* Comunicado / Indicaciones del docente (tipo foro) */}
                      {exam.instructions && (
                        <div className="p-3 bg-white border border-gray-200 rounded-lg mb-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Pautas e Indicaciones Oficiales del Docente:
                          </p>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            {exam.instructions}
                          </p>
                        </div>
                      )}

                      {/* Botón para descargar archivo de examen físico */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xs text-gray-400">
                          {exam.fileSize && <span>Tamaño: {exam.fileSize} • </span>}
                          <span>Formato para descarga e impresión física</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownloadAttachment(exam)}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-black rounded-lg text-xs font-semibold transition-colors shadow-sm"
                        >
                          <Download size={14} />
                          Descargar Balotario / Ficha ({exam.fileName})
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

export default Exams;
