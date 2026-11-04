import React, { useMemo } from 'react';
import { Bell } from 'lucide-react';
import { assignments } from '../../data/assignmentsData';
import { exams, courses } from '../../data/mockData';
import { format, isToday, startOfToday, isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const safeDate = (dateVal) => {
  if (!dateVal) return new Date();
  const d = new Date(dateVal);
  return isValid(d) ? d : new Date();
};

const DeadlinesSideList = () => {
  const navigate = useNavigate();

  const deadlines = useMemo(() => {
    const safeAssignments = Array.isArray(assignments) ? assignments : [];
    const safeExams = Array.isArray(exams) ? exams : [];
    const safeCourses = Array.isArray(courses) ? courses : [];

    const allDeadlines = [
      ...safeAssignments.map(assignment => {
        const course = safeCourses.find(c => c && c.name === assignment.courseName);
        const d = safeDate(assignment.deadline);
        return {
          id: `assignment-${assignment.id}`,
          title: assignment.title || 'Tarea',
          subject: course?.name || assignment.courseName || 'Asignatura',
          deadline: isValid(d) ? `${format(d, 'HH:mm')} del ${format(d, 'dd/MM/yyyy')}` : 'Por definir',
          details: assignment.description || '',
          mode: 'Tarea',
          date: d,
          type: 'assignment'
        };
      }),
      ...safeExams.map(exam => {
        const d = safeDate(`${exam.date}T${exam.time?.slice(0, 5) || '08:00'}`);
        return {
          id: `exam-${exam.id}`,
          title: exam.title || 'Evaluación',
          subject: exam.course?.name || exam.courseName || 'Asignatura',
          deadline: isValid(d) ? `${exam.time || ''} del ${format(d, 'dd/MM/yyyy')}` : 'Por definir',
          details: exam.instructions || exam.description || '',
          mode: exam.isOnline ? 'En línea' : 'Presencial',
          date: d,
          type: 'exam'
        };
      })
    ];

    const todayStart = startOfToday();
    return allDeadlines
      .filter(deadline => deadline.date >= todayStart)
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);
  }, []);

  const handleViewClick = (deadline) => {
    const path = deadline.type === 'assignment' ? '/student/assignments' : '/student/exams';
    navigate(`${path}?search=${encodeURIComponent(deadline.title)}`);
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">Próximas entregas</h3>
        <Bell className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-2">
        {deadlines.length === 0 ? (
          <p className="text-xs text-gray-400 py-3 text-center">No hay entregas pendientes próximas.</p>
        ) : (
          deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`p-3 rounded-lg border-l-4 ${
                isToday(deadline.date) ? 'border-red-600 bg-red-50' : 'border-gray-300 bg-gray-50'
              } hover:bg-gray-100 transition-colors`}
            >
              <div className="flex flex-col">
                <h4 className={`font-semibold ${isToday(deadline.date) ? 'text-red-700' : 'text-gray-900'} text-xs`}>
                  {deadline.title}
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5">{deadline.deadline}</p>
                <p className="text-xs font-bold text-gray-800 my-1">{deadline.subject}</p>
                {deadline.details && (
                  <p className="text-[11px] text-gray-600 line-clamp-2">{deadline.details}</p>
                )}
                <span className="text-[10px] font-semibold text-red-700 mt-1">{deadline.mode}</span>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleViewClick(deadline)}
                  className="px-3 py-1 bg-red-700 text-white text-xs font-medium rounded hover:bg-red-800 transition-colors"
                >
                  Ver
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeadlinesSideList;
