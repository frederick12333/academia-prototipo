import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/layouts/Layout';
import ProfileHeader from '../../components/student/ProfileHeader';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Phone } from 'lucide-react';

const RED = '#C0392B';

const StudentProfile = () => {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const user = location.state?.student || authUser;

  // Información familiar ultra-minimalista: Nombre, Vínculo directo y Teléfono de contacto
  const familyMembers = [
    { name: 'Carlos Rodas Mendoza', relationship: 'Padre', phone: '987 654 321' },
    { name: 'María Quispe Huamán', relationship: 'Madre', phone: '983 112 233' },
  ];

  return (
    <Layout currentPage={'StudentProfile'}>
      <div className="w-full px-6 sm:px-12 py-4">
        {/* Datos personales básicos del estudiante */}
        <ProfileHeader user={user} />

        {/* Bloque Familiar Ultra Minimalista */}
        <div className="mt-6 bg-white border border-gray-300 rounded-none overflow-hidden shadow-none">
          <div className="px-5 py-3.5 border-b border-gray-300 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-5 rounded-none flex-shrink-0" style={{ backgroundColor: RED }} />
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-700" />
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Información Familiar
                </h2>
              </div>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Vínculo Directo y Contacto de Emergencia
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: RED }} className="text-white border-b border-red-800">
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs">
                    Nombre del Familiar
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                    Vínculo
                  </th>
                  <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-white text-xs border-l border-red-700/60">
                    Contacto / Teléfono
                  </th>
                </tr>
              </thead>
              <tbody>
                {familyMembers.map((fam, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 transition-colors hover:bg-gray-100/60 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {/* Nombre */}
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {fam.name}
                    </td>

                    {/* Vínculo */}
                    <td className="py-3 px-4 text-gray-700 border-l border-gray-200 font-medium">
                      <span className="inline-block px-2.5 py-0.5 rounded-none text-xs font-semibold bg-gray-100 border border-gray-300 text-gray-800">
                        {fam.relationship}
                      </span>
                    </td>

                    {/* Teléfono / Contacto directo */}
                    <td className="py-3 px-4 text-gray-900 border-l border-gray-200 font-mono font-semibold">
                      <a
                        href={`tel:${fam.phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 text-gray-900 hover:text-red-700 transition-colors"
                        title={`Llamar a ${fam.name}`}
                      >
                        <Phone size={13} className="text-gray-400" />
                        <span>{fam.phone}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;
