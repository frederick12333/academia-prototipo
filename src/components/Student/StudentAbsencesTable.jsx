import React, { useState } from 'react';
import { Fingerprint, Search, FileSpreadsheet } from 'lucide-react';

// Rojo Institucional
const RED = '#C0392B';

export const StudentAbsencesTable = ({ user }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Historial diario de asistencia de portería (Huellero Principal)
  const biometricAttendanceLog = [
    {
      id: 1,
      fecha: '03/11/2026',
      dia: 'Martes',
      horaIngreso: '07:48 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
    {
      id: 2,
      fecha: '02/11/2026',
      dia: 'Lunes',
      horaIngreso: '07:52 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
    {
      id: 3,
      fecha: '31/10/2026',
      dia: 'Viernes',
      horaIngreso: '08:14 AM',
      tolerancia: 'Excedida (+14 min)',
      estado: 'Tardanza',
      tipo: 'tardanza',
    },
    {
      id: 4,
      fecha: '30/10/2026',
      dia: 'Jueves',
      horaIngreso: '07:55 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
    {
      id: 5,
      fecha: '28/10/2026',
      dia: 'Miércoles',
      horaIngreso: '--:--',
      tolerancia: 'Sin marcación de huella',
      estado: 'Falta Injustificada',
      tipo: 'falta',
    },
    {
      id: 6,
      fecha: '27/10/2026',
      dia: 'Martes',
      horaIngreso: '07:45 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
    {
      id: 7,
      fecha: '26/10/2026',
      dia: 'Lunes',
      horaIngreso: '08:08 AM',
      tolerancia: 'Excedida (+8 min)',
      estado: 'Tardanza',
      tipo: 'tardanza',
    },
    {
      id: 8,
      fecha: '24/10/2026',
      dia: 'Viernes',
      horaIngreso: '07:50 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
    {
      id: 9,
      fecha: '14/10/2026',
      dia: 'Miércoles',
      horaIngreso: '--:--',
      tolerancia: 'Sin marcación de huella',
      estado: 'Falta Injustificada',
      tipo: 'falta',
    },
    {
      id: 10,
      fecha: '13/10/2026',
      dia: 'Martes',
      horaIngreso: '08:06 AM',
      tolerancia: 'Excedida (+6 min)',
      estado: 'Tardanza',
      tipo: 'tardanza',
    },
    {
      id: 11,
      fecha: '10/10/2026',
      dia: 'Viernes',
      horaIngreso: '07:42 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
    {
      id: 12,
      fecha: '09/10/2026',
      dia: 'Jueves',
      horaIngreso: '07:38 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió',
      tipo: 'asistio',
    },
  ];

  const filteredLogs = biometricAttendanceLog.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.tipo === filterStatus;
    const matchesSearch =
      item.fecha.includes(searchTerm) ||
      item.dia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.estado.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const csvRows = [
      ['ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS'],
      ['HISTORIAL DIARIO DE ASISTENCIA DE PORTERIA (HUELLERO)'],
      [`Alumno: ${user?.name || 'Frederick Rodas'}`, `Seccion: ${user?.class || '3A'}`],
      [''],
      ['Fecha', 'Dia', 'Hora de Ingreso', 'Tolerancia', 'Estado'],
    ];

    filteredLogs.forEach((r) => {
      csvRows.push([
        `"${r.fecha}"`,
        `"${r.dia}"`,
        `"${r.horaIngreso}"`,
        `"${r.tolerancia}"`,
        `"${r.estado}"`,
      ]);
    });

    const csvContent = '\uFEFF' + csvRows.map((e) => e.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Asistencia_Diaria_${(user?.name || 'Frederick_Rodas').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-none border border-gray-300 overflow-hidden shadow-none">
      {/* Cabecera limpia y directa: Asistencia Diaria */}
      <div className="px-5 py-3.5 border-b border-gray-300 flex flex-wrap items-center justify-between gap-3 bg-gray-50">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-6 rounded-none flex-shrink-0" style={{ backgroundColor: RED }} />
          <h2 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wider">
            Asistencia Diaria
          </h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-gray-700 px-2.5 py-0.5 rounded-none border border-gray-300">
            <Fingerprint size={12} className="text-red-700" />
            Control Huellero Portería
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-none text-xs font-semibold transition-colors"
            title="Descargar reporte en Excel (CSV)"
          >
            <FileSpreadsheet size={14} className="text-green-700" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Barra de filtros y búsqueda */}
      <div className="p-3 border-b border-gray-200 bg-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs font-medium">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border transition-colors ${
              filterStatus === 'all'
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todos ({biometricAttendanceLog.length})
          </button>
          <button
            onClick={() => setFilterStatus('asistio')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border transition-colors ${
              filterStatus === 'asistio'
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-green-700 border-gray-300 hover:bg-green-50'
            }`}
          >
            Asistió
          </button>
          <button
            onClick={() => setFilterStatus('tardanza')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border transition-colors ${
              filterStatus === 'tardanza'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-amber-700 border-gray-300 hover:bg-amber-50'
            }`}
          >
            Tardanzas
          </button>
          <button
            onClick={() => setFilterStatus('falta')}
            className={`px-3 py-1 text-xs font-semibold rounded-none border transition-colors ${
              filterStatus === 'falta'
                ? 'bg-red-700 text-white border-red-700'
                : 'bg-white text-red-700 border-gray-300 hover:bg-red-50'
            }`}
          >
            Faltas
          </button>
        </div>

        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por fecha o día..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-3 py-1 text-xs border border-gray-300 rounded-none focus:outline-none focus:border-red-600 w-48 sm:w-56"
          />
        </div>
      </div>

      {/* Tabla limpia de Asistencia Diaria de Portería (sin columna de Punto de Acceso) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr style={{ backgroundColor: RED }} className="text-white border-b border-red-800">
              <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white">Fecha</th>
              <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white border-l border-red-700/60">Día</th>
              <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white border-l border-red-700/60">Hora de Ingreso</th>
              <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white border-l border-red-700/60">Tolerancia</th>
              <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white border-l border-red-700/60">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-400 bg-white">
                  No se encontraron registros de marcación con los filtros aplicados.
                </td>
              </tr>
            ) : (
              filteredLogs.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 transition-colors hover:bg-gray-100/60 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {/* Fecha */}
                  <td className="py-2.5 px-4 font-semibold text-gray-900 font-mono">
                    {item.fecha}
                  </td>

                  {/* Día */}
                  <td className="py-2.5 px-4 font-medium text-gray-800 border-l border-gray-200">
                    {item.dia}
                  </td>

                  {/* Hora de Ingreso */}
                  <td className="py-2.5 px-4 font-bold text-gray-900 border-l border-gray-200 font-mono">
                    {item.horaIngreso}
                  </td>

                  {/* Tolerancia */}
                  <td className="py-2.5 px-4 text-gray-600 border-l border-gray-200">
                    {item.tolerancia}
                  </td>

                  {/* Estado simplificado: "Asistió", "Tardanza" o "Falta Injustificada" */}
                  <td className="py-2.5 px-4 border-l border-gray-200">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-none font-bold text-[11px] border ${
                        item.tipo === 'asistio'
                          ? 'bg-green-50 text-green-700 border-green-300'
                          : item.tipo === 'tardanza'
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-red-50 text-red-700 border-red-300'
                      }`}
                    >
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAbsencesTable;
