import React from 'react';
import Layout from '../../components/layouts/Layout';
import { courses } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { useAcademic } from '../../contexts/AcademicContext';
import { Award, BookOpen, User, CheckCircle2, XCircle } from 'lucide-react';

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
        {/* Encabezado institucional */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: RED }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Academia Apu San Antonio de Andahuaylas
                </p>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  Boleta de Calificaciones del Alumno (Escala Vigesimal 0 – 20)
                </h1>
              </div>
            </div>

            {/* Datos del estudiante */}
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <User size={16} style={{ color: RED }} />
              <div className="text-xs">
                <span className="font-bold text-gray-800">{user?.name}</span>
                <span className="text-gray-400 ml-2">| Clase: {user?.class || '3A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listado de Cursos y Tablas Académicas */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {studentCourses.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-400">
              No tienes asignaturas registradas actualmente.
            </div>
          ) : (
            studentCourses.map(course => {
              const { average, status } = calculateStudentCourseAverage(user?.id, course.name);
              const studentCourseGrades = gradesMatrix[user?.id]?.[course.name] || {};

              return (
                <div
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  {/* Barra de cabecera de la materia */}
                  <div
                    className="px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-white"
                    style={{ backgroundColor: RED }}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} />
                      <h2 className="font-bold text-base tracking-wide">{course.name}</h2>
                      <span className="text-xs text-red-100 bg-black/20 px-2 py-0.5 rounded ml-2">
                        Código: {course.code}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-red-100">
                        Docente: {course.teacher?.name || 'Profesor Titular'}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          status === 'Aprobado'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Tabla con estructura académica limpia */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-200 text-gray-700">
                          <th className="text-left py-2.5 px-6 text-xs font-bold uppercase tracking-wider w-1/2">
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

                      <tbody className="divide-y divide-gray-100">
                        {evaluationColumns.map((col, idx) => {
                          const score = studentCourseGrades[col.id];
                          const hasScore = score !== undefined && score !== null && !isNaN(score);
                          const numScore = hasScore ? Number(score) : null;

                          return (
                            <tr
                              key={col.id}
                              className={`hover:bg-gray-50/80 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                              }`}
                            >
                              <td className="py-2.5 px-6 text-gray-800 font-medium">
                                {col.name}
                              </td>
                              <td className="py-2.5 px-4 text-center font-semibold text-gray-600">
                                {col.weight}%
                              </td>
                              <td className="py-2.5 px-4 text-center">
                                {numScore !== null ? (
                                  <span
                                    className={`font-bold text-sm ${
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

                        {/* Fila destacada de Promedio Ponderado Final */}
                        <tr className="bg-gray-900 text-white font-bold">
                          <td className="py-3 px-6 text-sm" colSpan={2}>
                            Promedio Ponderado Final
                          </td>
                          <td className="py-3 px-4 text-center text-base tracking-wide">
                            {average !== null ? (
                              <span
                                className={`px-3 py-1 rounded text-sm font-extrabold ${
                                  average >= 10.5 ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
                                }`}
                              >
                                {average.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">Pendiente</span>
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
