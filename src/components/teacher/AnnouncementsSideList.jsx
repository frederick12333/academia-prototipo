import React from 'react';
import { Megaphone } from 'lucide-react';

// Fecha oficial de referencia del sistema (Noviembre 2026)
const SYSTEM_NOW = new Date('2026-11-04T20:36:00');

const AnnouncementsSideList = () => {
  // Lista de anuncios del docente con fechas para cálculo de vigencia
  const announcements = [
    {
      id: 1,
      course: 'Matemáticas',
      topic: 'Próximo cuestionario de álgebra y polinomios',
      content: 'Estimados alumnos: repasar las fórmulas del capítulo 5 antes de nuestra próxima clase. El próximo cuestionario abarcará expresiones algebraicas.',
      date: 'Hoy, 09:30',
      isoDate: '2026-11-04T09:30:00'
    },
    {
      id: 2,
      course: 'Física',
      topic: 'Preparación del laboratorio de cinemática',
      content: 'Traer el cuaderno de trabajo y los instrumentos de medición requeridos para la práctica grupal de vectores y cinemática en el laboratorio.',
      date: '06 Nov, 08:00',
      isoDate: '2026-11-06T08:00:00'
    },
    {
      id: 3,
      course: 'Matemáticas',
      topic: 'Revisión de Fichas de Trabajo N° 2',
      content: 'Revisión presencial de las fichas desarrolladas durante la primera hora de clase.',
      date: '08 Nov, 10:00',
      isoDate: '2026-11-08T10:00:00'
    },
    {
      id: 4,
      course: 'Física',
      topic: 'Publicación de calificaciones de evaluación continua',
      content: 'Se han registrado en el portal las calificaciones de la última práctica dirigida de factorización.',
      date: '02 Nov, 11:00',
      isoDate: '2026-11-02T11:00:00'
    },
    {
      id: 5,
      course: 'Física',
      topic: 'Sesión presencial de asesoría académica finalizada',
      content: 'Sesión de reforzamiento optativo sobre dinámica y leyes de Newton concluida.',
      date: '31 Oct, 17:30',
      isoDate: '2026-10-31T17:30:00'
    }
  ];

  const checkIsPast = (isoDateStr) => {
    return new Date(isoDateStr) < SYSTEM_NOW;
  };

  const activeCount = announcements.filter(a => !checkIsPast(a.isoDate)).length;

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
      {/* Cabecera compacta */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-red-600" />
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">Anuncios del Docente</h3>
        </div>
        <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {activeCount} vigentes
        </span>
      </div>

      {/* Contenedor optimizado: máximo 3 elementos visibles con scroll vertical independiente */}
      <div className="max-h-[320px] overflow-y-auto pr-1 space-y-2 select-none">
        {announcements.map((announcement) => {
          const isPast = checkIsPast(announcement.isoDate);

          return (
            <div
              key={announcement.id}
              className={`border rounded-lg p-2.5 sm:p-3 transition-all ${
                isPast
                  ? 'opacity-50 grayscale contrast-75 bg-gray-100 border-gray-200'
                  : 'bg-gray-50 border-gray-100 hover:bg-gray-100/80 shadow-2xs'
              }`}
            >
              {/* Meta: Curso y Fecha */}
              <div className="flex items-center justify-between gap-2 mb-1">
                <span 
                  className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                    isPast
                      ? 'bg-gray-200 text-gray-600'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {announcement.course}
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  {announcement.date}
                </span>
              </div>

              {/* Tema / Título truncado a una sola línea */}
              <h4
                className={`text-sm truncate ${isPast ? 'font-medium text-gray-600' : 'font-semibold text-gray-800'}`}
                title={announcement.topic}
              >
                {announcement.topic}
              </h4>

              {/* Contenido truncado con line-clamp-2 */}
              {announcement.content && (
                <p
                  className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed"
                  title={announcement.content}
                >
                  {announcement.content}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementsSideList;
