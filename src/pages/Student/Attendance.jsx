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
        {/* Cabecera limpia */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 rounded-none" style={{ backgroundColor: RED }} />
            <h1 className="text-lg font-bold text-gray-900">
              Control y Registro de Asistencia
            </h1>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto p-6 space-y-6">
          {/* Componente central: Asistencia Diaria de Portería */}
          <StudentAbsencesTable user={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
