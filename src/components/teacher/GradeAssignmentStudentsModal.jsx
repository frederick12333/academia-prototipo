import React, { useState } from 'react';
import { X, Award, Check, Download, ClipboardCheck } from 'lucide-react';
import { users } from '../../data/mockData';
import { useAcademic } from '../../contexts/AcademicContext';

const RED = '#C0392B';

export const GradeAssignmentStudentsModal = ({ isOpen, onClose, assignment }) => {
  const { updateAssessmentGrades, gradesMatrix } = useAcademic();

  if (!isOpen || !assignment) return null;

  const classStudents = users
    .filter(u => u.role === 'student' && (!assignment.className || u.class === assignment.className || assignment.className === 'All'))
    .sort((a, b) => a.name.localeCompare(b.name));

  const [studentScores, setStudentScores] = useState(() => {
    const initial = {};
    classStudents.forEach(st => {
      const taskGrade = assignment.grades?.[st.id];
      const matrixGrade = gradesMatrix?.[st.id]?.[assignment.courseName]?.['tareas'];
      const grade = taskGrade !== undefined ? taskGrade : (matrixGrade !== undefined ? matrixGrade : 16.0);
      initial[st.id] = grade !== null && grade !== undefined ? grade : '';
    });
    return initial;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleScoreChange = (studentId, value) => {
    let numVal = value;
    if (value !== '') {
      numVal = Math.min(20, Math.max(0, parseFloat(value) || 0));
    }
    setStudentScores(prev => ({
      ...prev,
      [studentId]: numVal
    }));
  };

  const handleSaveGrades = (e) => {
    e.preventDefault();
    updateAssessmentGrades('assignment', assignment.id, studentScores);
    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([
      `GUÍA DE TRABAJO - ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS\n` +
      `Curso: ${assignment.courseName}\n` +
      `Tarea: ${assignment.title}\n` +
      `Clase: ${assignment.className}\n` +
      `Fecha de Entrega: ${assignment.deadline}\n\n` +
      `INDICACIONES:\n${assignment.instructions}\n`
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = assignment.fileName || `Tarea_${assignment.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-gray-200">
        {/* Cabecera */}
        <div className="px-6 py-4 flex items-center justify-between text-white" style={{ backgroundColor: RED }}>
          <div className="flex items-center gap-2">
            <ClipboardCheck size={20} />
            <div>
              <h3 className="font-bold text-base">Calificar Tarea / Cuaderno (Escala Vigesimal 0 – 20)</h3>
              <p className="text-xs text-red-100">{assignment.title} • {assignment.courseName} • Clase {assignment.className}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSaveGrades} className="p-6 max-h-[80vh] overflow-y-auto space-y-4 text-gray-800">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-bold text-gray-700">Límite de Revisión: </span>
              <span className="text-gray-600">{assignment.deadline.replace('T', ' ')}</span>
            </div>
            <button
              type="button"
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md font-semibold text-xs transition-colors shadow-sm"
            >
              <Download size={14} style={{ color: RED }} />
              Descargar Ficha ({assignment.fileName})
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Ingresa la nota de revisión física del cuaderno o separata (0 a 20). Al guardar, se sincroniza bidireccionalmente con la columna <strong>Tareas</strong> del registro general de notas.
          </p>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-gray-700">
                  <th className="py-2.5 px-4 text-left text-xs font-bold uppercase tracking-wider">Alumno</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold uppercase tracking-wider">Clase</th>
                  <th className="py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider w-36">
                    Nota (0 – 20)
                  </th>
                  <th className="py-2.5 px-4 text-center text-xs font-bold uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-400">
                      No hay alumnos en la clase {assignment.className}.
                    </td>
                  </tr>
                ) : (
                  classStudents.map((st, i) => {
                    const score = studentScores[st.id];
                    const numScore = score !== '' && score !== null && !isNaN(score) ? Number(score) : null;
                    const isApproved = numScore !== null && numScore >= 10.5;

                    return (
                      <tr key={st.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={st.avatar}
                              alt={st.name}
                              className="w-7 h-7 rounded-full object-cover border border-gray-200"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(st.name)}&background=C0392B&color=fff&size=28`;
                              }}
                            />
                            <div>
                              <div className="font-semibold text-gray-900 leading-tight">{st.name}</div>
                              <div className="text-[11px] text-gray-400">ID: {st.id}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-2.5 px-3 text-center text-xs font-medium text-gray-600">
                          {st.class || assignment.className}
                        </td>

                        <td className="py-2.5 px-4 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={score ?? ''}
                            onChange={(e) => handleScoreChange(st.id, e.target.value)}
                            placeholder="0 - 20"
                            className="w-20 px-2 py-1 text-center font-bold text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                          />
                        </td>

                        <td className="py-2.5 px-4 text-center">
                          {numScore !== null ? (
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                isApproved
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {isApproved ? 'Aprobado' : 'Desaprobado'}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">Sin nota</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <div>
              {savedSuccess && (
                <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
                  <Check size={14} /> Notas sincronizadas en la columna Tareas
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90 shadow-sm flex items-center gap-1.5"
                style={{ backgroundColor: RED }}
              >
                <Check size={16} />
                Guardar Calificaciones
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

