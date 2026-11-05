import React from 'react';
import { CalendarClock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Fecha oficial de referencia del sistema (Noviembre 2026)
const SYSTEM_NOW = new Date('2026-11-04T20:36:00');

const MOCK_DEADLINES = [
  {
    id: 1,
    subject: 'Física',
    type: 'Tarea',
    title: 'Guía Práctica N° 1 - Vectores y Cinemática',
    deadline: '09/11 @ 19:00',
    isoDate: '2026-11-09T19:00:00',
    description: 'Resolver los ejercicios de cinemática y vectores en el cuaderno de trabajo.',
    target: '/student/assignments'
  },
  {
    id: 2,
    subject: 'Matemáticas',
    type: 'Tarea',
    title: 'Ficha de Ejercicios N° 1 - Polinomios y Factorización',
    deadline: '11/11 @ 19:00',
    isoDate: '2026-11-11T19:00:00',
    description: 'Desarrollar los problemas de factorización de polinomios.',
    target: '/student/assignments'
  },
  {
    id: 3,
    subject: 'Física',
    type: 'Presencial',
    title: 'Primer Examen',
    deadline: '12/11 @ 08:00 - 10:00',
    isoDate: '2026-11-12T08:00:00',
    description: 'Evaluación física presencial escrita. Traer lápiz 2B y carné estudiantil.',
    target: '/student/schedule'
  },
  {
    id: 4,
    subject: 'Matemáticas',
    type: 'Presencial',
    title: 'Primer Examen',
    deadline: '14/11 @ 10:00 - 12:00',
    isoDate: '2026-11-14T10:00:00',
    description: 'Evaluación física de operaciones y ecuaciones algebraicas.',
    target: '/student/schedule'
  },
  {
    id: 5,
    subject: 'Literatura',
    type: 'Tarea',
    title: 'Análisis Literario - Obra Ollantay',
    deadline: '15/11 @ 19:00',
    isoDate: '2026-11-15T19:00:00',
    description: 'Redactar el análisis en hojas cuadriculadas para revisión física.',
    target: '/student/assignments'
  },
  {
    id: 6,
    subject: 'Física',
    type: 'Tarea',
    title: 'Ficha N° 0 - Repaso de Álgebra Vectorial',
    deadline: '01/11 @ 18:00',
    isoDate: '2026-11-01T18:00:00',
    description: 'Ejercicios preparatorios de inicio de ciclo.',
    target: '/student/assignments'
  },
  {
    id: 7,
    subject: 'Literatura',
    type: 'Tarea',
    title: 'Control de Lectura N° 1 - Mitos Andinos',
    deadline: '03/11 @ 19:00',
    isoDate: '2026-11-03T19:00:00',
    description: 'Entrega de resumen en cuaderno de trabajo.',
    target: '/student/assignments'
  }
];

const DeadlinesSideList = () => {
  const navigate = useNavigate();

  // Función para determinar si la fecha de la entrega ya pasó (efecto marchito)
  const checkIsPast = (isoDateStr) => {
    return new Date(isoDateStr) < SYSTEM_NOW;
  };

  const pendingCount = MOCK_DEADLINES.filter(d => !checkIsPast(d.isoDate)).length;

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
      {/* Cabecera compacta */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-red-600" />
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">Próximas entregas</h3>
        </div>
        <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {pendingCount} vigentes
        </span>
      </div>

      {/* Contenedor optimizado: máximo 3 elementos visibles con scroll vertical independiente */}
      <div className="max-h-[320px] overflow-y-auto pr-1 space-y-2 select-none">
        {MOCK_DEADLINES.map((item) => {
          const isPast = checkIsPast(item.isoDate);

          return (
            <div
              key={item.id}
              className={`border rounded-lg p-2.5 sm:p-3 transition-all flex items-center justify-between gap-3 ${
                isPast
                  ? 'opacity-50 grayscale contrast-75 bg-gray-100 border-gray-200'
                  : 'bg-gray-50 border-gray-100 hover:bg-gray-100/80 shadow-2xs'
              }`}
            >
              {/* Información principal del entregable */}
              <div className="flex-1 min-w-0">
                {/* Meta: Materia, Tipo y Fecha con estado dinámico */}
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                      isPast
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {item.subject}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">·</span>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex-shrink-0">
                    {item.type}
                  </span>
                  <span className="text-[11px] text-gray-400">·</span>
                  <span className="text-xs text-gray-500 font-medium truncate">
                    {item.deadline}
                  </span>
                </div>

                {/* Título truncado */}
                <h4 
                  className={`text-sm truncate ${isPast ? 'font-medium text-gray-600' : 'font-semibold text-gray-800'}`} 
                  title={item.title}
                >
                  {item.title}
                </h4>

                {/* Descripción breve con truncado */}
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5" title={item.description}>
                  {item.description}
                </p>
              </div>

              {/* Botón Ver (Activo o Deshabilitado suave según vigencia) */}
              <button
                onClick={() => !isPast && navigate(item.target)}
                disabled={isPast}
                className={`text-xs font-bold px-3 py-1.5 rounded transition-colors flex-shrink-0 ${
                  isPast
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-xs active:scale-95'
                }`}
                title={isPast ? 'Entrega pasada' : 'Ver actividad'}
              >
                {isPast ? 'Pasado' : 'Ver'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeadlinesSideList;
