import React from 'react';
import Layout from '../../components/layouts/Layout';
import { courses } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { useAcademic } from '../../contexts/AcademicContext';
import { BookOpen } from 'lucide-react';

const RED = '#C0392B';

const Grades = () => {
  const { user } = useAuth();
  const { evaluationColumns, gradesMatrix, calculateStudentCourseAverage } = useAcademic();

  // Cursos en los que está matriculado el alumno
  const studentCourses = courses.filter(course =>
    course.students?.some(s => s.id === user?.id)
  );

  return (
    <Layout currentPage="Notas">
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera institucional limpia */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-none" style={{ backgroundColor: RED }} />
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">
              Boleta Oficial de Calificaciones
            </h1>
          </div>
        </div>

        {/* Listado de Cursos y Tablas Académicas (Estilo Corporativo Plano) */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {studentCourses.length === 0 ? (
            <div className="bg-white p-12 border border-gray-300 rounded-none text-center text-gray-500 font-medium">
              No tienes asignaturas registradas actualmente.
            </div>
          ) : (
            studentCourses.map(course => {
              const { average, status } = calculateStudentCourseAverage(user?.id, course.name);
              const studentCourseGrades = gradesMatrix[user?.id]?.[course.name] || {};

              return (
                <div
                  key={course.id}
                  className="bg-white border border-gray-300 rounded-none shadow-none overflow-hidden"
                >
                  {/* Bloque Sólido Rectangular de Encabezado (Rojo Institucional) */}
                  <div
                    className="px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-white rounded-none"
                    style={{ backgroundColor: RED }}
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen size={18} className="flex-shrink-0" />
                      <h2 className="font-bold text-base tracking-wide uppercase">{course.name}</h2>
                      <span className="text-xs text-red-100 bg-black/25 px-2 py-0.5 rounded-none font-medium ml-2 border border-white/20">
                        Código: {course.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-red-100">
                        Docente: {course.teacher?.name || 'Profesor Titular'}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-none uppercase tracking-wider ${
                          status === 'Aprobado'
                            ? 'bg-emerald-800 text-white'
                            : 'bg-black/40 text-red-100'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Tabla Plana Profesional con Evaluación Lineal Directa (Sin Unidades) */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border-b border-gray-200">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-300 text-gray-800">
                          <th className="text-left py-2.5 px-5 text-xs font-bold uppercase tracking-wider w-1/2">
                            Criterio / Evaluación
                          </th>
                          <th className="text-center py-2.5 px-4 text-xs font-bold uppercase tracking-wider w-1/4">
                            Ponderación (%)
                          </th>
                          <th className="text-center py-2.5 px-4 text-xs font-bold uppercase tracking-wider w-1/4">
                            Calificación (0 – 20)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {evaluationColumns.map((col, idx) => {
                          const score = studentCourseGrades[col.id];
                          const hasScore = score !== undefined && score !== null && !isNaN(score);
                          const numScore = hasScore ? Number(score) : null;

                          return (
                            <tr
                              key={col.id}
                              className={`border-b border-gray-200 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }`}
                            >
                              <td className="py-2.5 px-5 text-gray-900 font-medium">
                                {col.name}
                              </td>
                              <td className="py-2.5 px-4 text-center font-semibold text-gray-600">
                                {col.weight}%
                              </td>
                              <td className="py-2.5 px-4 text-center">
                                {numScore !== null ? (
                                  <span
                                    className={`font-black text-sm ${
                                      numScore >= 10.5 ? 'text-gray-900' : 'text-red-700'
                                    }`}
                                  >
                                    {numScore.toFixed(1)}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 font-normal">Sin calificar</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}

                        {/* Fila Rectangular Sólida de Promedio Ponderado Final */}
                        <tr className="bg-gray-900 text-white font-bold border-t-2 border-gray-400">
                          <td className="py-3 px-5 text-sm uppercase tracking-wider" colSpan={2}>
                            Promedio Ponderado Final
                          </td>
                          <td className="py-3 px-4 text-center text-base tracking-wide">
                            {average !== null ? (
                              <span
                                className={`px-3 py-1 rounded-none text-sm font-black ${
                                  average >= 10.5 ? 'bg-emerald-700 text-white' : 'bg-red-700 text-white'
                                }`}
                              >
                                {average.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm font-normal">Pendiente</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Grades;
