import React from 'react';

/**
 * ScheduleCard — Tarjeta de clase/examen ultra-simplificada.
 * Deja que la fila izquierda controle el horario.
 * La información detallada (profesor, horario, etc.) se consulta al hacer clic.
 */
const ScheduleCard = ({ slot, onClick }) => {
  const isExam = slot?.type === 'Exam';
  const accentColor = isExam ? '#1a1a1a' : '#C0392B';

  return (
    <div
      onClick={onClick}
      className={`w-full h-full min-h-[60px] rounded-none bg-white border border-gray-300 flex overflow-hidden transition-all ${
        onClick ? 'cursor-pointer hover:border-red-600 hover:bg-gray-50/80 group' : ''
      }`}
      title={onClick ? 'Haz clic para ver el Detalle de Clase' : undefined}
    >
      {/* Línea lateral izquierda de color institucional */}
      <div
        className="w-1.5 flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      />

      {/* Contenido limpio de la celda: únicamente etiqueta de tipo y nombre del curso */}
      <div className="flex flex-col justify-center p-2.5 flex-1 min-w-0">
        <div
          className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
          style={{ color: accentColor }}
        >
          {isExam ? 'Examen' : 'Clase'}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug truncate">
          {slot?.subject}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
