import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import ScheduleCard from './ScheduleCard';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';

// ─── Constantes institucionales ─────────────────────────────────────────────
const RED = '#C0392B';
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

// ─── Horario explícito DOCENTE (Jhon Wick) ──────────────────────────────────
const teacherScheduleBlocks = {
  // Day 0: Lunes
  '0-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '0-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A (Cont.)',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },

  // Day 1: Martes
  '1-10:00': {
    type: 'Presencial / Teoría',
    subject: 'Matemáticas – Sección 2B',
    courseName: 'Matemáticas',
    section: '2B',
    room: 'Aula 104',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '10:00 - 12:00 (Bloque 2h)',
    startTime: '10:00 AM',
    endTime: '12:00 PM'
  },
  '1-11:00': {
    type: 'Presencial / Teoría',
    subject: 'Matemáticas – Sección 2B (Cont.)',
    courseName: 'Matemáticas',
    section: '2B',
    room: 'Aula 104',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '10:00 - 12:00 (Bloque 2h)',
    startTime: '10:00 AM',
    endTime: '12:00 PM'
  },

  // Day 2: Miércoles
  '2-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '2-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A (Cont.)',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },

  // Day 3: Jueves
  '3-10:00': {
    type: 'Presencial / Teoría',
    subject: 'Matemáticas – Sección 2B',
    courseName: 'Matemáticas',
    section: '2B',
    room: 'Aula 104',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '10:00 - 12:00 (Bloque 2h)',
    startTime: '10:00 AM',
    endTime: '12:00 PM'
  },
  '3-11:00': {
    type: 'Presencial / Teoría',
    subject: 'Matemáticas – Sección 2B (Cont.)',
    courseName: 'Matemáticas',
    section: '2B',
    room: 'Aula 104',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '10:00 - 12:00 (Bloque 2h)',
    startTime: '10:00 AM',
    endTime: '12:00 PM'
  },

  // Day 4: Viernes
  '4-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '4-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A (Cont.)',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
};

// ─── Horario explícito ALUMNO (Frederick Rodas - Sección 3A) ────────────────
const studentScheduleBlocks = {
  // Day 0: Lunes
  '0-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '0-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A (Cont.)',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },

  // Day 1: Martes
  '1-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Literatura – Sección 3A',
    courseName: 'Literatura',
    section: '3A',
    room: 'Aula 102',
    teacher: 'Prof. César Vallejo',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '1-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Literatura – Sección 3A (Cont.)',
    courseName: 'Literatura',
    section: '3A',
    room: 'Aula 102',
    teacher: 'Prof. César Vallejo',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },

  // Day 2: Miércoles
  '2-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '2-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A (Cont.)',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },

  // Day 3: Jueves
  '3-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Literatura – Sección 3A',
    courseName: 'Literatura',
    section: '3A',
    room: 'Aula 102',
    teacher: 'Prof. César Vallejo',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '3-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Literatura – Sección 3A (Cont.)',
    courseName: 'Literatura',
    section: '3A',
    room: 'Aula 102',
    teacher: 'Prof. César Vallejo',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },

  // Day 4: Viernes
  '4-08:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
  '4-09:00': {
    type: 'Presencial / Teoría',
    subject: 'Física – Sección 3A (Cont.)',
    courseName: 'Física',
    section: '3A',
    room: 'Aula 201',
    teacher: 'Prof. Jhon Wick',
    mode: 'in Class',
    time: '08:00 - 10:00 (Bloque 2h)',
    startTime: '08:00 AM',
    endTime: '10:00 AM'
  },
};

// ─── Cabecera minimalista del Horario ─────────────────────────────────────────
const ScheduleHeader = ({ title = 'Horario de Clases Semanal' }) => (
  <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5">
    <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
      {title}
    </h1>
  </div>
);

// ─── Barra de recreo/break ──────────────────────────────────────────────────
const BreakRow = ({ colSpan }) => (
  <div
    className="border-t border-gray-200 flex flex-col justify-center items-center py-2 font-semibold text-gray-800 bg-gray-100"
    style={{ gridColumn: `1 / span ${colSpan}` }}
  >
    <span className="text-sm font-bold">Recreo / Receso General</span>
    <span className="text-xs font-normal text-gray-500">12:00 – 13:00</span>
  </div>
);

const ScheduleView = ({ embedded = false }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const { user } = useAuth();

  const isTeacher = user?.role === 'teacher';
  const roleLabel = isTeacher ? 'Docente' : 'Alumno';
  const scheduleTitle = isTeacher ? 'Horario de Dictado Semanal' : 'Horario de Clases Semanal';

  // Días de la semana: Lunes a Viernes (5 días hábiles exactos)
  const todayDate = new Date();
  const today = format(todayDate, "EEEE dd 'de' MMMM yyyy", { locale: es });
  const weekStart = startOfWeek(todayDate, { weekStartsOn: 1 }); // Comienza en Lunes

  const days = Array.from({ length: 5 }).map((_, i) => {
    const date = addDays(weekStart, i);
    return {
      label: format(date, "EEEE dd/MM", { locale: es }),
      fullDateLabel: format(date, "EEEE, dd 'de' MMMM", { locale: es }),
      date,
      isToday: isToday(date),
    };
  });

  const todayDayIndex = new Date().getDay() - 1;
  const adjustedDayIndex = todayDayIndex < 0 || todayDayIndex > 4 ? 0 : todayDayIndex;

  // Resolución de slot: estrictamente en blanco por defecto si no está explícitamente asignado
  const getSlot = (dayIdx, time) => {
    const key = `${dayIdx}-${time}`;
    if (isTeacher) {
      return teacherScheduleBlocks[key] || null;
    } else {
      return studentScheduleBlocks[key] || null;
    }
  };

  const handleCardClick = (slot, day, time) => {
    const startHour = time ? time.split(':')[0] : '08';
    const endHourNum = (parseInt(startHour, 10) + 2) % 24;
    const endHour = `${String(endHourNum).padStart(2, '0')}:00`;

    const cleanCourse = slot?.subject
      ? slot.subject.replace(/\(Cont\.\)/i, '').trim()
      : 'Asignatura';

    const teacherName = typeof slot?.teacher === 'object'
      ? slot.teacher.name
      : (slot?.teacher || (isTeacher ? user?.name : 'Prof. Jhon Wick'));

    setSelectedClass({
      course: cleanCourse,
      timeBlock: slot?.time || `${time} - ${endHour} (Bloque 2h)`,
      type: 'Presencial',
      teacher: teacherName,
    });
  };

  const DayHeader = ({ day }) => (
    <div
      className="p-2 sm:p-2.5 text-center font-bold text-xs sm:text-sm capitalize border-l border-gray-200 select-none truncate"
      style={
        day.isToday
          ? { backgroundColor: RED, color: 'white' }
          : { backgroundColor: '#F9FAFB', color: '#374151' }
      }
    >
      {day.label}
    </div>
  );

  // VISTA SEMANA (Lunes a Viernes = 5 columnas simétricas + 1 columna hora) sin scroll horizontal
  const WeekView = () => (
    <div className="w-full">
      <div className="grid grid-cols-[56px_repeat(5,minmax(0,1fr))] w-full border border-gray-300 rounded-none bg-white">
        <div className="bg-gray-50 border-b border-gray-200" />
        {days.map((day) => (
          <DayHeader key={day.label} day={day} />
        ))}

        {TIMES.map((time) => (
          <React.Fragment key={time}>
            {/* Hora */}
            <div className="border-t border-gray-200 px-1 py-3 text-xs font-semibold text-gray-500 bg-gray-50 flex items-start justify-center">
              {time}
            </div>

            {/* Días (0 a 4: Lunes a Viernes) */}
            {days.map((day, dayIdx) => {
              const slot = getSlot(dayIdx, time);
              return (
                <div
                  key={dayIdx}
                  className="border-t border-l border-gray-200 p-1 sm:p-1.5 min-h-[85px] bg-white transition-colors hover:bg-gray-50/50 overflow-hidden"
                >
                  {slot ? (
                    <ScheduleCard
                      slot={slot}
                      time={time}
                      onClick={() => handleCardClick(slot, day, time)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-300 select-none">
                      —
                    </div>
                  )}
                </div>
              );
            })}

            {/* Barra de recreo entre 12:00 y 13:00 */}
            {time === '12:00' && <BreakRow colSpan={6} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // VISTA DÍA
  const DayView = () => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-[80px_1fr]">
          <div className="bg-gray-50 border-b border-gray-200" />
          <div
            className="p-2 text-center font-semibold text-sm text-white border-b border-gray-200 capitalize"
            style={{ backgroundColor: RED }}
          >
            {today}
          </div>

          {TIMES.map((time) => {
            const slot = getSlot(adjustedDayIndex, time);
            const currentDayObj = days[adjustedDayIndex] || { label: today, fullDateLabel: today };
            return (
              <React.Fragment key={time}>
                <div className="border-t border-gray-100 px-2 py-3 text-xs font-semibold text-gray-500 bg-gray-50 flex items-start justify-center">
                  {time}
                </div>
                <div className="border-t border-gray-100 p-2 bg-white flex items-center min-h-[90px]">
                  {slot ? (
                    <ScheduleCard
                      slot={slot}
                      time={time}
                      onClick={() => handleCardClick(slot, currentDayObj, time)}
                    />
                  ) : (
                    <span className="text-xs text-gray-300 italic pl-3">Bloque libre (Sin clases asignadas)</span>
                  )}
                </div>

                {time === '12:00' && (
                  <>
                    <div className="border-t border-gray-100 bg-gray-50" />
                    <div className="border-t border-gray-100 bg-gray-100 flex flex-col items-center justify-center py-2">
                      <span className="text-sm font-semibold text-gray-800">Recreo / Receso General</span>
                      <span className="text-xs text-gray-500">12:00 – 13:00</span>
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const content = (
    <div className={`bg-white rounded-none overflow-hidden border border-gray-300 ${embedded ? '' : 'mb-4'}`}>
      <ScheduleHeader title={scheduleTitle} />

      <div className="p-3 sm:p-4 w-full">
        {/* Horario con scroll horizontal */}
        <WeekView />
      </div>

      {/* ─── Modal: Detalle de Clase Simplificado ─── */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera limpia sin logotipo ni nombre de academia */}
            <div
              className="px-5 py-3.5 text-white flex items-center justify-between"
              style={{ backgroundColor: RED }}
            >
              <div>
                <h3 className="text-base font-bold leading-tight">Detalle de Clase</h3>
                <p className="text-xs text-red-100">{selectedClass.course}</p>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-1 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Cerrar ventana"
              >
                <X size={18} />
              </button>
            </div>

            {/* Consulta de horario, tipo y docente */}
            <div className="p-5 space-y-3 text-sm">
              <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
                {/* Horario y Bloque */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Horario:
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {selectedClass.timeBlock || '08:00 - 10:00 (Bloque 2h)'}
                  </span>
                </div>

                {/* Tipo / Modalidad */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50/50">
                  <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Tipo:
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    Presencial
                  </span>
                </div>

                {/* Profesor asignado */}
                <div className="flex items-center justify-between px-4 py-3 bg-white">
                  <span className="font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Profesor:
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {selectedClass.teacher}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón simple de Cerrar */}
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors shadow-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Layout currentPage={isTeacher ? 'Horario de Dictado' : 'Horario de Clases'}>
      {content}
    </Layout>
  );
};

export default ScheduleView;
