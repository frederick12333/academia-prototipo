import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import Table from '../../components/shared/Table';
import { Eye, Trash2, Plus, List, Grid, Filter } from 'lucide-react';
import Loading from '../../components/shared/Loading';

const mockStudents = Array.from({ length: 10 }).map((_, i) => ({
  info: {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Nombre Apellido',
    description: `${i % 2 === 0 ? '3A' : '4B'}`,
  },
  studentId: 'S123456',
  grade: i % 2 === 0 ? 3 : 4,
  parentPhone: '0 501 808 60 60',
  address: 'Turquía - Estambul - Üsküdar 123',
}));

const subjects = [
  { label: 'Física', classes: ['3A', '3B'] },
  { label: 'Química', classes: ['3C'] },
  { label: 'Matemáticas', classes: ['4A', '4B'] },
];

const StudentListPage = () => {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [selectedClass, setSelectedClass] = useState(subjects[0].classes[0]);
  const [search, setSearch] = useState('');
  const [viewModal, setViewModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const columns = [
    'Información',
    'ID del alumno',
    'Curso',
    'Teléfono del familiar',
    'Dirección',
  ];

  const filteredStudents = mockStudents.filter(s =>
    s.info.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice((page - 1) * 8, page * 8);

  return (
    <Layout currentPage={'Students'}>
      <div className="flex flex-col gap-6">
        {/* Subject Tabs */}
        <div className="flex gap-4 mt-2">
          {subjects.map((subj, idx) => (
            <button
              key={subj.label}
              className={`px-8 py-2 rounded-t-lg text-lg font-semibold border ${selectedSubject === idx ? 'bg-gradient-to-r from-[#10062B] to-[#4F0129] text-white' : 'bg-white text-gray-800 border-gray-300'}`}
              onClick={() => {
                setSelectedSubject(idx);
                setSelectedClass(subjects[idx].classes[0]);
              }}
            >
              {subj.label}
            </button>
          ))}
        </div>
        {/* Class Tabs */}
        <div className="flex gap-4 mb-2">
          {subjects[selectedSubject].classes.map(cls => (
            <button
              key={cls}
              className={`px-8 py-2 rounded-lg border ${selectedClass === cls ? 'bg-gradient-to-r from-[#10062B] to-[#4F0129] text-white' : 'bg-white text-gray-800 border-gray-300'}`}
              onClick={() => setSelectedClass(cls)}
            >
              {cls}
            </button>
          ))}
        </div>
        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-2">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4F0129]"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-200"><List size={20}/></button>
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-200"><Grid size={20}/></button>
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-200"><Filter size={20}/></button>
            <button className="p-2 rounded-full bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white"><Plus size={20}/></button>
          </div>
        </div>
        {/* Table */}
        <Table
          data={paginatedStudents}
          columns={columns}
          title="All Students"
          isActions={true}
          actionChil={null}
          user={{ role: 'teacher' }}
        />
        {/* Actions for each row */}
        <div className="hidden">
          {/* This is handled in Table's renderCell or actionChil if needed */}
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-6 py-2 rounded bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(p => (
              <button
                key={p}
                className={`w-8 h-8 rounded border ${page === p ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white' : 'bg-white text-gray-800 border-gray-300'}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            className="px-6 py-2 rounded bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white disabled:opacity-50"
            onClick={() => setPage(p => Math.min(5, p + 1))}
            disabled={page === 5}
          >
            Siguiente
          </button>
        </div>
        {/* View Modal */}
        {viewModal && (
          <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl p-8 min-w-[400px] relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setViewModal(null)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Detalles del alumno</h2>
              <div className="flex flex-col gap-2">
                <div><b>Nombre:</b> {viewModal.info.name}</div>
                <div><b>Clase:</b> {viewModal.info.description}</div>
                <div><b>ID del alumno:</b> {viewModal.studentId}</div>
                <div><b>Curso:</b> {viewModal.grade}</div>
                <div><b>Teléfono del familiar:</b> {viewModal.parentPhone}</div>
                <div><b>Dirección:</b> {viewModal.address}</div>
              </div>
            </div>
          </dialog>
        )}
        {/* Delete Modal */}
        {deleteModal && (
          <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-xl p-8 min-w-[400px] relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setDeleteModal(null)}>&times;</button>
              <h2 className="text-xl font-bold mb-4">Eliminar alumno</h2>
              <p>¿Seguro que quieres eliminar a <b>{deleteModal.info.name}</b>?</p>
              <div className="flex gap-4 mt-6">
                <button className="px-6 py-2 rounded bg-gray-200" onClick={() => setDeleteModal(null)}>Cancelar</button>
                <button className="px-6 py-2 rounded bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white" onClick={() => { setDeleteModal(null); }}>Eliminar</button>
              </div>
            </div>
          </dialog>
        )}
        {/* Loading */}
        {loading && <Loading />}
      </div>
    </Layout>
  );
};

export default StudentListPage; 