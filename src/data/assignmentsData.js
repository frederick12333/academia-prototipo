import { courses, users } from './mockData';

// Helpers seguros para cursos y usuarios
const safeCourses = Array.isArray(courses) ? courses : [];
const safeUsers = Array.isArray(users) ? users : [];

const getCourse = (name) => safeCourses.find(course => course && course.name === name) || null;

const fisicaCourse = getCourse('Física');
const matematicasCourse = getCourse('Matemáticas');
const literaturaCourse = getCourse('Literatura');

export const assignments = [
  {
    id: '1',
    assignmentId: 'FIS-301',
    classId: '3A',
    className: '3A',
    courseName: 'Física',
    course: fisicaCourse,
    title: 'Guía Práctica N° 1 - Vectores y Cinemática',
    deadline: '2026-11-10',
    time: '10:00',
    status: 'upcoming',
    grade: 20,
    description: 'Resolver los ejercicios de cinemática y vectores en el cuaderno de trabajo.',
    message: 'Presentar el cuaderno de trabajo en la sesión presencial de aula.',
    fileName: 'Guia_Fisica_Vectores_3A.pdf',
    fileSize: '850 KB'
  },
  {
    id: '2',
    assignmentId: 'MAT-201',
    classId: '2B',
    className: '2B',
    courseName: 'Matemáticas',
    course: matematicasCourse,
    title: 'Ficha de Ejercicios N° 1 - Polinomios y Factorización',
    deadline: '2026-11-12',
    time: '12:00',
    status: 'upcoming',
    grade: 20,
    description: 'Desarrollar los problemas de factorización de polinomios.',
    message: 'Traer el cuaderno para revisión presencial.',
    fileName: 'Separata_Polinomios_2B.pdf',
    fileSize: '1.1 MB'
  },
  {
    id: '3',
    assignmentId: 'LIT-301',
    classId: '3A',
    className: '3A',
    courseName: 'Literatura',
    course: literaturaCourse,
    title: 'Análisis Literario - Obra Ollantay',
    deadline: '2026-11-16',
    time: '10:00',
    status: 'upcoming',
    grade: 20,
    description: 'Redactar el análisis en hojas cuadriculadas para revisión física.',
    message: 'Entrega en la fecha y hora indicadas.',
    fileName: 'Analisis_Literatura_3A.pdf',
    fileSize: '750 KB'
  },
  {
    id: '4',
    assignmentId: 'FIS-302',
    classId: '3A',
    className: '3A',
    courseName: 'Física',
    course: fisicaCourse,
    title: 'Práctica Dirigida - Leyes de Newton',
    deadline: '2026-10-25',
    time: '10:00',
    status: 'previous',
    grade: 20,
    description: 'Ejercicios aplicativos de la primera y segunda ley de Newton.',
    message: 'Evaluación y calificación física completada.',
    fileName: 'Leyes_de_Newton_Practica.pdf',
    fileSize: '920 KB'
  }
];

// Obtención segura de alumnos (Frederick Rodas y compañeros)
const studentUsers = safeUsers.filter(u => u && u.role === 'student');

export const submissions = studentUsers.map((st, idx) => ({
  id: String(idx + 1),
  studentId: st?.id ?? (idx + 1),
  studentName: st?.name ?? 'Alumno',
  avatar: st?.avatar ?? '',
  fileName: `tarea_${st?.id ?? idx + 1}_solucion.pdf`,
  status: idx % 2 === 0 ? 'submitted' : 'not-submitted',
  grade: idx % 2 === 0 ? '16.5' : '',
  submissionDate: '2026-10-24'
}));

export const submissionsFull = (assignments || []).map((assignment, idx) => {
  const isPrevious = assignment?.deadline ? new Date(assignment.deadline) < new Date() : false;
  if (idx % 2 === 1) {
    return {
      id: String(idx + 1),
      assignmentId: assignment?.id ?? String(idx + 1),
      status: 'not-submitted'
    };
  }
  return {
    id: String(idx + 1),
    assignmentId: assignment?.id ?? String(idx + 1),
    fileName: `tarea_${assignment?.id ?? idx + 1}.pdf`,
    status: 'submitted',
    grade: '16.0',
    submissionDate: '2026-10-24'
  };
});
