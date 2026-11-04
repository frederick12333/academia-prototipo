import React, { useState } from 'react';
import { Eye, Calendar, Fingerprint, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import AbsenceDetailModal from './AbsenceDetailModal';

// Rojo Institucional
const RED = '#C0392B';

export const StudentAbsencesTable = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Consolidado mensual institucional de inasistencias por huellero (No dividido por cursos)
  const monthlyAttendanceData = [
    {
      id: 1,
      mes: 'Agosto 2026',
      mesKey: '08',
      diasAcademicos: 22,
      inasistenciasTotales: 0,
      tardanzasAcumuladas: 1,
      porcentajeAsistencia: '100.0%',
      estadoMes: 'Excelente',
    },
    {
      id: 2,
      mes: 'Setiembre 2026',
      mesKey: '09',
      diasAcademicos: 21,
      inasistenciasTotales: 1,
      tardanzasAcumuladas: 1,
      porcentajeAsistencia: '95.2%',
      estadoMes: 'Regular',
    },
    {
      id: 3,
      mes: 'Octubre 2026',
      mesKey: '10',
      diasAcademicos: 23,
      inasistenciasTotales: 1,
      tardanzasAcumuladas: 1,
      porcentajeAsistencia: '95.7%',
      estadoMes: 'Regular',
    },
    {
      id: 4,
      mes: 'Noviembre 2026 (En curso)',
      mesKey: '11',
      diasAcademicos: 14,
      inasistenciasTotales: 0,
      tardanzasAcumuladas: 0,
      porcentajeAsistencia: '100.0%',
      estadoMes: 'Excelente',
    },
  ];

  const totalDiasAcademicos = monthlyAttendanceData.reduce((acc, curr) => acc + curr.diasAcademicos, 0);
  const totalInasistencias = monthlyAttendanceData.reduce((acc, curr) => acc + curr.inasistenciasTotales, 0);
  const totalTardanzas = monthlyAttendanceData.reduce((acc, curr) => acc + curr.tardanzasAcumuladas, 0);
  const porcentajeGlobal = (((totalDiasAcademicos - totalInasistencias) / totalDiasAcademicos) * 100).toFixed(1);

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
                  Mis inasistencias
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                  <Fingerprint size={11} className="text-red-700" />
                  Control Huellero Portería
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Consolidado institucional de ingresos y faltas por mes en la academia
              </p>
            </div>
          </div>

          {/* Botón superior derecho: "Ver detalle" (color rojo institucional) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white font-semibold text-xs transition-all shadow-sm hover:opacity-90 active:scale-95"
            style={{ backgroundColor: RED }}
            title="Ver desglose diario de marcación por huella digital"
          >
            <Eye size={15} />
            Ver detalle
          </button>
        </div>

        {/* Tabla mensual consolidada institucional */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Mes</th>
                <th className="py-3 px-6 text-center">Días Académicos</th>
                <th className="py-3 px-6 text-center">Inasistencias Totales</th>
                <th className="py-3 px-6 text-center">Tardanzas Acumuladas</th>
                <th className="py-3 px-6 text-center">% Asistencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {monthlyAttendanceData.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setIsModalOpen(true)}
                  className="hover:bg-red-50/30 transition-colors cursor-pointer group"
                  title="Haz clic para ver el registro diario del huellero"
                >
                  {/* Mes */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.inasistenciasTotales > 0 ? RED : '#10B981' }}
                      />
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-red-700 transition-colors text-sm">
                          {item.mes}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Periodo Académico 2026-I
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Días Académicos */}
                  <td className="py-3.5 px-6 text-center font-semibold text-gray-800 text-sm">
                    {item.diasAcademicos}
                  </td>

                  {/* Inasistencias Totales */}
                  <td className="py-3.5 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs ${
                        item.inasistenciasTotales > 0
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : 'bg-green-100 text-green-700 border border-green-200'
                      }`}
                    >
                      {item.inasistenciasTotales}
                    </span>
                  </td>

                  {/* Tardanzas Acumuladas */}
                  <td className="py-3.5 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-semibold text-xs ${
                        item.tardanzasAcumuladas > 0
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {item.tardanzasAcumuladas}
                    </span>
                  </td>

                  {/* % Asistencia */}
                  <td className="py-3.5 px-6 text-center font-bold text-sm text-gray-900">
                    {item.porcentajeAsistencia}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Fila de Totales / Consolidado */}
            <tfoot className="bg-gray-50/80 border-t-2 border-gray-200 font-bold text-xs text-gray-900">
              <tr>
                <td className="py-3 px-6 uppercase tracking-wider text-gray-700">
                  Total Acumulado Ciclo 2026-I
                </td>
                <td className="py-3 px-6 text-center text-sm">
                  {totalDiasAcademicos}
                </td>
                <td className="py-3 px-6 text-center text-sm text-red-700">
                  {totalInasistencias}
                </td>
                <td className="py-3 px-6 text-center text-sm text-amber-700">
                  {totalTardanzas}
                </td>
                <td className="py-3 px-6 text-center text-sm text-green-700">
                  {porcentajeGlobal}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pie informativo */}
        <div className="bg-gray-50/70 border-t border-gray-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-gray-400" />
            <span>
              Tolerancia de ingreso en puerta principal: hasta las <strong>08:00 AM</strong>. A partir de 08:01 AM se registra tardanza.
            </span>
          </div>
          <span className="font-semibold text-green-700">
            Asistencia General: {porcentajeGlobal}% (Estado Regular)
          </span>
        </div>
      </div>

      {/* Modal de Desglose de Huellero Diario */}
      <AbsenceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default StudentAbsencesTable;
