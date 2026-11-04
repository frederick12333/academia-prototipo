import React from 'react';
import { Bell } from 'lucide-react';

const AnnouncementsSideList = () => {
  const announcements = [
    {
      id: 1,
      title: 'Horario del examen parcial',
      course: 'Cálculo',
      date: '2024-03-15',
      isNew: true,
    },
    {
      id: 2,
      title: 'Fecha de entrega de la tarea ampliada',
      course: 'Física',
      date: '2024-03-14',
      isNew: true,
    },
    {
      id: 3,
      title: 'Material del curso actualizado',
      course: 'Química',
      date: '2024-03-13',
      isNew: false,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Anuncios</h3>
        <Bell className="h-5 w-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-sm">{announcement.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{announcement.course}</p>
              </div>
              {announcement.isNew && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                  Nuevo
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">{announcement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsSideList; 