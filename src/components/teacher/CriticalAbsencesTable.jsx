import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Fingerprint, Search, FileSpreadsheet, X, Calendar, Clock } from 'lucide-react';
import { users } from '../../data/mockData';

const RED = '#C0392B';

export const CriticalAbsencesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Consolidado de inasistencias generales de portería por huellero
  const studentsAttendanceData = [
    {
      id: 3,
      name: 'Frederick Rodas',
      section: '3A',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 2,
      tardanzasAcumuladas: 3,
      porcentajeFaltasNum: 2.5,
    },
    {
      id: 4,
      name: 'Camila Quispe',
      section: '3A',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 1,
      tardanzasAcumuladas: 2,
      porcentajeFaltasNum: 1.25,
    },
    {
      id: 5,
      name: 'Mateo Salazar',
      section: '3A',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 14,
      tardanzasAcumuladas: 6,
      porcentajeFaltasNum: 17.5, // > 15% ALERTA
    },
    {
      id: 6,
      name: 'Valeria Rojas',
      section: '3A',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 0,
      tardanzasAcumuladas: 1,
      porcentajeFaltasNum: 0.0,
    },
    {
      id: 7,
      name: 'Lucas Mendoza',
      section: '2B',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 13,
      tardanzasAcumuladas: 5,
      porcentajeFaltasNum: 16.25, // > 15% ALERTA
    },
    {
      id: 8,
      name: 'Sofía Castro',
      section: '2B',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 3,
      tardanzasAcumuladas: 2,
      porcentajeFaltasNum: 3.75,
    },
    {
      id: 9,
      name: 'Joaquín Huamán',
      section: '2B',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 4,
      tardanzasAcumuladas: 4,
      porcentajeFaltasNum: 5.0,
    },
    {
      id: 10,
      name: 'Andrea Flores',
      section: '2B',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      diasAcademicos: 80,
      faltasAcumuladas: 1,
      tardanzasAcumuladas: 0,
      porcentajeFaltasNum: 1.25,
    },
  ];

  const filteredStudents = studentsAttendanceData.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.section.toLowerCase().includes(term) ||
      `2026-apa-${student.id}`.includes(term)
    );
  });

  // Alumnos en riesgo (> 15% de faltas generales)
  const atRiskCount = studentsAttendanceData.filter(s => s.porcentajeFaltasNum > 15).length;

  return (
    <>
      <div className="bg-white rounded-none border border-gray-300 shadow-none overflow-hidden w-full">
        {/* Cabecera limpia sin subtítulos de relleno */}
        <div className="px-5 py-3.5 border-b border-gray-300 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-6 rounded-none flex-shrink-0"
              style={{ backgroundColor: RED }}
            />
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                Inasistencias Diarias Generales - Alerta
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-none border border-gray-300">
                <Fingerprint size={11} className="text-red-700" />
                Control Huellero Institucional
              </span>
            </div>
          </div>

          {/* Acciones: Buscador y Botón Ver Reporte General de Ingresos */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alumno o sección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-none text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-red-600 w-44 sm:w-52"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none text-white font-semibold text-xs transition-opacity hover:opacity-90 shadow-none"
              style={{ backgroundColor: RED }}
              title="Consultar consolidado diario de ingreso por huellero biométrico"
            >
              <FileSpreadsheet size={14} />
              Ver Reporte General de Ingresos
            </button>
          </div>
        </div>

        {/* Resumen de alerta institucional si hay alumnos en riesgo */}
        {atRiskCount > 0 && (
          <div className="bg-red-50 border-b border-red-200 px-5 py-2 flex items-center justify-between text-xs text-red-800">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-red-600 flex-shrink-0" />
              <span>
                <strong>Alerta Institucional:</strong> Hay <strong>{atRiskCount}</strong> alumno(s) que superan el 15% de inasistencias acumuladas.
              </span>
            </div>
            <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-none border border-red-300">
              Límite de inhabilitación: 30%
            </span>
          </div>
        )}

        {/* Contenedor responsivo con tabla al 100% que evita desbordes y cortes */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr style={{ backgroundColor: RED }} className="text-white border-b border-red-800">
                <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-white">Alumno</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">ID Matrícula</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">Sección</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">Días Académicos</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">Faltas</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">Tardanzas</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">% Faltas</th>
                <th className="py-2.5 px-3 text-center font-bold uppercase tracking-wider text-white border-l border-red-700/60">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-400 bg-white">
                    No se encontraron registros de estudiantes.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const isCritical = student.porcentajeFaltasNum > 15;
                  return (
                    <tr
                      key={student.id}
                      className={`border-b border-gray-200 transition-colors ${
                        isCritical
                          ? 'bg-red-50/40 hover:bg-red-50/70'
                          : idx % 2 === 0
                          ? 'bg-white hover:bg-gray-50'
                          : 'bg-gray-50/60 hover:bg-gray-100/60'
                      }`}
                    >
                      {/* Alumno */}
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-7 h-7 rounded-none object-cover border border-gray-300"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=C0392B&color=fff&size=28`;
                            }}
                          />
                          <span className="font-semibold text-gray-900 text-xs">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      {/* ID Matrícula */}
                      <td className="py-2.5 px-3 text-center font-mono font-medium text-gray-600 border-l border-gray-200">
                        2026-APA-{student.id.toString().padStart(4, '0')}
                      </td>

                      {/* Sección */}
                      <td className="py-2.5 px-3 text-center border-l border-gray-200">
                        <span className="inline-block px-2 py-0.5 rounded-none font-bold text-[11px] bg-gray-100 text-gray-800 border border-gray-300">
                          {student.section}
                        </span>
                      </td>

                      {/* Días Académicos Totales */}
                      <td className="py-2.5 px-3 text-center font-semibold text-gray-800 border-l border-gray-200">
                        {student.diasAcademicos}
                      </td>

                      {/* Faltas Acumuladas */}
                      <td className="py-2.5 px-3 text-center border-l border-gray-200">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-none font-bold text-xs border ${
                            isCritical
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : student.faltasAcumuladas > 0
                              ? 'bg-amber-100 text-amber-700 border-amber-300'
                              : 'bg-green-100 text-green-700 border-green-300'
                          }`}
                        >
                          {student.faltasAcumuladas}
                        </span>
                      </td>

                      {/* Tardanzas */}
                      <td className="py-2.5 px-3 text-center text-gray-700 font-semibold border-l border-gray-200">
                        {student.tardanzasAcumuladas}
                      </td>

                      {/* % Faltas */}
                      <td className="py-2.5 px-3 text-center font-bold border-l border-gray-200">
                        <span
                          className={
                            isCritical
                              ? 'text-red-700 font-extrabold'
                              : student.porcentajeFaltasNum > 0
                              ? 'text-amber-700'
                              : 'text-green-700'
                          }
                        >
                          {student.porcentajeFaltasNum.toFixed(1)}%
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="py-2.5 px-3 text-center border-l border-gray-200">
                        {isCritical ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] font-bold bg-red-100 text-red-700 border border-red-300">
                            <AlertTriangle size={11} className="text-red-600 flex-shrink-0" />
                            Riesgo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-300">
                            <CheckCircle2 size={11} className="text-gray-500 flex-shrink-0" />
                            Regular
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Reporte General de Ingresos */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-none shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-300">
            <div className="px-5 py-3.5 text-white flex items-center justify-between" style={{ backgroundColor: RED }}>
              <div className="flex items-center gap-2.5">
                <Fingerprint size={20} className="text-white" />
                <div>
                  <h2 className="text-base font-bold leading-tight">Reporte General de Ingresos</h2>
                  <p className="text-xs text-red-100">Control Biométrico Diario · Academia Apu San Antonio</p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 hover:bg-white/20 rounded-none transition-colors text-white"
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-gray-800">
              <div className="bg-gray-50 p-3 border border-gray-300 rounded-none flex items-center justify-between">
                <div>
                  <span className="font-bold text-gray-900 block">Torniquete Principal - Puerta 01</span>
                  <span className="text-gray-500">Horario de ingreso regular: 07:15 AM a 08:00 AM</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-300 rounded-none">
                  Operativo
                </span>
              </div>

              <div className="border border-gray-300 rounded-none overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300 text-gray-700 font-bold uppercase text-[10px]">
                      <th className="py-2 px-3">Estudiante</th>
                      <th className="py-2 px-3 text-center border-l border-gray-200">Sección</th>
                      <th className="py-2 px-3 text-center border-l border-gray-200">Hora Ingreso</th>
                      <th className="py-2 px-3 text-center border-l border-gray-200">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentsAttendanceData.map(st => (
                      <tr key={st.id} className="hover:bg-gray-50">
                        <td className="py-2 px-3 font-semibold text-gray-900">{st.name}</td>
                        <td className="py-2 px-3 text-center border-l border-gray-200">{st.section}</td>
                        <td className="py-2 px-3 text-center border-l border-gray-200 font-mono text-gray-600">
                          {st.faltasAcumuladas > 10 ? '--:--' : '07:48 AM'}
                        </td>
                        <td className="py-2 px-3 text-center border-l border-gray-200">
                          <span className={`px-2 py-0.5 rounded-none font-bold text-[10px] border ${
                            st.faltasAcumuladas > 10
                              ? 'bg-red-50 text-red-700 border-red-300'
                              : 'bg-green-50 text-green-700 border-green-300'
                          }`}>
                            {st.faltasAcumuladas > 10 ? 'Inasistencia' : 'Puntual'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CriticalAbsencesTable;
