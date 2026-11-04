import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import ScheduleCard from './ScheduleCard';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';

// ─── Constantes institucionales ─────────────────────────────────────────────
const INSTITUTION_NAME = 'Academia Apu San Antonio de Andahuaylas';
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
};

// ─── Cabecera institucional superior ─────────────────────────────────────────
const InstitutionHeader = ({ user, roleLabel, scheduleTitle }) => (
  <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-center gap-3">
        <img
          src="/image/imagenacademia.png"
          alt="Academia Apu San Antonio de Andahuaylas"
          className="w-10 h-10 object-contain rounded-full bg-white p-0.5 border border-gray-200"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {INSTITUTION_NAME}
          </p>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">
            {scheduleTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span className="font-semibold text-gray-800">{user?.name}</span>
        <span
          className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: RED }}
        >
          {roleLabel} {user?.class ? `(Sección ${user.class})` : ''}
        </span>
      </div>
    </div>
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

  // Días de la semana: Lunes a Domingo (7 días)
  const todayDate = new Date();
  const today = format(todayDate, "EEEE dd 'de' MMMM yyyy", { locale: es });
  const weekStart = startOfWeek(todayDate, { weekStartsOn: 1 }); // Comienza en Lunes

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i);
    return {
      label: format(date, "EEEE dd/MM", { locale: es }),
      fullDateLabel: format(date, "EEEE, dd 'de' MMMM", { locale: es }),
      date,
      isToday: isToday(date),
    };
  });

  const todayDayIndex = new Date().getDay() - 1;
  const adjustedDayIndex = todayDayIndex === -1 ? 6 : todayDayIndex; // Domingo = 6

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
    const sectionMatch = slot.subject?.match(/Sección\s*([0-9A-Za-z]+)/i);
    const section = slot.section || (sectionMatch ? sectionMatch[1] : (user?.class || '3A'));

    const cleanCourse = slot.subject
      ? slot.subject.replace(/\(Cont\.\)/i, '').trim()
      : 'Asignatura';

    const startHour = time ? time.split(':')[0] : '08';
    const endHourNum = (parseInt(startHour, 10) + 2) % 24;
    const endHour = `${String(endHourNum).padStart(2, '0')}:00`;

    const startTimeFormatted = slot.startTime || `${time} ${parseInt(startHour, 10) < 12 ? 'AM' : 'PM'}`;
    const endTimeFormatted = slot.endTime || `${endHour} ${endHourNum < 12 ? 'AM' : 'PM'}`;

    setSelectedClass({
      course: cleanCourse,
      section: section,
      day: day.fullDateLabel || day.label || today,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
      room: slot.room || (cleanCourse.includes('Física') ? 'Aula 201' : 'Aula 102'),
      type: slot.type && slot.type !== 'Lecture' ? slot.type : 'Presencial / Teoría',
      teacher: typeof slot.teacher === 'object' ? slot.teacher.name : (slot.teacher || (isTeacher ? user?.name : 'Prof. Jhon Wick')),
    });
  };

  const DayHeader = ({ day }) => (
    <div
      className="p-2 text-center font-semibold text-xs sm:text-sm capitalize border-l border-gray-200"
      style={
        day.isToday
          ? { backgroundColor: RED, color: 'white' }
          : { backgroundColor: '#F9FAFB', color: '#374151' }
      }
    >
      {day.label}
    </div>
  );

  // VISTA SEMANA (Lunes a Domingo = 7 columnas + 1 hora = 8 columnas)
  const WeekView = () => (
    <div className="grid grid-cols-[70px_repeat(7,1fr)] border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-50 border-b border-gray-200" />
      {days.map((day) => (
        <DayHeader key={day.label} day={day} />
      ))}

      {TIMES.map((time) => (
        <React.Fragment key={time}>
          {/* Hora */}
          <div className="border-t border-gray-100 px-2 py-3 text-xs font-semibold text-gray-500 bg-gray-50 flex items-start justify-center">
            {time}
          </div>

          {/* Días (0 a 6: Lunes a Domingo) */}
          {days.map((day, dayIdx) => {
            const slot = getSlot(dayIdx, time);
            return (
              <div
                key={dayIdx}
                className="border-t border-l border-gray-100 p-1.5 min-h-[90px] bg-white transition-colors hover:bg-gray-50/50"
              >
                {slot ? (
                  <ScheduleCard
                    slot={slot}
                    time={time}
                    onClick={() => handleCardClick(slot, day, time)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-200 select-none">
                    —
                  </div>
                )}
              </div>
            );
          })}

          {/* Barra de recreo entre 12:00 y 13:00 */}
          {time === '12:00' && <BreakRow colSpan={8} />}
        </React.Fragment>
      ))}
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
    <div className={`bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm ${embedded ? '' : 'mb-4'}`}>
      <InstitutionHeader
        user={user}
        roleLabel={roleLabel}
        scheduleTitle={scheduleTitle}
      />

      <div className="p-3 sm:p-4 max-w-7xl mx-auto">
        {/* Horario */}
        <WeekView />
      </div>

      {/* ─── Modal: Detalle de Clase (Inspirado en el Portal Institucional UNAJMA) ─── */}
      {selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera institucional estilo portal UNAJMA */}
            <div
              className="px-6 py-4 text-white flex items-center justify-between"
              style={{ backgroundColor: RED }}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/image/imagenacademia.png"
                  alt="Academia Apu San Antonio"
                  className="w-10 h-10 object-contain rounded-full bg-white p-0.5 border border-white/20"
                />
                <div>
                  <h3 className="text-base font-bold leading-tight">Detalle de Clase</h3>
                  <p className="text-xs text-red-100">Portal Institucional UNAJMA · Academia Apu</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Cerrar ventana"
              >
                <X size={18} />
              </button>
            </div>

            {/* Campos estructurados limpios de texto */}
            <div className="p-6 space-y-3 text-sm">
              <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
                {/* Curso */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-gray-50/50">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Curso:
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {selectedClass.course}
                  </span>
                </div>

                {/* Sección */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-white">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Sección:
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedClass.section}
                  </span>
                </div>

                {/* Fecha / Día */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-gray-50/50">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Fecha / Día:
                  </span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {selectedClass.day}
                  </span>
                </div>

                {/* Horario */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-white">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Horario:
                  </span>
                  <span className="text-gray-800 font-medium">
                    <span className="text-gray-500 text-xs">Empieza:</span>{' '}
                    <strong className="text-gray-900">{selectedClass.startTime}</strong>{' '}
                    <span className="text-gray-400 mx-1">/</span>{' '}
                    <span className="text-gray-500 text-xs">Termina:</span>{' '}
                    <strong className="text-gray-900">{selectedClass.endTime}</strong>
                  </span>
                </div>

                {/* Salón */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-gray-50/50">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Salón:
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedClass.room}
                  </span>
                </div>

                {/* Tipo */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-white">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Tipo:
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                    {selectedClass.type}
                  </span>
                </div>

                {/* Profesor(es) */}
                <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 bg-gray-50/50">
                  <span className="w-36 font-semibold text-gray-600 text-xs uppercase tracking-wide">
                    Profesor(es):
                  </span>
                  <span className="font-bold text-gray-900">
                    {selectedClass.teacher}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón simple de "Cerrar" en la esquina inferior derecha */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                className="px-5 py-2 text-xs font-semibold rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors shadow-xs"
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
