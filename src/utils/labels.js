export const ROLE_LABELS = {
  admin: 'Administrador',
  teacher: 'Docente',
  student: 'Alumno',
};

export const USER_STATUS_LABELS = {
  Active: 'Activo',
  Onleave: 'Con permiso',
};

export const ATTENDANCE_STATUS_LABELS = {
  attended: 'Presente',
  absent: 'Ausente',
  late: 'Tardanza',
  present: 'Presente',
  'N/A': 'N/D',
};

export const GRADE_STATUS_LABELS = {
  Passed: 'Aprobado',
  Failed: 'Reprobado',
  Normal: 'Normal',
  'Under Average': 'Bajo el promedio',
  'N/A': 'N/D',
  NA: 'N/D',
};

export const SUBMISSION_STATUS_LABELS = {
  submitted: 'Entregado',
  'not-submitted': 'No entregado',
  pending: 'Pendiente',
  graded: 'Calificado',
};

export const label = (labels, value) => (value in labels ? labels[value] : value);
