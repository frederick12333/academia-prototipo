// DashboardStudent.jsx
// Panel principal del alumno con identidad académica Apu San Antonio de Andahuaylas.

import React from 'react';
import Layout from '../../components/layouts/Layout';
import FastActions from '../../components/shared/FastActions';
import ScheduleView from '../../components/shared/ScheduleView';
import StudentAbsencesTable from '../../components/Student/StudentAbsencesTable';
import AnnouncementsSideList from '../../components/Student/AnnouncementsSideList';
import DeadlinesSideList from '../../components/Student/DeadlinesSideList';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardStudent() {
  const { user } = useAuth();

  return (
    <Layout currentPage={'Dashboard'}>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Sección principal de analíticas y horario */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* 1. El Horario como Vista Principal (Prioridad de carga arriba del todo) */}
          <ScheduleView embedded={true} />

          {/* 2. Tabla de Mis inasistencias posicionada debajo del Horario */}
          <StudentAbsencesTable user={user} />
        </div>

        {/* Columna lateral derecha */}
        <div className="space-y-4 w-full lg:w-80 flex-shrink-0">
          <FastActions user={user} colorButton="bg-red-700" />
          <DeadlinesSideList />
          <AnnouncementsSideList />
        </div>
      </div>
    </Layout>
  );
}
