// Mock data limpio para la Academia Apu San Antonio de Andahuaylas

export const possibleClasses = ["3A", "2B"];

// ─── Ponderaciones y Columnas por Defecto para la Academia Apu San Antonio ──
export const DEFAULT_EVALUATION_COLUMNS = [
  { id: 'primer_examen', name: 'Primer Examen', weight: 20 },
  { id: 'segundo_examen', name: 'Segundo Examen', weight: 20 },
  { id: 'examen_parcial', name: 'Examen Parcial', weight: 20 },
  { id: 'tareas', name: 'Tareas', weight: 20 },
  { id: 'examen_final', name: 'Examen Final', weight: 20 },
];

export const initialGradesMatrix = {
  3: {
    'Física': { primer_examen: 16.5, segundo_examen: 15.0, examen_parcial: 16.0, tareas: 17.0, examen_final: 16.0 },
    'Literatura': { primer_examen: 18.0, segundo_examen: 17.0, examen_parcial: 17.5, tareas: 17.5, examen_final: 18.0 }
  },
  4: {
    'Física': { primer_examen: 15.0, segundo_examen: 14.5, examen_parcial: 15.0, tareas: 16.0, examen_final: 15.5 },
    'Literatura': { primer_examen: 16.0, segundo_examen: 16.5, examen_parcial: 15.5, tareas: 16.5, examen_final: 17.0 }
  },
  5: {
    'Física': { primer_examen: 14.0, segundo_examen: 14.0, examen_parcial: 13.5, tareas: 14.5, examen_final: 14.0 },
    'Literatura': { primer_examen: 15.5, segundo_examen: 15.0, examen_parcial: 14.5, tareas: 15.0, examen_final: 16.0 }
  },
  6: {
    'Física': { primer_examen: 17.5, segundo_examen: 18.0, examen_parcial: 17.0, tareas: 18.0, examen_final: 18.5 },
    'Literatura': { primer_examen: 19.0, segundo_examen: 18.5, examen_parcial: 19.0, tareas: 18.5, examen_final: 19.5 }
  },
  7: {
    'Matemáticas': { primer_examen: 15.5, segundo_examen: 15.0, examen_parcial: 16.0, tareas: 16.0, examen_final: 15.0 }
  },
  8: {
    'Matemáticas': { primer_examen: 16.0, segundo_examen: 17.0, examen_parcial: 16.5, tareas: 17.5, examen_final: 17.0 }
  },
  9: {
    'Matemáticas': { primer_examen: 13.5, segundo_examen: 14.0, examen_parcial: 14.0, tareas: 15.0, examen_final: 13.5 }
  },
  10: {
    'Matemáticas': { primer_examen: 18.0, segundo_examen: 18.5, examen_parcial: 17.5, tareas: 16.5, examen_final: 19.0 }
  }
};

export const users = [
  {
    id: 1,
    name: 'Jhon Wick',
    role: 'teacher',
    email: 'admin@titan.edu.tr',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+51 984 123 456',
    address: 'Andahuaylas, Apurímac',
    gender: 'Masculino',
  },
  {
    id: 2,
    name: 'Jhon Wick',
    role: 'teacher',
    status: 'Active',
    email: 'teacher@titan.edu.tr',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: '+51 984 123 456',
    address: 'Andahuaylas, Apurímac',
    gender: 'Masculino',
  },
  {
    id: 3,
    name: 'Frederick Rodas',
    role: 'student',
    status: 'Active',
    email: 'student@titan.edu.tr',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    grade: '3.° Secundaria',
    class: '3A',
    phone: '+51 983 654 321',
    address: 'Andahuaylas, Apurímac',
    gender: 'Masculino',
  },
  // Alumnos Sección 3A
  {
    id: 4,
    name: 'Camila Quispe',
    role: 'student',
    email: 'camila.quispe@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    grade: '3.° Secundaria',
    class: '3A',
  },
  {
    id: 5,
    name: 'Mateo Salazar',
    role: 'student',
    email: 'mateo.salazar@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    grade: '3.° Secundaria',
    class: '3A',
  },
  {
    id: 6,
    name: 'Valeria Rojas',
    role: 'student',
    email: 'valeria.rojas@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    grade: '3.° Secundaria',
    class: '3A',
  },
  // Alumnos Sección 2B
  {
    id: 7,
    name: 'Lucas Mendoza',
    role: 'student',
    email: 'lucas.mendoza@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    grade: '2.° Secundaria',
    class: '2B',
  },
  {
    id: 8,
    name: 'Sofia Huamán',
    role: 'student',
    email: 'sofia.huaman@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    grade: '2.° Secundaria',
    class: '2B',
  },
  {
    id: 9,
    name: 'Joaquín Castro',
    role: 'student',
    email: 'joaquin.castro@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    grade: '2.° Secundaria',
    class: '2B',
  },
  {
    id: 10,
    name: 'Luciana Alarcón',
    role: 'student',
    email: 'luciana.alarcon@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    grade: '2.° Secundaria',
    class: '2B',
  },
  // Docente invitado
  {
    id: 11,
    name: 'César Vallejo',
    role: 'teacher',
    status: 'Active',
    email: 'cesar.vallejo@apu.edu.pe',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
  }
];

const students3A = users.filter(u => u.role === 'student' && u.class === '3A');
const students2B = users.filter(u => u.role === 'student' && u.class === '2B');
const teacherJhon = users.find(u => u.name === 'Jhon Wick' && u.id === 2);
const teacherVallejo = users.find(u => u.name === 'César Vallejo');

export const courses = [
  {
    id: 1,
    name: 'Física',
    code: 'FIS-301',
    teacher: teacherJhon,
    grade: 'A',
    attendance: '96%',
    description: 'Cinemática, Dinámica y Mecánica Clásica para 3.° Secundaria',
    credits: 4,
    assignments: [1, 2],
    students: students3A,
    classes: ['3A']
  },
  {
    id: 2,
    name: 'Matemáticas',
    code: 'MAT-201',
    teacher: teacherJhon,
    grade: 'A',
    attendance: '94%',
    description: 'Álgebra, Geometría y Aritmética para 2.° Secundaria',
    credits: 4,
    assignments: [3],
    students: students2B,
    classes: ['2B']
  },
  {
    id: 3,
    name: 'Literatura',
    code: 'LIT-301',
    teacher: teacherVallejo,
    grade: 'A',
    attendance: '98%',
    description: 'Literatura Peruana y Universal para 3.° Secundaria',
    credits: 4,
    assignments: [4],
    students: students3A,
    classes: ['3A']
  }
];

export const assignments = [
  {
    id: 1,
    title: 'Guía Práctica N° 1 - Vectores y Cinemática',
    courseId: 1,
    courseName: 'Física',
    classId: '3A',
    className: '3A',
    deadline: '2026-11-10T10:00',
    instructions: 'Resolver los ejercicios en el cuaderno cuadriculado de trabajo para revisión física en aula.',
    fileName: 'Guia_Fisica_Vectores_3A.pdf',
    grades: { 3: 17.0, 4: 16.0, 5: 14.5, 6: 18.0 }
  },
  {
    id: 2,
    title: 'Ficha de Ejercicios N° 1 - Polinomios y Factorización',
    courseId: 2,
    courseName: 'Matemáticas',
    classId: '2B',
    className: '2B',
    deadline: '2026-11-11T12:00',
    instructions: 'Desarrollar los problemas de factorización en el cuaderno para revisión presencial.',
    fileName: 'Separata_Polinomios_2B.pdf',
    grades: { 7: 16.0, 8: 17.5, 9: 15.0, 10: 16.5 }
  },
  {
    id: 3,
    title: 'Análisis Literario - Obra Ollantay',
    courseId: 3,
    courseName: 'Literatura',
    classId: '3A',
    className: '3A',
    deadline: '2026-11-16T10:00',
    instructions: 'Redactar el análisis en hojas cuadriculadas para revisión física en clase.',
    fileName: 'Analisis_Literatura_3A.pdf',
    grades: { 3: 17.5, 4: 16.5, 5: 15.0, 6: 18.5 }
  }
];

export const exams = [
  {
    id: 1,
    title: 'Primer Examen',
    evaluationTypeId: 'primer_examen',
    course: courses[0],
    courseName: 'Física',
    className: '3A',
    date: '2026-11-12',
    time: '08:00 - 10:00',
    duration: 120,
    location: 'Aula 201 - Pabellón Apu San Antonio',
    instructions: 'Evaluación física presencial escrita. Traer lápiz 2B y carné estudiantil.',
    fileName: 'Examen_Fisica_U1_3A.pdf',
    fileSize: '1.2 MB',
    grades: [
      { studentId: 3, score: 16.5, percentage: 82.5, attended: true, passed: true },
      { studentId: 4, score: 15.0, percentage: 75.0, attended: true, passed: true },
      { studentId: 5, score: 14.0, percentage: 70.0, attended: true, passed: true },
      { studentId: 6, score: 17.5, percentage: 87.5, attended: true, passed: true }
    ],
    Total_Points: 20,
    PassingGrade: 11
  },
  {
    id: 2,
    title: 'Primer Examen',
    evaluationTypeId: 'primer_examen',
    course: courses[1],
    courseName: 'Matemáticas',
    className: '2B',
    date: '2026-11-14',
    time: '10:00 - 12:00',
    duration: 120,
    location: 'Aula 104 - Pabellón San Antonio',
    instructions: 'Evaluación física de operaciones y ecuaciones algebraicas.',
    fileName: 'Examen_Matematicas_U1_2B.pdf',
    fileSize: '1.5 MB',
    grades: [
      { studentId: 7, score: 15.5, percentage: 77.5, attended: true, passed: true },
      { studentId: 8, score: 16.0, percentage: 80.0, attended: true, passed: true },
      { studentId: 9, score: 13.5, percentage: 67.5, attended: true, passed: true },
      { studentId: 10, score: 18.0, percentage: 90.0, attended: true, passed: true }
    ],
    Total_Points: 20,
    PassingGrade: 11
  },
  {
    id: 3,
    title: 'Primer Examen',
    evaluationTypeId: 'primer_examen',
    course: courses[2],
    courseName: 'Literatura',
    className: '3A',
    date: '2026-11-18',
    time: '08:00 - 10:00',
    duration: 120,
    location: 'Aula 201 - Pabellón Apu',
    instructions: 'Evaluación física de lectura comprensiva y corrientes literarias.',
    fileName: 'Examen_Literatura_U1_3A.pdf',
    fileSize: '980 KB',
    grades: [
      { studentId: 3, score: 18.0, percentage: 90.0, attended: true, passed: true },
      { studentId: 4, score: 16.0, percentage: 80.0, attended: true, passed: true },
      { studentId: 5, score: 15.5, percentage: 77.5, attended: true, passed: true },
      { studentId: 6, score: 19.0, percentage: 95.0, attended: true, passed: true }
    ],
    Total_Points: 20,
    PassingGrade: 11
  }
];

export const attendance = [
  { studentId: 3, courseId: 1, date: '2026-11-02', status: 'attended' },
  { studentId: 3, courseId: 3, date: '2026-11-03', status: 'attended' },
  { studentId: 4, courseId: 1, date: '2026-11-02', status: 'attended' },
  { studentId: 5, courseId: 1, date: '2026-11-02', status: 'attended' }
];

export const notifications = [
  { id: 1, title: 'Bienvenido al Ciclo Académico 2026', time: 'Hace 1 hora', read: false },
  { id: 2, title: 'Horarios de clases confirmados', time: 'Hace 3 horas', read: true }
];

export const announcements = [
  {
    id: 1,
    title: 'Inicio del Rol de Evaluaciones Físicas',
    date: '2026-11-02',
    content: 'Se recuerda a todos los estudiantes que las evaluaciones se realizarán en sus respectivas aulas en bloques de 2 horas con puntualidad obligatoria.'
  }
];

// Horario estricto: bloques de 2 horas, máximo 5 horas/semana por asignatura
export const schedules = {
  student: [
    {
      day: "Lunes",
      periods: [
        { time: "08:00 - 10:00", subject: "Física (Sección 3A)", room: "Aula 201", teacher: "Jhon Wick" }
      ]
    },
    {
      day: "Martes",
      periods: [
        { time: "08:00 - 10:00", subject: "Literatura (Sección 3A)", room: "Aula 201", teacher: "César Vallejo" }
      ]
    },
    {
      day: "Miércoles",
      periods: [
        { time: "08:00 - 10:00", subject: "Física (Sección 3A)", room: "Aula 201", teacher: "Jhon Wick" }
      ]
    },
    {
      day: "Jueves",
      periods: [
        { time: "08:00 - 10:00", subject: "Literatura (Sección 3A)", room: "Aula 201", teacher: "César Vallejo" }
      ]
    }
  ],
  teacher: [
    {
      day: "Lunes",
      periods: [
        { time: "08:00 - 10:00", subject: "Física - Sección 3A", room: "Aula 201", duration: "2 horas" }
      ]
    },
    {
      day: "Martes",
      periods: [
        { time: "10:00 - 12:00", subject: "Matemáticas - Sección 2B", room: "Aula 104", duration: "2 horas" }
      ]
    },
    {
      day: "Miércoles",
      periods: [
        { time: "08:00 - 10:00", subject: "Física - Sección 3A", room: "Aula 201", duration: "2 horas" }
      ]
    },
    {
      day: "Jueves",
      periods: [
        { time: "10:00 - 12:00", subject: "Matemáticas - Sección 2B", room: "Aula 104", duration: "2 horas" }
      ]
    }
  ]
};

export const dashboardStats = {
  admin: {
    totalStudents: 8,
    totalTeachers: 2,
    totalCourses: 3,
    averageAttendance: "96%",
    recentIncidents: 0,
    pendingApprovals: 2
  },
  teacher: {
    totalStudents: 8,
    coursesTeaching: 2,
    assignmentsPending: 2,
    averageGrade: "16.2",
    attendanceRate: "95%"
  },
  student: {
    coursesEnrolled: 2,
    assignmentsDue: 1,
    upcomingExams: 1,
    averageGrade: "16.8",
    attendanceRate: "98%"
  }
};

export const mockGrades = [
  { id: '1', course: 'Física', average: 16.1, status: 'Aprobado' },
  { id: '2', course: 'Literatura', average: 17.6, status: 'Aprobado' }
];

export const attendanceRecords = [];

export const lectures = [
  {
    id: 1,
    courseId: 1,
    subject: 'Física',
    className: '3A',
    teacher: 'Jhon Wick',
    dayOfWeek: 1, // Lunes
    time: '08:00 - 10:00',
    mode: 'in Class'
  },
  {
    id: 2,
    courseId: 3,
    subject: 'Literatura',
    className: '3A',
    teacher: 'César Vallejo',
    dayOfWeek: 2, // Martes
    time: '08:00 - 10:00',
    mode: 'in Class'
  },
  {
    id: 3,
    courseId: 1,
    subject: 'Física',
    className: '3A',
    teacher: 'Jhon Wick',
    dayOfWeek: 3, // Miércoles
    time: '08:00 - 10:00',
    mode: 'in Class'
  },
  {
    id: 4,
    courseId: 3,
    subject: 'Literatura',
    className: '3A',
    teacher: 'César Vallejo',
    dayOfWeek: 4, // Jueves
    time: '08:00 - 10:00',
    mode: 'in Class'
  },
  // Matemáticas 2B (Profesor Jhon Wick)
  {
    id: 5,
    courseId: 2,
    subject: 'Matemáticas',
    className: '2B',
    teacher: 'Jhon Wick',
    dayOfWeek: 2, // Martes
    time: '10:00 - 12:00',
    mode: 'in Class'
  },
  {
    id: 6,
    courseId: 2,
    subject: 'Matemáticas',
    className: '2B',
    teacher: 'Jhon Wick',
    dayOfWeek: 4, // Jueves
    time: '10:00 - 12:00',
    mode: 'in Class'
  }
];
