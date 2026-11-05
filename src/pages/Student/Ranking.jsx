import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { 
  Trophy, 
  Medal, 
  Award, 
  Sparkles, 
  Search 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RED = '#C0392B';

// Datos oficiales del Top 10 de Estudiantes de la Academia
const TOP_10_STUDENTS = [
  {
    rank: 1,
    name: 'Carlos Mendoza Ramos',
    section: '3A',
    score: '19.10',
    performance: 'Excelente',
    isCurrentStudent: false
  },
  {
    rank: 2,
    name: 'Ana Luz Huamán Vargas',
    section: '2B',
    score: '18.40',
    performance: 'Excelente',
    isCurrentStudent: false
  },
  {
    rank: 3,
    name: 'Frederick Rodas', // Usuario Alumno actual
    section: '3A',
    score: '17.40',
    performance: 'Sobresaliente',
    isCurrentStudent: true
  },
  {
    rank: 4,
    name: 'Camila Quispe Morales',
    section: '3A',
    score: '16.90',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  },
  {
    rank: 5,
    name: 'Mateo Huamán Flores',
    section: '2B',
    score: '16.50',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  },
  {
    rank: 6,
    name: 'Luciana Ríos Cárdenas',
    section: '3A',
    score: '16.10',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  },
  {
    rank: 7,
    name: 'Diego Torres Paredes',
    section: '3A',
    score: '15.80',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  },
  {
    rank: 8,
    name: 'Valeria Silva Palomino',
    section: '2B',
    score: '15.40',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  },
  {
    rank: 9,
    name: 'Sebastián Ramos Peña',
    section: '3A',
    score: '15.10',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  },
  {
    rank: 10,
    name: 'Andrea Cruz Zambrano',
    section: '2B',
    score: '14.80',
    performance: 'Sobresaliente',
    isCurrentStudent: false
  }
];

export default function Ranking() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado de alumnos por nombre o sección
  const filteredStudents = TOP_10_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout currentPage={'Ranking'}>
      <div className="max-w-7xl mx-auto space-y-5">
        {/* ======================================================== */}
        {/* Cabecera Principal Institucional (Sin subtítulos grises) */}
        {/* ======================================================== */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 sm:px-6 py-4 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: RED }} />
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                Ranking de puntajes
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100 flex items-center gap-1">
                <Trophy size={13} className="text-red-600" />
                Sección 3A
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. BANNER SUPERIOR DE ESTADO PERSONALIZADO DEL ALUMNO     */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-red-950 text-white border border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md border border-white/20"
              style={{ backgroundColor: RED }}
            >
              <Trophy size={30} className="text-amber-300 drop-shadow-xs" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-300 block">
                Estado Académico Oficial
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Frederick Rodas <span className="text-sm font-normal text-gray-300">(Sección 3A)</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto justify-start md:justify-end">
            {/* Mi Puesto Actual */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-400 text-gray-900 flex items-center justify-center font-black text-sm shadow-xs flex-shrink-0">
                3°
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider block">
                  Mi Puesto Actual
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white whitespace-nowrap">
                  3° de 48 alumnos
                </span>
              </div>
            </div>

            {/* Mi Nota */}
            <div className="bg-white/10 backdrop-blur-xs border border-white/15 px-4 py-2.5 rounded-xl flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm text-white shadow-xs flex-shrink-0"
                style={{ backgroundColor: RED }}
              >
                <Award size={18} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider block">
                  Mi Nota
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white whitespace-nowrap">
                  17.40 <span className="text-xs font-normal text-gray-300">/ 20.00</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. RANKING GENERAL - TOP 10 ESTUDIANTES                  */}
        {/* ======================================================== */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Ranking General - Top 10 Estudiantes
              </h3>
            </div>

            {/* Buscador de alumnos */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Buscar alumno o sección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabla competitiva del Top 10 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-center w-24">Puesto</th>
                  <th className="py-3 px-4">Alumno</th>
                  <th className="py-3 px-4 text-center w-28">Sección</th>
                  <th className="py-3 px-4 text-center w-40">Puntaje Vigesimal</th>
                  <th className="py-3 px-4 text-center w-36">Rendimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.rank} 
                    className={`transition-colors ${
                      student.isCurrentStudent 
                        ? 'bg-red-50/70 border-l-4 border-l-red-600' 
                        : 'hover:bg-gray-50/80'
                    }`}
                  >
                    {/* Columna Puesto con badges para podio */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {student.rank === 1 ? (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded-full text-xs shadow-2xs">
                          <Trophy size={12} className="text-amber-600" />
                          1°
                        </span>
                      ) : student.rank === 2 ? (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-300 font-bold px-2 py-0.5 rounded-full text-xs shadow-2xs">
                          <Medal size={12} className="text-slate-500" />
                          2°
                        </span>
                      ) : student.rank === 3 ? (
                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-900 border border-orange-300 font-bold px-2 py-0.5 rounded-full text-xs shadow-2xs">
                          <Medal size={12} className="text-orange-600" />
                          3°
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-600 px-2 py-0.5 inline-block text-center min-w-[28px]">
                          {student.rank}°
                        </span>
                      )}
                    </td>

                    {/* Columna Alumno */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-xs ${student.isCurrentStudent ? 'font-black text-red-800' : 'font-semibold text-gray-900'}`}>
                          {student.name}
                        </span>
                        {student.isCurrentStudent && (
                          <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-red-600 text-white rounded shadow-2xs uppercase tracking-wider">
                            Tú
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Columna Sección */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                        {student.section}
                      </span>
                    </td>

                    {/* Columna Puntaje Vigesimal (Formato puro 0 a 20) */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`text-sm ${student.isCurrentStudent ? 'font-black text-red-700' : 'font-black text-gray-900'}`}>
                        {student.score}
                      </span>
                    </td>

                    {/* Columna Rendimiento */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        student.performance === 'Excelente'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {student.performance}
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
}
