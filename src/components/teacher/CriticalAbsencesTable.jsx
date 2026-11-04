import React, { useState } from 'react';
import { AlertTriangle, FileSpreadsheet, Users, CheckCircle2, Fingerprint, Calendar, Clock, X, Search } from 'lucide-react';

const RED = '#C0392B';

export const CriticalAbsencesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Registro generalizado de inasistencias diarias (Huellero / Portería institucional)
  const studentsAttendanceData = [
    {
      id: 3,
      name: 'Frederick Rodas',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      section: '3A',
      diasAcademicos: 40,
      faltasAcumuladas: 2,
      tardanzasAcumuladas: 3,
      porcentajeFaltasNum: 5.0,
    },
    {
      id: 5,
      name: 'Mateo Salazar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      section: '3A',
      diasAcademicos: 40,
      faltasAcumuladas: 7,
      tardanzasAcumuladas: 5,
      porcentajeFaltasNum: 17.5,
    },
    {
      id: 9,
      name: 'Joaquín Castro',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
      section: '2B',
      diasAcademicos: 40,
      faltasAcumuladas: 8,
      tardanzasAcumuladas: 4,
      porcentajeFaltasNum: 20.0,
    },
    {
      id: 8,
      name: 'Sofia Huamán',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      section: '2B',
      diasAcademicos: 40,
      faltasAcumuladas: 6,
      tardanzasAcumuladas: 2,
      porcentajeFaltasNum: 15.0,
    },
    {
      id: 6,
      name: 'Valeria Rojas',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      section: '3A',
      diasAcademicos: 40,
      faltasAcumuladas: 1,
      tardanzasAcumuladas: 1,
      porcentajeFaltasNum: 2.5,
    },
    {
      id: 7,
      name: 'Lucas Mendoza',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      section: '2B',
      diasAcademicos: 40,
      faltasAcumuladas: 3,
      tardanzasAcumuladas: 2,
      porcentajeFaltasNum: 7.5,
    },
    {
      id: 4,
      name: 'Camila Quispe',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      section: '3A',
      diasAcademicos: 40,
      faltasAcumuladas: 0,
      tardanzasAcumuladas: 0,
      porcentajeFaltasNum: 0.0,
    },
    {
      id: 10,
      name: 'Luciana Alarcón',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      section: '2B',
      diasAcademicos: 40,
      faltasAcumuladas: 1,
      tardanzasAcumuladas: 3,
      porcentajeFaltasNum: 2.5,
    },
  ];

  // Filtrado por buscador
  const filteredStudents = studentsAttendanceData.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Alumnos en riesgo (> 15% de faltas generales)
  const atRiskCount = studentsAttendanceData.filter(s => s.porcentajeFaltasNum > 15).length;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Cabecera de la tarjeta */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-3">
            <div
              className="w-1.5 h-7 rounded-full flex-shrink-0"
              style={{ backgroundColor: RED }}
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 leading-tight">
                  Inasistencias Diarias Generales - Alerta
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                  <Fingerprint size={11} className="text-red-700" />
                  Control Huellero Institucional
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Seguimiento preventivo de inhabilitación por inasistencias en portería general
              </p>
            </div>
          </div>

          {/* Acciones: Buscador y Botón Ver Reporte General de Ingresos */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Buscador de alumnos */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar alumno o sección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-red-600 w-44 sm:w-52"
              />
            </div>

            {/* Botón: Ver Reporte General de Ingresos */}
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs transition-all shadow-sm hover:opacity-90 active:scale-95"
              style={{ backgroundColor: RED }}
              title="Consultar consolidado diario de ingreso por huellero biométrico"
            >
              <FileSpreadsheet size={15} />
              Ver Reporte General de Ingresos
            </button>
          </div>
        </div>

        {/* Resumen de alerta institucional si hay alumnos en riesgo */}
        {atRiskCount > 0 && (
          <div className="bg-red-50 border-b border-red-100 px-6 py-2.5 flex items-center justify-between text-xs text-red-800">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-red-600 flex-shrink-0" />
              <span>
                <strong>Alerta Institucional:</strong> Hay <strong>{atRiskCount}</strong> alumno(s) que superan el 15% de inasistencias generales acumuladas en el ciclo.
              </span>
            </div>
            <span className="text-[11px] font-semibold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
              Límite crítico de inhabilitación: 30%
            </span>
          </div>
        )}

        {/* Tabla limpia de inasistencias diarias generales */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Alumno</th>
                <th className="py-3 px-4 text-center">Sección</th>
                <th className="py-3 px-4 text-center">Días Académicos</th>
                <th className="py-3 px-4 text-center">Faltas Acumuladas</th>
                <th className="py-3 px-4 text-center">Tardanzas</th>
                <th className="py-3 px-4 text-center">% Faltas</th>
                <th className="py-3 px-6 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => {
                const isCritical = student.porcentajeFaltasNum > 15;
                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isCritical ? 'bg-red-50/25 hover:bg-red-50/40' : 'hover:bg-gray-50/60'
                    }`}
                  >
                    {/* Alumno */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=C0392B&color=fff&size=32`;
                          }}
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm leading-tight">
                            {student.name}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Matrícula: 2026-APA-{student.id.toString().padStart(4, '0')}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Sección */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded font-semibold text-xs bg-gray-100 text-gray-700 border border-gray-200">
                        {student.section}
                      </span>
                    </td>

                    {/* Días Académicos Totales */}
                    <td className="py-3 px-4 text-center font-semibold text-gray-800 text-sm">
                      {student.diasAcademicos}
                    </td>

                    {/* Faltas Acumuladas */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                          isCritical
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : student.faltasAcumuladas > 0
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-green-100 text-green-700 border border-green-200'
                        }`}
                      >
                        {student.faltasAcumuladas}
                      </span>
                    </td>

                    {/* Tardanzas */}
                    <td className="py-3 px-4 text-center">
                      <span className="text-gray-600 font-semibold">
                        {student.tardanzasAcumuladas}
                      </span>
                    </td>

                    {/* % Faltas */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-bold text-sm ${
                          isCritical
                            ? 'text-red-700'
                            : student.porcentajeFaltasNum > 0
                            ? 'text-amber-700'
                            : 'text-green-700'
                        }`}
                      >
                        {student.porcentajeFaltasNum.toFixed(1)}%
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-6 text-center">
                      {isCritical ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300 shadow-xs">
                          <AlertTriangle size={12} className="text-red-600 flex-shrink-0" />
                          Riesgo de Inhabilitación
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
                          <CheckCircle2 size={12} className="text-gray-500 flex-shrink-0" />
                          Regular
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pie informativo institucional */}
        <div className="bg-gray-50/70 border-t border-gray-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <Fingerprint size={13} className="text-gray-400" />
            <span>
              Registro plano por huella dactilar en portería. El sistema no requiere pase de lista en aula por docente.
            </span>
          </div>
          <span className="font-medium text-gray-600">
            Sede Central Andahuaylas · Periodo 2026-I
          </span>
        </div>
      </div>

      {/* Modal: Reporte General de Ingresos (Informativo y Estético) */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Header del Modal */}
            <div className="px-6 py-4 text-white flex items-center justify-between" style={{ backgroundColor: RED }}>
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Fingerprint size={22} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold leading-tight">Reporte General de Ingresos</h2>
                  <p className="text-xs text-red-100">Control Biométrico Diario · Academia Apu San Antonio</p>
                </div>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                title="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenido del Reporte */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                  <p className="text-[11px] font-semibold text-green-700 uppercase">Ingresos a Tiempo</p>
                  <p className="text-xl font-bold text-green-900 mt-1">94.5%</p>
                  <p className="text-[10px] text-green-600">Antes de 08:00 AM</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <p className="text-[11px] font-semibold text-amber-700 uppercase">Tardanzas Hoy</p>
                  <p className="text-xl font-bold text-amber-900 mt-1">3</p>
                  <p className="text-[10px] text-amber-600">08:01 - 08:15 AM</p>
                </div>
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                  <p className="text-[11px] font-semibold text-red-700 uppercase">Faltas Registradas</p>
                  <p className="text-xl font-bold text-red-900 mt-1">1</p>
                  <p className="text-[10px] text-red-600">Sin marcación de huella</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs space-y-2 text-gray-700">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-900">Estado del Huellero Principal:</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    En línea / Sincronizado
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Última sincronización con el servidor:</span>
                  <span className="font-mono text-gray-900">Hoy, 08:30 AM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Módulo de registro docente:</span>
                  <span className="text-gray-500">Desactivado (El registro es autónomo por torniquete de ingreso)</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 leading-relaxed text-center">
                El control de asistencia institucional se realiza automáticamente mediante el lector biométrico instalado en la puerta de acceso de la Academia. Los docentes no requieren realizar toma de asistencia en aula.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Cerrar reporte
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CriticalAbsencesTable;
