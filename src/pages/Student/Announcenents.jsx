import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import AnnouncementCard from '../../components/teacher/AnnouncementCard';
import { announcements } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const Announcenents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const { user: authUser } = useAuth();

  // Get unique courses from announcements
  const courses = [
    ...new Set(announcements.map(a => a.course?.name).filter(Boolean))
  ];

  // Filter and search logic
  const filteredAnnouncements = announcements
    .filter(a => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse =
        selectedCourse === 'All' || (a.course && a.course.name === selectedCourse);
      return matchesSearch && matchesCourse;
    })
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

  return (
    <Layout currentPage={'Announcenents'}>
      <div className="max-w-7xl mx-auto p-6 min-w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Anuncios</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <input
            type="text"
            placeholder="Buscar anuncios..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            className="h-10 rounded-lg border border-gray-300 px-3 min-w-[180px]"
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
          >
            <option value="All">Todas las asignaturas</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAnnouncements.map(a => (
              <AnnouncementCard key={a.id} {...a} course={a.course} userAuth={authUser} />
            ))}
          </div>
          {filteredAnnouncements.length === 0 && (
            <div className="text-center text-gray-500 py-12 text-lg">No se encontraron anuncios.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Announcenents;