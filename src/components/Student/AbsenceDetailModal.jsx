import React, { useState } from 'react';
import { X, FileSpreadsheet, Fingerprint, Calendar, Clock, AlertCircle, CheckCircle2, User, Search, Filter } from 'lucide-react';

const RED = '#C0392B';

export const AbsenceDetailModal = ({ isOpen, onClose, user }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Historial diario del huellero de control del alumno Frederick Rodas
  const biometricAttendanceLog = [
    {
      id: 1,
      fecha: '03/11/2026',
      dia: 'Martes',
      horaIngreso: '07:48 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 01 - Principal',
    },
    {
      id: 2,
      fecha: '02/11/2026',
      dia: 'Lunes',
      horaIngreso: '07:52 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 02 - Principal',
    },
    {
      id: 3,
      fecha: '31/10/2026',
      dia: 'Viernes',
      horaIngreso: '08:14 AM',
      tolerancia: 'Excedida (+14 min)',
      estado: 'Tardanza',
      tipo: 'tardanza',
      puerta: 'Torniquete 01 - Principal',
    },
    {
      id: 4,
      fecha: '30/10/2026',
      dia: 'Jueves',
      horaIngreso: '07:55 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 01 - Principal',
    },
    {
      id: 5,
      fecha: '28/10/2026',
      dia: 'Miércoles',
      horaIngreso: '--:--',
      tolerancia: 'Sin marcación de huella',
      estado: 'Falta Injustificada',
      tipo: 'falta',
      puerta: 'No registrado',
    },
    {
      id: 6,
      fecha: '27/10/2026',
      dia: 'Martes',
      horaIngreso: '07:45 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 02 - Principal',
    },
    {
      id: 7,
      fecha: '26/10/2026',
      dia: 'Lunes',
      horaIngreso: '08:08 AM',
      tolerancia: 'Excedida (+8 min)',
      estado: 'Tardanza',
      tipo: 'tardanza',
      puerta: 'Torniquete 01 - Principal',
    },
    {
      id: 8,
      fecha: '24/10/2026',
      dia: 'Viernes',
      horaIngreso: '07:50 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 01 - Principal',
    },
    {
      id: 9,
      fecha: '14/10/2026',
      dia: 'Miércoles',
      horaIngreso: '--:--',
      tolerancia: 'Sin marcación de huella',
      estado: 'Falta Injustificada',
      tipo: 'falta',
      puerta: 'No registrado',
    },
    {
      id: 10,
      fecha: '13/10/2026',
      dia: 'Martes',
      horaIngreso: '08:06 AM',
      tolerancia: 'Excedida (+6 min)',
      estado: 'Tardanza',
      tipo: 'tardanza',
      puerta: 'Torniquete 02 - Principal',
    },
    {
      id: 11,
      fecha: '10/10/2026',
      dia: 'Viernes',
      horaIngreso: '07:42 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 01 - Principal',
    },
    {
      id: 12,
      fecha: '09/10/2026',
      dia: 'Jueves',
      horaIngreso: '07:38 AM',
      tolerancia: 'En rango (Puntual)',
      estado: 'Asistió - Temprano',
      tipo: 'temprano',
      puerta: 'Torniquete 01 - Principal',
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
      ['HISTORIAL DIARIO DE CONTROL BIOMETRICO DE ASISTENCIA (HUELLERO)'],
      [`Alumno: ${user?.name || 'Frederick Rodas'}`, `Seccion: ${user?.class || '3A'}`],
      [''],
      ['Fecha', 'Dia', 'Hora de Ingreso', 'Tolerancia', 'Estado', 'Punto de Acceso']
    ];

    filteredLogs.forEach((r) => {
      csvRows.push([
        `"${r.fecha}"`,
        `"${r.dia}"`,
        `"${r.horaIngreso}"`,
        `"${r.tolerancia}"`,
        `"${r.estado}"`,
        `"${r.puerta}"`
      ]);
    });

    const csvContent = '\uFEFF' + csvRows.map((e) => e.join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Huellero_${(user?.name || 'Frederick_Rodas').replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera institucional */}
        <div className="px-6 py-4 text-white flex items-center justify-between" style={{ backgroundColor: RED }}>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Fingerprint size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">
                Historial Diario de Huellero de Control
              </h2>
              <p className="text-xs text-red-100">
                Academia Apu San Antonio de Andahuaylas · Portería Principal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
            title="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>

        {/* Ficha del Estudiante e Información del Huellero */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm border border-red-200">
                <User size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estudiante Matriculado</p>
                <h3 className="text-base font-bold text-gray-900">{user?.name || 'Frederick Rodas'}</h3>
                <p className="text-xs text-gray-600">
                  Sección: <strong>{user?.class || '3A'}</strong> · Código Huella: <span className="font-mono font-semibold text-gray-800">#BIO-2026-03A-003</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-3.5 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                title="Descargar reporte del huellero en Excel (CSV)"
              >
                <FileSpreadsheet size={16} />
                Exportar a Excel
              </button>
            </div>
          </div>

          {/* Filtros de Estado y Buscador */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 pt-1">
            {/* Botones de filtro de estado */}
            <div className="flex items-center gap-1.5 text-xs font-medium bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filterStatus === 'all'
                    ? 'bg-white text-gray-900 shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todos ({biometricAttendanceLog.length})
              </button>
              <button
                onClick={() => setFilterStatus('temprano')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filterStatus === 'temprano'
                    ? 'bg-white text-green-700 shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Temprano (7)
              </button>
              <button
                onClick={() => setFilterStatus('tardanza')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filterStatus === 'tardanza'
                    ? 'bg-white text-amber-700 shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tardanzas (3)
              </button>
              <button
                onClick={() => setFilterStatus('falta')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  filterStatus === 'falta'
                    ? 'bg-white text-red-700 shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Faltas (2)
              </button>
            </div>

            {/* Buscador de fecha o día */}
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar fecha o día..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-red-600 w-44 sm:w-52"
              />
            </div>
          </div>

          {/* Tabla de Historial Diario del Huellero */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 border-b border-gray-200 text-gray-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-5">Fecha</th>
                    <th className="py-3 px-4">Día</th>
                    <th className="py-3 px-4">Hora de Ingreso</th>
                    <th className="py-3 px-4">Tolerancia</th>
                    <th className="py-3 px-6 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <AlertCircle size={26} className="text-gray-300" />
                          <p className="text-sm font-semibold text-gray-600">No se encontraron registros</p>
                          <p className="text-xs text-gray-400">Intenta cambiar los filtros de búsqueda.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        {/* Fecha */}
                        <td className="py-3 px-5 font-bold text-gray-900">
                          {item.fecha}
                        </td>

                        {/* Día */}
                        <td className="py-3 px-4 font-medium text-gray-700">
                          {item.dia}
                        </td>

                        {/* Hora de Ingreso */}
                        <td className="py-3 px-4 font-mono font-semibold text-gray-800">
                          {item.horaIngreso}
                        </td>

                        {/* Tolerancia */}
                        <td className="py-3 px-4 text-gray-600">
                          <span className={`inline-block ${item.tipo === 'tardanza' ? 'text-amber-700 font-semibold' : item.tipo === 'falta' ? 'text-red-700 font-semibold' : 'text-gray-600'}`}>
                            {item.tolerancia}
                          </span>
                        </td>

                        {/* Estado con etiquetas dinámicas */}
                        <td className="py-3 px-6 text-center">
                          {item.tipo === 'temprano' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300 shadow-xs">
                              <CheckCircle2 size={12} className="text-green-600 flex-shrink-0" />
                              Asistió - Temprano
                            </span>
                          )}
                          {item.tipo === 'tardanza' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 border border-amber-300 shadow-xs">
                              <Clock size={12} className="text-amber-600 flex-shrink-0" />
                              Tardanza
                            </span>
                          )}
                          {item.tipo === 'falta' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300 shadow-xs">
                              <AlertCircle size={12} className="text-red-600 flex-shrink-0" />
                              Falta Injustificada
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nota informativa de regla de tolerancia */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Reglamento Institucional de Control de Asistencia:</p>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                El horario regular de ingreso a la sede es de <strong>07:30 AM a 08:00 AM</strong>. Marcaciones entre 08:01 AM y 08:15 AM se registran como <em>Tardanza</em>. Pasadas las 08:15 AM sin justificación previa, el torniquete registra <em>Falta Injustificada</em>.
              </p>
            </div>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs text-gray-500">
          <span>Control Biométrico Sede Central Andahuaylas</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};

export default AbsenceDetailModal;
