import React from 'react';
import Layout from '../../components/layouts/Layout';
import { Link } from 'react-router-dom';

const RED = '#C0392B';

// Asignaturas oficiales matriculadas para el Alumno (Frederick Rodas - Sección 3A)
const COURSES_LIST = [
  {
    id: 1,
    code: 'FIS301-APU-2026-II',
    name: 'FÍSICA',
    semester: '3.° Secundaria - Sección 3A',
    teacher: 'Prof. Jhon Wick',
    bgGradient: 'from-slate-700 via-blue-800 to-indigo-950',
  },
  {
    id: 2,
    code: 'LIT301-APU-2026-II',
    name: 'LITERATURA',
    semester: '3.° Secundaria - Sección 3A',
    teacher: 'Prof. César Vallejo',
    bgGradient: 'from-red-700 via-rose-800 to-slate-900',
  },
];

export const SubjectsList = () => {
  return (
    <Layout currentPage={'Courses List'}>
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Cabecera institucional limpia */}
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: RED }} />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Asignaturas</h1>
              <p className="text-xs text-gray-500">Cursos matriculados en el periodo académico vigente</p>
            </div>
          </div>
        </div>

        {/* Cuadrícula (Grid) de tarjetas independientes estilo UNAJMA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {COURSES_LIST.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              {/* Imagen de cabecera con diseño abstracto / color plano */}
              <div
                className={`h-32 w-full bg-gradient-to-br ${course.bgGradient} relative overflow-hidden flex items-end p-3`}
              >
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15%" cy="25%" r="45" fill="white" />
                  <circle cx="85%" cy="75%" r="65" fill="white" />
                  <path d="M-10,70 Q80,20 200,60 T400,30" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Contenido limpio de arriba hacia abajo */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  {/* Código del curso en letras pequeñas de color gris */}
                  <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mb-1.5">
                    {course.code}
                  </p>

                  {/* Nombre del Curso en azul institucional o negro con un enlace */}
                  <Link
                    to={`/student/courses/${course.id}`}
                    state={{
                      cours: {
                        id: course.id,
                        name: course.name,
                        code: course.code,
                        teacher: { name: course.teacher || 'Docente Titular' },
                      },
                    }}
                    className="text-base font-bold text-[#1E3A8A] hover:text-blue-700 hover:underline transition-colors leading-snug line-clamp-2 block"
                  >
                    {course.name}
                  </Link>
                </div>

                {/* Semestre o Grado en letras grises inferiores */}
                <p className="text-xs text-gray-400 mt-4">
                  {course.semester}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SubjectsList;
