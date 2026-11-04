import React from 'react';

/**
 * ScheduleCard — Tarjeta de clase/examen con identidad corporativa
 * Academia Apu San Antonio de Andahuaylas.
 *
 * Paleta: Rojo institucional (#C0392B) para clases, Negro (#1a1a1a) para exámenes/reuniones.
 * Fondo blanco con borde fino y línea lateral izquierda de color.
 */
const ScheduleCard = ({ slot, time, onExamDetailsClick, onClick }) => {
  const addHour = (t) => {
    const [h, m] = t.split(':').map(Number);
    return `${String((h + 1) % 24).padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const isExam = slot.type === 'Exam';
  // Rojo institucional para clases/lecturas; negro para exámenes y reuniones especiales
  const accentColor = isExam ? '#1a1a1a' : '#C0392B';

  return (
    <div
      onClick={onClick}
      className={`w-full rounded-md bg-white border border-gray-200 flex overflow-hidden shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-red-400 group' : ''
      }`}
      style={{ minHeight: '80px' }}
      title={onClick ? 'Haz clic para ver el Detalle de Clase' : undefined}
    >
      {/* Línea lateral izquierda de color institucional */}
      <div
        className="w-1 flex-shrink-0 rounded-l-md"
        style={{ backgroundColor: accentColor }}
      />

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col justify-between p-2 flex-1 gap-1">
        <div>
          {/* Etiqueta de tipo */}
          <div
            className="text-xs font-bold uppercase tracking-wide"
            style={{ color: accentColor }}
          >
            {isExam ? 'Examen' : 'Clase'}
          </div>
          {/* Hora */}
          <div className="text-xs text-gray-400 mt-0.5">
            {slot.time || `${time} – ${addHour(time)}`}
          </div>
          {/* Nombre de la asignatura */}
          <div className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">
            {slot.subject}
          </div>
          {/* Docente (si está disponible) */}
          {slot.teacher && (
            <div className="text-xs text-gray-500 mt-0.5 truncate">
              {typeof slot.teacher === 'object' ? slot.teacher.name : slot.teacher}
            </div>
          )}
        </div>

        {/* Pie de tarjeta: modalidad y botones de acción */}
        <div className="flex items-center justify-between mt-1">
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: slot.mode === 'Online' ? '#FEE2E2' : '#F3F4F6',
              color: slot.mode === 'Online' ? '#B91C1C' : '#374151',
            }}
          >
            {slot.mode === 'Online' ? 'En línea' : 'Presencial'}
          </span>

          <div className="flex gap-1">
            {isExam && slot.exam && (
              <button
                className="text-xs font-semibold py-0.5 px-2 rounded border transition-colors"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: 'white',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = accentColor;
                }}
                onClick={() => onExamDetailsClick && onExamDetailsClick(slot.exam)}
              >
                Detalles
              </button>
            )}
            {slot.join && (
              <button
                className="text-xs font-semibold py-0.5 px-2 rounded border transition-colors"
                style={{
                  borderColor: '#C0392B',
                  color: '#C0392B',
                  backgroundColor: 'white',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#C0392B';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#C0392B';
                }}
              >
                Unirse
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
