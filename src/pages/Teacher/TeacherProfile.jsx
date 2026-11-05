import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import ProfileHeader from '../../components/teacher/ProfileHeader';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, ShieldCheck } from 'lucide-react';

const RED = '#C0392B';

const TeacherProfile = () => {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const user = location.state?.teacher || authUser;

  // Lista plana de materias y secciones oficiales asignadas al docente Jhon Wick
  const officialTeacherCourses = [
    {
      id: 1,
      course: 'Matemáticas',
      code: 'MAT-201',
      section: '2B',
      level: '2.° Secundaria',
      room: 'Aula 104',
      schedule: 'Martes y Jueves · 10:00 AM – 12:00 PM',
      status: 'Activo',
    },
    {
      id: 2,
      course: 'Física',
      code: 'FIS-301',
      section: '3A',
      level: '3.° Secundaria',
      room: 'Aula 201',
      schedule: 'Lunes y Miércoles · 08:00 AM – 10:00 AM',
      status: 'Activo',
    },
  ];

  return (
    <Layout currentPage={'UserProfile'}>
      <div className="w-full px-6 sm:px-12 py-4">
        {/* Cabecera oficial con foto, identificación personal y correo institucional */}
        <ProfileHeader user={user} />

        {/* Lista Plana de Materias y Secciones Oficiales a Cargo */}
        <div className="mt-6 bg-white border border-gray-300 rounded-none overflow-hidden shadow-none">
          <div className="px-5 py-3.5 border-b border-gray-300 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-5 rounded-none flex-shrink-0" style={{ backgroundColor: RED }} />
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-gray-700" />
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Materias y Secciones Oficiales a Cargo
                </h2>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-green-700" />
              Carga Lectiva Acreditada · Periodo 2026-I
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: RED }} className="text-white border-b border-red-800">
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs">
                    Asignatura
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                    Código
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60 text-center">
                    Sección
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                    Nivel Académico
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                    Aula Asignada
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                    Horario Semanal
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60 text-center">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {officialTeacherCourses.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-200 transition-colors hover:bg-gray-100/60 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {/* Asignatura */}
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {item.course}
                    </td>

                    {/* Código */}
                    <td className="py-3 px-4 font-mono text-xs text-gray-600 border-l border-gray-200">
                      {item.code}
                    </td>

                    {/* Sección */}
                    <td className="py-3 px-4 text-center border-l border-gray-200">
                      <span className="inline-block px-2.5 py-0.5 rounded-none text-xs font-bold bg-gray-100 border border-gray-300 text-gray-800">
                        {item.section}
                      </span>
                    </td>

                    {/* Nivel Académico */}
                    <td className="py-3 px-4 text-gray-700 border-l border-gray-200 text-xs">
                      {item.level}
                    </td>

                    {/* Aula */}
                    <td className="py-3 px-4 text-gray-800 border-l border-gray-200 text-xs font-medium">
                      {item.room}
                    </td>

                    {/* Horario */}
                    <td className="py-3 px-4 text-gray-700 border-l border-gray-200 text-xs">
                      {item.schedule}
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-4 text-center border-l border-gray-200">
                      <span className="inline-block px-2.5 py-0.5 rounded-none text-xs font-bold bg-green-50 text-green-700 border border-green-300">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherProfile;
