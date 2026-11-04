import React from 'react';
import Layout from '../../components/layouts/Layout';
import { useAuth } from '../../contexts/AuthContext';
import StudentAbsencesTable from '../../components/Student/StudentAbsencesTable';

const RED = '#C0392B';

const Attendance = () => {
  const { user } = useAuth();

  return (
    <Layout currentPage={'Attendance'}>
      <div className="bg-gray-50 min-h-screen">
        {/* Cabecera institucional */}
        <div className="bg-white border-b border-gray-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: RED }} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Academia Apu San Antonio de Andahuaylas
              </p>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Control y Registro de Inasistencias
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto p-6 space-y-6">
          {/* Componente central de inasistencias con desglose y modal */}
          <StudentAbsencesTable user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
