import React, { useState, useEffect, useCallback } from 'react';
import { useSaveNotification } from '../../contexts/SaveNotificationContext';
import { useNotification } from '../../contexts/NotificationContext';

export const AssignmentDetailsModal = ({ isOpen, onClose, assignment }) => {
  const [formData, setFormData] = useState({
    class: assignment?.classId || '3A',
    course: assignment?.courseName || 'Física',
    title: assignment?.title || '',
    grade: assignment?.grade || 20,
    date: assignment?.deadline || assignment?.date || '',
    time: assignment?.time || '10:00',
    status: assignment?.status || 'upcoming',
    description: assignment?.description || '',
    file: null 
  });

  const classes = ['3A', '2B'];
  const courses = ['Física', 'Matemáticas', 'Literatura'];
  const { showSaveNotification, hideSaveNotification } = useSaveNotification();
  const { showNotification } = useNotification();

  useEffect(() => {
    let timeoutId;
    let intervalId;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        showSaveNotification();
        intervalId = setInterval(() => {
          showSaveNotification();
        }, 10000);
      }, 10000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, showSaveNotification]);

  const handleCloseModal = useCallback(() => {
    hideSaveNotification();
    onClose();
  }, [hideSaveNotification, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showNotification('El título de la tarea no puede estar vacío.', 'error');
      return;
    }
    if (!formData.description.trim()) {
      showNotification('La descripción no puede estar vacía.', 'error');
      return;
    }

    showSaveNotification();
    hideSaveNotification();
    handleCloseModal();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  return (
    <div className="max-w-full max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Editar tarea</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div className='w-full px-2'>
            <label className="block text-sm font-medium mb-1">Clase</label>
            <select
              className='bg-gray-100 border border-gray-300 h-9 w-full rounded-md cursor-pointer px-2 text-sm' 
              value={formData.class}
              onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className='w-full px-2'>
            <label className="block text-sm font-medium mb-1">Asignatura</label>
            <select
              className='bg-gray-100 border border-gray-300 w-full h-9 rounded-md cursor-pointer px-2 text-sm' 
              value={formData.course}
              onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2">
            <div>
              <label className="block text-sm font-medium mb-1">Título de la tarea</label>
              <input
                placeholder="Título de la tarea"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className='bg-gray-100 border border-gray-300 w-full h-9 rounded-md p-2 text-sm'    
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nota máxima</label>
              <input
                placeholder="20"
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                className='bg-gray-100 border border-gray-300 w-full h-9 rounded-md p-2 text-sm' 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-2">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha límite</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className='bg-gray-100 border border-gray-300 w-full h-9 rounded-md px-2 text-sm' 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora límite</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className='bg-gray-100 border border-gray-300 w-full h-9 rounded-md px-2 text-sm' 
              />
            </div>
          </div>
          <div className='w-full px-2'>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              placeholder="Descripción de la tarea"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className='bg-gray-100 border border-gray-300 w-full rounded-md min-h-[75px] p-2 text-sm' 
            />
          </div>
          <div className='w-full px-2'>
            <label className="block text-sm font-medium mb-1">Archivo de la tarea</label>
            <div className="bg-gray-50 w-full p-4 rounded-lg border-2 border-dashed border-gray-300">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="file-upload" className="cursor-pointer hover:opacity-90">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-red-700 text-white px-6 py-2 text-sm rounded-lg flex items-center gap-2">
                    Subir archivo
                  </div>
                  {formData.file && (
                    <p className="mt-2 text-xs text-gray-600">{formData.file.name}</p>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className='flex gap-4 px-2'>
          <button
            type="submit"
            className="w-full bg-red-700 hover:opacity-90 rounded-lg text-white py-2 text-sm font-semibold"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 py-2 text-sm font-semibold"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
