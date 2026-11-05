// DashboardTeacher.jsx
// Panel principal del docente con identidad académica Apu San Antonio de Andahuaylas.

import React from 'react';
import Layout from '../../components/layouts/Layout';
import FastActions from '../../components/shared/FastActions';
import ScheduleView from '../../components/shared/ScheduleView';
import CriticalAbsencesTable from '../../components/teacher/CriticalAbsencesTable';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardTeacher() {
  const { user } = useAuth();

  return (
    <Layout currentPage={'Dashboard'}>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Sección principal de analíticas y horario */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* 1. El Horario como Vista Principal (Prioridad de carga arriba del todo) */}
          <ScheduleView embedded={true} />

          {/* 2. Tabla de Inasistencias Diarias Generales posicionada debajo del Horario */}
          <CriticalAbsencesTable />
        </div>

        {/* Columna lateral derecha */}
        <div className="space-y-4 w-full lg:w-80 flex-shrink-0">
          <FastActions user={user} colorButton="bg-red-700" />
        </div>
      </div>
    </Layout>
  );
}
