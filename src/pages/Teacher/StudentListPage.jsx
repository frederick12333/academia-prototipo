import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { Search, Users, Filter, BookOpen } from 'lucide-react';
import { courses, users } from '../../data/mockData';

const RED = '#C0392B';

export const StudentListPage = () => {
  const [selectedSection, setSelectedSection] = useState('All'); // 'All' | '3A' | '2B'
  const [searchTerm, setSearchTerm] = useState('');

  // Estudiantes reales del sistema pertenecientes a las secciones 3A y 2B
  const allStudents = users
    .filter(u => u.role === 'student' && (u.class === '3A' || u.class === '2B'))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(st => {
      // Determinar asignaturas según la sección académica
      const assignedCourses = courses
        .filter(c => c.classes?.includes(st.class))
        .map(c => c.name)
        .join(' · ');

      return {
        id: st.id,
        name: st.name,
        avatar: st.avatar,
        studentId: `S${120000 + st.id}`,
        section: st.class,
        courseName: assignedCourses || (st.class === '3A' ? 'Física' : 'Matemáticas'),
      };
    });

  // Filtro por sección y término de búsqueda
  const filteredStudents = allStudents.filter(student => {
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      student.name.toLowerCase().includes(term) ||
      student.studentId.toLowerCase().includes(term) ||
      student.courseName.toLowerCase().includes(term);

    return matchesSection && matchesSearch;
  });

  return (
    <Layout currentPage={'Students'}>
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera institucional limpia */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 rounded-none" style={{ backgroundColor: RED }} />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                  Lista de Clase Consultiva
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Consulta pedagógica oficial de estudiantes matriculados por aula · Academia Apu San Antonio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-none flex items-center gap-1.5">
                <Users size={14} className="text-red-700" />
                Modo Consulta (Solo Lectura)
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 max-w-7xl mx-auto">
          {/* Barra de Filtros por Sección y Buscador Plano */}
          <div className="bg-white p-3.5 border border-gray-300 rounded-none shadow-none flex flex-wrap items-center justify-between gap-3">
            {/* Pestañas de Sección (3A y 2B) */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1 hidden sm:inline">
                Sección:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSection('All')}
                className={`px-3 py-1.5 text-xs font-bold rounded-none border transition-colors ${
                  selectedSection === 'All'
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Todas ({allStudents.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedSection('3A')}
                className={`px-3 py-1.5 text-xs font-bold rounded-none border transition-colors ${
                  selectedSection === '3A'
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                style={selectedSection === '3A' ? { backgroundColor: RED } : {}}
              >
                Sección 3A (Física / Literatura)
              </button>
              <button
                type="button"
                onClick={() => setSelectedSection('2B')}
                className={`px-3 py-1.5 text-xs font-bold rounded-none border transition-colors ${
                  selectedSection === '2B'
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                style={selectedSection === '2B' ? { backgroundColor: RED } : {}}
              >
                Sección 2B (Matemáticas)
              </button>
            </div>

            {/* Buscador de alumnos */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-none bg-white focus:outline-none focus:border-red-600 text-gray-800"
              />
            </div>
          </div>

          {/* Grilla Limpia y Consultiva de Alumnos */}
          <div className="bg-white border border-gray-300 rounded-none overflow-hidden shadow-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: RED }} className="text-white border-b border-red-800">
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-white text-xs">
                      Foto / Nombre del Alumno
                    </th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                      ID Estudiantil
                    </th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                      Curso
                    </th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60 text-center">
                      Sección
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400 bg-white">
                        No se encontraron estudiantes para los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student, idx) => (
                      <tr
                        key={student.id}
                        className={`border-b border-gray-200 transition-colors hover:bg-gray-100/60 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        {/* Foto y Nombre del Alumno */}
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="w-8 h-8 rounded-none object-cover border border-gray-300"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=C0392B&color=fff&size=32`;
                              }}
                            />
                            <div>
                              <div className="font-semibold text-gray-900 leading-tight">
                                {student.name}
                              </div>
                              <div className="text-[11px] text-gray-400">
                                Alumno Regular
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* ID Estudiantil */}
                        <td className="py-2.5 px-4 font-mono font-semibold text-gray-700 border-l border-gray-200">
                          {student.studentId}
                        </td>

                        {/* Curso */}
                        <td className="py-2.5 px-4 text-gray-800 font-medium border-l border-gray-200">
                          {student.courseName}
                        </td>

                        {/* Sección */}
                        <td className="py-2.5 px-4 text-center border-l border-gray-200">
                          <span className="inline-block px-2.5 py-0.5 rounded-none text-xs font-bold bg-gray-100 text-gray-800 border border-gray-300">
                            {student.section}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pie informativo de la tabla */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span>
                Mostrando <strong>{filteredStudents.length}</strong> alumnos registrados
              </span>
              <span className="text-gray-400">
                La matriculación y modificación de datos es gestionada por Secretaría General
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentListPage;
