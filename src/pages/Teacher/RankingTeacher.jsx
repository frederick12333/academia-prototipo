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
    performance: 'Excelente'
  },
  {
    rank: 2,
    name: 'Ana Luz Huamán Vargas',
    section: '2B',
    score: '18.40',
    performance: 'Excelente'
  },
  {
    rank: 3,
    name: 'Frederick Rodas',
    section: '3A',
    score: '17.40',
    performance: 'Sobresaliente'
  },
  {
    rank: 4,
    name: 'Camila Quispe Morales',
    section: '3A',
    score: '16.90',
    performance: 'Sobresaliente'
  },
  {
    rank: 5,
    name: 'Mateo Huamán Flores',
    section: '2B',
    score: '16.50',
    performance: 'Sobresaliente'
  },
  {
    rank: 6,
    name: 'Luciana Ríos Cárdenas',
    section: '3A',
    score: '16.10',
    performance: 'Sobresaliente'
  },
  {
    rank: 7,
    name: 'Diego Torres Paredes',
    section: '3A',
    score: '15.80',
    performance: 'Sobresaliente'
  },
  {
    rank: 8,
    name: 'Valeria Silva Palomino',
    section: '2B',
    score: '15.40',
    performance: 'Sobresaliente'
  },
  {
    rank: 9,
    name: 'Sebastián Ramos Peña',
    section: '3A',
    score: '15.10',
    performance: 'Sobresaliente'
  },
  {
    rank: 10,
    name: 'Andrea Cruz Zambrano',
    section: '2B',
    score: '14.80',
    performance: 'Sobresaliente'
  }
];

export default function RankingTeacher() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = TOP_10_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout currentPage={'Ranking'}>
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Cabecera Principal */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 sm:px-6 py-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: RED }} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  Ranking General de la Academia
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100 flex items-center gap-1">
                  <Trophy size={13} className="text-red-600" />
                  Cuadro de Honor
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Consolidado oficial de los mejores puntajes en simulacros tipo admisión
              </p>
            </div>
          </div>
        </div>

        {/* Cuadro Destacado del Último Simulacro */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <div className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-gray-900 via-slate-900 to-red-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-red-600/30 text-red-400 border border-red-500/30">
                <Sparkles size={16} />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 block">
                  Último Simulacro Procesado
                </span>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Simulacro General N° 4 - Tipo Admisión
                </h2>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/70 rounded-xl p-4 flex items-center gap-4">
              <div className="w-13 h-13 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Trophy size={28} />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
                  Puntaje Más Alto de la Academia
                </span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-black text-gray-900 tracking-tight">
                    19.10
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    (Carlos Mendoza Ramos - 3A)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50/50 border border-red-200/70 rounded-xl p-4 flex items-center gap-4">
              <div 
                className="w-13 h-13 rounded-xl text-white flex items-center justify-center flex-shrink-0 shadow-xs"
                style={{ backgroundColor: RED }}
              >
                <Award size={28} />
              </div>
              <div>
                <span className="text-xs font-semibold text-red-800 uppercase tracking-wider block">
                  Promedio General del Top 10
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-gray-900 tracking-tight">
                    16.69
                  </span>
                  <span className="text-xs text-gray-400 font-bold">/ 20.00</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold text-emerald-700">
                    Nivel Promedio: Sobresaliente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla Ranking General - Top 10 Estudiantes */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">
                Ranking General - Top 10 Estudiantes
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Resultados oficiales del Simulacro General N° 4 - Tipo Admisión (Visible para toda la academia)
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Buscar alumno o sección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

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
                  <tr key={student.rank} className="hover:bg-gray-50/80 transition-colors">
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

                    <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-gray-900">
                      {student.name}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                        {student.section}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-black text-gray-900 text-sm">
                      {student.score}
                    </td>

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
