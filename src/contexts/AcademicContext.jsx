import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_EVALUATION_COLUMNS,
  initialGradesMatrix
} from '../data/mockData';

const AcademicContext = createContext(null);
const DATA_VERSION = 'apu_data_v4';

// ─── Evaluaciones Físicas Iniciales ──────────────────────────────────────────
const defaultExamsData = [
  {
    id: 1,
    title: 'Primer Examen',
    evaluationTypeId: 'primer_examen',
    courseId: 1,
    courseName: 'Física',
    className: '3A',
    date: '2026-11-12',
    time: '08:00 - 10:00',
    duration: 120,
    location: 'Aula 201 - Pabellón Apu San Antonio',
    instructions: 'Evaluación física presencial escrita. Traer lápiz 2B y carné estudiantil.',
    fileName: 'Examen_Fisica_U1_3A.pdf',
    fileSize: '1.2 MB',
    grades: { 3: 16.5, 4: 15.0, 5: 14.0, 6: 17.5 }
  },
  {
    id: 2,
    title: 'Primer Examen',
    evaluationTypeId: 'primer_examen',
    courseId: 2,
    courseName: 'Matemáticas',
    className: '2B',
    date: '2026-11-14',
    time: '10:00 - 12:00',
    duration: 120,
    location: 'Aula 104 - Pabellón San Antonio',
    instructions: 'Evaluación física de operaciones y ecuaciones algebraicas.',
    fileName: 'Examen_Matematicas_U1_2B.pdf',
    fileSize: '1.5 MB',
    grades: { 7: 15.5, 8: 16.0, 9: 13.5, 10: 18.0 }
  },
  {
    id: 3,
    title: 'Primer Examen',
    evaluationTypeId: 'primer_examen',
    courseId: 3,
    courseName: 'Literatura',
    className: '3A',
    date: '2026-11-18',
    time: '08:00 - 10:00',
    duration: 120,
    location: 'Aula 201 - Pabellón Apu',
    instructions: 'Evaluación física de lectura comprensiva y corrientes literarias.',
    fileName: 'Examen_Literatura_U1_3A.pdf',
    fileSize: '980 KB',
    grades: { 3: 18.0, 4: 16.0, 5: 15.5, 6: 19.0 }
  }
];

// ─── Tareas Híbridas Iniciales ───────────────────────────────────────────────
const defaultAssignmentsData = [
  {
    id: 1,
    title: 'Guía Práctica N° 1 - Vectores y Cinemática',
    courseId: 1,
    courseName: 'Física',
    className: '3A',
    deadline: '2026-11-10T10:00',
    instructions: 'Resolver los ejercicios en el cuaderno cuadriculado de trabajo para revisión física en aula.',
    fileName: 'Guia_Fisica_Vectores_3A.pdf',
    fileSize: '850 KB',
    grades: { 3: 17.0, 4: 16.0, 5: 14.5, 6: 18.0 }
  },
  {
    id: 2,
    title: 'Ficha de Ejercicios N° 1 - Polinomios y Factorización',
    courseId: 2,
    courseName: 'Matemáticas',
    className: '2B',
    deadline: '2026-11-11T12:00',
    instructions: 'Desarrollar los problemas de factorización en el cuaderno para revisión presencial.',
    fileName: 'Separata_Polinomios_2B.pdf',
    fileSize: '1.1 MB',
    grades: { 7: 16.0, 8: 17.5, 9: 15.0, 10: 16.5 }
  },
  {
    id: 3,
    title: 'Análisis Literario - Obra Ollantay',
    courseId: 3,
    courseName: 'Literatura',
    className: '3A',
    deadline: '2026-11-16T10:00',
    instructions: 'Redactar el análisis en hojas cuadriculadas para revisión física en clase.',
    fileName: 'Analisis_Literatura_3A.pdf',
    fileSize: '750 KB',
    grades: { 3: 17.5, 4: 16.5, 5: 15.0, 6: 18.5 }
  }
];

// Helper seguro de lectura de localStorage
const getStorageItem = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const AcademicProvider = ({ children }) => {
  // Inicialización limpia verificando versión y garantizando sincronización atómica
  const [evaluationColumns, setEvaluationColumns] = useState(() => {
    try {
      const v = localStorage.getItem('apu_data_version');
      if (v !== DATA_VERSION) {
        localStorage.setItem('apu_data_version', DATA_VERSION);
        localStorage.setItem('apu_evaluation_columns', JSON.stringify(DEFAULT_EVALUATION_COLUMNS));
        localStorage.setItem('apu_grades_matrix', JSON.stringify(initialGradesMatrix));
        localStorage.setItem('apu_exams_list', JSON.stringify(defaultExamsData));
        localStorage.setItem('apu_assignments_list', JSON.stringify(defaultAssignmentsData));
        return DEFAULT_EVALUATION_COLUMNS;
      }
      return getStorageItem('apu_evaluation_columns', DEFAULT_EVALUATION_COLUMNS);
    } catch {
      return DEFAULT_EVALUATION_COLUMNS;
    }
  });

  const [gradesMatrix, setGradesMatrix] = useState(() =>
    getStorageItem('apu_grades_matrix', initialGradesMatrix)
  );

  const [exams, setExams] = useState(() => {
    const list = getStorageItem('apu_exams_list', defaultExamsData);
    return Array.isArray(list) ? list : (defaultExamsData || []);
  });

  const [assignments, setAssignments] = useState(() => {
    const list = getStorageItem('apu_assignments_list', defaultAssignmentsData);
    return Array.isArray(list) ? list : (defaultAssignmentsData || []);
  });

  // Persistencia segura
  useEffect(() => {
    try {
      localStorage.setItem('apu_evaluation_columns', JSON.stringify(evaluationColumns));
    } catch (e) {
      console.warn('Error saving evaluation columns', e);
    }
  }, [evaluationColumns]);

  useEffect(() => {
    try {
      localStorage.setItem('apu_grades_matrix', JSON.stringify(gradesMatrix));
    } catch (e) {
      console.warn('Error saving grades matrix', e);
    }
  }, [gradesMatrix]);

  useEffect(() => {
    try {
      localStorage.setItem('apu_exams_list', JSON.stringify(exams));
    } catch (e) {
      console.warn('Error saving exams list', e);
    }
  }, [exams]);

  useEffect(() => {
    try {
      localStorage.setItem('apu_assignments_list', JSON.stringify(assignments));
    } catch (e) {
      console.warn('Error saving assignments list', e);
    }
  }, [assignments]);

  // ─── Funciones de Ponderaciones ─────────────────────────────────────────────
  const updateWeights = (newColumns) => {
    const totalWeight = newColumns.reduce((sum, col) => sum + Number(col.weight || 0), 0);
    if (totalWeight > 100) {
      return { success: false, error: `La suma de ponderaciones no puede exceder el 100%. Actualmente suma ${totalWeight}%.` };
    }
    if (totalWeight !== 100) {
      return { success: false, error: `La suma de ponderaciones debe ser exactamente 100%. Actualmente suma ${totalWeight}%.` };
    }
    setEvaluationColumns(newColumns);
    return { success: true };
  };

  const addEvaluationColumn = (name, initialWeight = 0) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Date.now();
    const newCol = { id, name, weight: Number(initialWeight) };
    const updated = [...evaluationColumns, newCol];
    setEvaluationColumns(updated);

    setGradesMatrix(prev => {
      const clone = structuredClone(prev || {});
      Object.keys(clone).forEach(studentId => {
        if (clone[studentId]) {
          Object.keys(clone[studentId]).forEach(courseName => {
            if (clone[studentId][courseName] && clone[studentId][courseName][id] === undefined) {
              clone[studentId][courseName][id] = 16.0;
            }
          });
        }
      });
      return clone;
    });

    return newCol;
  };

  const removeEvaluationColumn = (columnId) => {
    if (evaluationColumns.length <= 1) {
      return { success: false, error: 'Debe mantenerse al menos una evaluación.' };
    }
    const updated = evaluationColumns.filter(c => c.id !== columnId);
    setEvaluationColumns(updated);
    return { success: true };
  };

  // ─── Actualización de Notas y Sincronización Bidireccional ───────────────────
  const setStudentGrade = (studentId, courseName, evaluationColId, score) => {
    const numScore = score === '' || score === null ? null : Math.min(20, Math.max(0, parseFloat(score)));

    setGradesMatrix(prev => {
      const next = structuredClone(prev || {});
      if (!next[studentId]) next[studentId] = {};
      if (!next[studentId][courseName]) next[studentId][courseName] = {};
      next[studentId][courseName][evaluationColId] = numScore;
      return next;
    });

    setExams(prev =>
      (prev || []).map(exam => {
        if (exam.courseName === courseName && exam.evaluationTypeId === evaluationColId) {
          return {
            ...exam,
            grades: {
              ...(exam.grades || {}),
              [studentId]: numScore
            }
          };
        }
        return exam;
      })
    );

    if (evaluationColId === 'tareas') {
      setAssignments(prev =>
        (prev || []).map(task => {
          if (task.courseName === courseName) {
            return {
              ...task,
              grades: {
                ...(task.grades || {}),
                [studentId]: numScore
              }
            };
          }
          return task;
        })
      );
    }
  };

  const updateAssessmentGrades = (assessmentType, assessmentId, newGradesMap) => {
    if (assessmentType === 'exam') {
      let targetExam = null;
      setExams(prev =>
        (prev || []).map(ex => {
          if (ex.id === assessmentId) {
            targetExam = { ...ex, grades: { ...(ex.grades || {}), ...newGradesMap } };
            return targetExam;
          }
          return ex;
        })
      );

      if (targetExam) {
        setGradesMatrix(prev => {
          const next = structuredClone(prev || {});
          Object.entries(newGradesMap).forEach(([studentId, score]) => {
            const numScore = score === '' || score === null ? null : Math.min(20, Math.max(0, parseFloat(score)));
            if (!next[studentId]) next[studentId] = {};
            if (!next[studentId][targetExam.courseName]) next[studentId][targetExam.courseName] = {};
            next[studentId][targetExam.courseName][targetExam.evaluationTypeId] = numScore;
          });
          return next;
        });
      }
    } else if (assessmentType === 'assignment') {
      let targetAssignment = null;
      setAssignments(prev =>
        (prev || []).map(task => {
          if (task.id === assessmentId) {
            targetAssignment = { ...task, grades: { ...(task.grades || {}), ...newGradesMap } };
            return targetAssignment;
          }
          return task;
        })
      );

      if (targetAssignment) {
        setGradesMatrix(prev => {
          const next = structuredClone(prev || {});
          Object.entries(newGradesMap).forEach(([studentId, score]) => {
            const numScore = score === '' || score === null ? null : Math.min(20, Math.max(0, parseFloat(score)));
            if (!next[studentId]) next[studentId] = {};
            if (!next[studentId][targetAssignment.courseName]) next[studentId][targetAssignment.courseName] = {};
            next[studentId][targetAssignment.courseName]['tareas'] = numScore;
          });
          return next;
        });
      }
    }
  };

  const addPhysicalExam = (examData) => {
    const newId = (exams && exams.length) ? Math.max(...exams.map(e => e.id)) + 1 : 1;
    const newExam = {
      ...examData,
      id: newId,
      grades: examData.grades || {}
    };
    setExams(prev => [newExam, ...(prev || [])]);

    if (examData.grades && Object.keys(examData.grades).length > 0) {
      updateAssessmentGrades('exam', newId, examData.grades);
    }
    return newExam;
  };

  const addPhysicalAssignment = (assignmentData) => {
    const newId = (assignments && assignments.length) ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    const newAssignment = {
      ...assignmentData,
      id: newId,
      grades: assignmentData.grades || {}
    };
    setAssignments(prev => [newAssignment, ...(prev || [])]);

    if (assignmentData.grades && Object.keys(assignmentData.grades).length > 0) {
      updateAssessmentGrades('assignment', newId, assignmentData.grades);
    }
    return newAssignment;
  };

  // ─── Promedio Ponderado en Base 20 ──────────────────────────────────────────
  const calculateStudentCourseAverage = (studentId, courseName) => {
    if (!gradesMatrix || !gradesMatrix[studentId]) {
      return { average: null, status: 'N/D' };
    }
    const studentCourseGrades = gradesMatrix[studentId][courseName];
    if (!studentCourseGrades) {
      return { average: null, status: 'N/D' };
    }

    let totalScoreWeighted = 0;
    let totalActiveWeight = 0;

    (evaluationColumns || []).forEach(col => {
      const score = studentCourseGrades[col.id];
      if (score !== undefined && score !== null && !isNaN(score)) {
        totalScoreWeighted += Number(score) * Number(col.weight);
        totalActiveWeight += Number(col.weight);
      }
    });

    if (totalActiveWeight === 0) return { average: null, status: 'N/D' };
    const average = parseFloat((totalScoreWeighted / totalActiveWeight).toFixed(2));
    const status = average >= 10.5 ? 'Aprobado' : 'Desaprobado';

    return { average, status };
  };

  return (
    <AcademicContext.Provider
      value={{
        evaluationColumns,
        updateWeights,
        addEvaluationColumn,
        removeEvaluationColumn,
        gradesMatrix,
        setStudentGrade,
        updateAssessmentGrades,
        exams,
        addPhysicalExam,
        assignments,
        addPhysicalAssignment,
        calculateStudentCourseAverage,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic debe ser usado dentro de un AcademicProvider');
  }
  return context;
};
