import React, { useState } from 'react';
import { courses, users } from '../../data/mockData';
import { useAcademic } from '../../contexts/AcademicContext';
import { Settings, Check, Edit2, AlertCircle } from 'lucide-react';
import { ConfigureWeightsModal } from './ConfigureWeightsModal';

const RED = '#C0392B';

export const GradesTableTeacher = ({ selectedCourse, selectedClass, searchTerm }) => {
  const { evaluationColumns, gradesMatrix, setStudentGrade } = useAcademic();

  const [editMode, setEditMode] = useState(false);
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [localGrades, setLocalGrades] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Obtener alumnos según filtros
  let students = users.filter(user => user.role === 'student');

  if (selectedClass !== 'All') {
    students = students.filter(student => student.class === selectedClass);
  }

  if (selectedCourse !== 'All') {
    const course = courses.find(c => c.name === selectedCourse);
    if (course) {
      students = students.filter(student =>
        course.students.some(s => s.id === student.id)
      );
    }
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    students = students.filter(student =>
      student.name.toLowerCase().includes(term) ||
      String(student.id).includes(term)
    );
  }

  students.sort((a, b) => a.name.localeCompare(b.name));

  // Entrar en modo edición cargando copia local
  const startEditMode = () => {
    const initial = {};
    students.forEach(st => {
      initial[st.id] = {};
      const courseName = selectedCourse === 'All' ? 'Matemáticas' : selectedCourse;
      evaluationColumns.forEach(col => {
        const val = gradesMatrix[st.id]?.[courseName]?.[col.id];
        initial[st.id][col.id] = val !== undefined && val !== null ? val : '';
      });
    });
    setLocalGrades(initial);
    setEditMode(true);
    setSaveSuccess(false);
  };

  const handleLocalGradeChange = (studentId, colId, value) => {
    let numVal = value;
    if (value !== '') {
      numVal = Math.min(20, Math.max(0, parseFloat(value) || 0));
    }
    setLocalGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [colId]: numVal
      }
    }));
  };

  const saveAllGrades = () => {
    const courseName = selectedCourse === 'All' ? 'Matemáticas' : selectedCourse;
    Object.entries(localGrades).forEach(([studentId, colMap]) => {
      Object.entries(colMap).forEach(([colId, score]) => {
        setStudentGrade(Number(studentId), courseName, colId, score);
      });
    });
    setEditMode(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Cálculo ponderado en base 20 para fila individual
  const calculateRowAverage = (studentId, courseName) => {
    let totalScoreWeighted = 0;
    let totalActiveWeight = 0;

    evaluationColumns.forEach(col => {
      let score = editMode
        ? localGrades[studentId]?.[col.id]
        : gradesMatrix[studentId]?.[courseName]?.[col.id];

      if (score !== undefined && score !== null && score !== '' && !isNaN(score)) {
        totalScoreWeighted += Number(score) * Number(col.weight);
        totalActiveWeight += Number(col.weight);
      }
    });

    if (totalActiveWeight === 0) return { average: null, status: 'N/D' };
    const avg = parseFloat((totalScoreWeighted / totalActiveWeight).toFixed(2));
    const status = avg >= 10.5 ? 'Aprobado' : 'Desaprobado';
    return { average: avg, status };
  };

  return (
    <div className="bg-white border border-gray-300 rounded-none overflow-hidden">
      {/* Barra de acciones de la tabla */}
      <div className="p-3.5 border-b border-gray-300 bg-gray-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
            Escala Vigesimal Oficial (0 – 20)
          </span>
          {saveSuccess && (
            <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-none border border-green-300 flex items-center gap-1">
              <Check size={14} /> ¡Notas guardadas y sincronizadas!
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsWeightsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-none border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Settings size={14} style={{ color: RED }} />
            Configurar Ponderaciones (%)
          </button>

          {!editMode ? (
            <button
              type="button"
              onClick={startEditMode}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-none text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: RED }}
            >
              <Edit2 size={14} />
              Editar Notas
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-none border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveAllGrades}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-none bg-green-700 text-white hover:bg-green-800 transition-colors"
              >
                <Check size={14} />
                Guardar Notas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Calificaciones Corporativa Plana */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ backgroundColor: RED }} className="text-white border-b border-red-800">
              <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-white">
                Alumno
              </th>
              <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-white border-l border-red-700/60">
                Clase
              </th>
              <th className="text-left py-3 px-3 text-xs font-bold uppercase tracking-wider text-white border-l border-red-700/60">
                Asignatura
              </th>

              {/* Columnas dinámicas de evaluación */}
              {evaluationColumns.map((col) => (
                <th
                  key={col.id}
                  className="text-center py-3 px-3 text-xs font-bold uppercase tracking-wider text-white border-l border-red-700/60"
                >
                  <div>{col.name}</div>
                  <div className="text-[10px] font-normal text-red-200">({col.weight}%)</div>
                </th>
              ))}

              <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-white border-l border-red-700/60 bg-black/10">
                Promedio
              </th>
              <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-white border-l border-red-700/60">
                Estado
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={evaluationColumns.length + 5} className="py-8 text-center text-gray-400 bg-white">
                  No se encontraron alumnos para los filtros seleccionados.
                </td>
              </tr>
            ) : (
              students.map((student, idx) => {
                const courseName = selectedCourse === 'All' ? 'Matemáticas' : selectedCourse;
                const { average, status } = calculateRowAverage(student.id, courseName);

                return (
                  <tr
                    key={student.id}
                    className={`border-b border-gray-200 transition-colors hover:bg-gray-100/60 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    {/* Alumno */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-none object-cover border border-gray-300"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=C0392B&color=fff&size=32`;
                          }}
                        />
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight">{student.name}</div>
                          <div className="text-[11px] text-gray-500 font-mono">ID: {student.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Clase */}
                    <td className="py-2.5 px-3 border-l border-gray-200">
                      <span className="px-2 py-0.5 rounded-none text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300">
                        {student.class || 'N/D'}
                      </span>
                    </td>

                    {/* Asignatura */}
                    <td className="py-2.5 px-3 border-l border-gray-200 text-gray-700 font-medium">{courseName}</td>

                    {/* Columnas de evaluación */}
                    {evaluationColumns.map((col) => {
                      const currentVal = editMode
                        ? localGrades[student.id]?.[col.id]
                        : gradesMatrix[student.id]?.[courseName]?.[col.id];

                      const displayVal = currentVal !== undefined && currentVal !== null && currentVal !== ''
                        ? Number(currentVal).toFixed(1)
                        : '-';

                      return (
                        <td key={col.id} className="py-2 px-2 text-center border-l border-gray-200">
                          {editMode ? (
                            <input
                              type="number"
                              min="0"
                              max="20"
                              step="0.5"
                              value={localGrades[student.id]?.[col.id] ?? ''}
                              onChange={(e) => handleLocalGradeChange(student.id, col.id, e.target.value)}
                              placeholder="0 - 20"
                              className="w-16 p-1 text-center font-bold text-sm bg-white border border-gray-300 rounded-none focus:outline-none focus:border-red-600"
                            />
                          ) : (
                            <span
                              className={`text-sm font-semibold ${
                                currentVal !== null && currentVal !== undefined && currentVal !== ''
                                  ? Number(currentVal) >= 10.5
                                    ? 'text-gray-900'
                                    : 'text-red-700'
                                  : 'text-gray-400'
                              }`}
                            >
                              {displayVal}
                            </span>
                          )}
                        </td>
                      );
                    })}

                    {/* Promedio */}
                    <td className="py-2.5 px-4 text-center border-l border-gray-200 bg-gray-100/50">
                      {average !== null ? (
                        <span
                          className={`text-sm font-bold px-2.5 py-0.5 rounded-none border ${
                            average >= 10.5
                              ? 'text-green-800 bg-green-50 border-green-300'
                              : 'text-red-800 bg-red-50 border-red-300'
                          }`}
                        >
                          {average.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Estado */}
                    <td className="py-2.5 px-4 text-center border-l border-gray-200">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-none border ${
                          status === 'Aprobado'
                            ? 'text-green-700 bg-green-50 border-green-300'
                            : status === 'Desaprobado'
                            ? 'text-red-700 bg-red-50 border-red-300'
                            : 'text-gray-400 border-gray-300'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de configuración de ponderaciones */}
      <ConfigureWeightsModal
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
      />
    </div>
  );
};

export default GradesTableTeacher;
