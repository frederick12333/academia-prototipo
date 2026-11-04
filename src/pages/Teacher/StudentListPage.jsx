import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import Table from '../../components/shared/Table';
import { Eye, Trash2, Plus, List, Grid, Filter } from 'lucide-react';
import Loading from '../../components/shared/Loading';
import {courses,users} from '../../data/mockData';
import { useModal } from '../../contexts/ModalProvider';
import { CreateStudentModal } from '../../components/teacher/CreateStudentModal';

const mockStudents = users.filter(user=>user.role==='student')
.sort((a, b) => a.name.localeCompare(b.name))
.map(student => ({
  info: {
    avatar: student.avatar,
    name: student.name,
    description: student.grade, 
    fullStudentData:student,
  },
  studentId: 'S123456',
  grade: student.grade,
  parentPhone: '0 501 808 60 60',
  address: 'Turquía - Estambul 123',
 
}));

const subjects =courses.map(course =>({label: course.name, classes: course.classes}));

const StudentListPage = () => {
  const { showModal } = useModal();
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [selectedClass, setSelectedClass] = useState(subjects[0].classes[0]);
  const [search, setSearch] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
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
    ||
    s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedStudents = filteredStudents.slice((page - 1) * 8, page * 8);

  const handleAddStudent = (studentData) => {
    console.log('New student data:', studentData);
    // Here you would typically add the student to your data source
    // For now, we'll just log it.
  };

  return (
    <Layout currentPage={'Students'}>
         <div className="bg-gray-50 w-full p-6 text-sm">
      <div className="flex flex-col gap-2 max-w-7xl  ">
        {/* Subject Tabs */}
        <div className="flex gap-2 overflow-x-auto  max-w-full ">
        {subjects.map((subj, idx) => (
            <button
            key={subj.label}
            className={`px-2 w-fit py-2 rounded-md text-sm font-semibold border ${selectedSubject === idx ? 'bg-gradient-to-r from-[#10062B] to-[#4F0129] text-white' : 'bg-white text-gray-800 border-gray-300'}`}
            onClick={() => {
              setSelectedSubject(idx);
              setSelectedClass(subjects[idx].classes[0]);
            }}
          >
            {(subj.label).slice(0,12)} 
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
           
            <button onClick={()=>showModal(<CreateStudentModal onSubmit={handleAddStudent} />)}
             className="p-2 flex  rounded-md bg-green-600 text-white hover:bg-green-700">
              <Plus size={20}/> Agregar alumno 
              </button>
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
       
      </div>
      </div>
    </Layout>
  );
};

export default StudentListPage; 