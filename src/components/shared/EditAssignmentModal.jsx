import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Download } from 'lucide-react';


export const EditAssignmentModal = ({
  isOpen,
  onClose,
  assignment
}) => {
  const [formData, setFormData] = useState({
    class: '',
    course: '',
    title: '',
    grade: '',
    date: '',
    time: '',
    message: '',
    file: null 
  });

  const classes = ['AC125', 'PH101', 'DS458', 'CS201', 'MATH301'];
  const courses = ['Informática', 'Física', 'Ciencia de Datos', 'Matemáticas', 'Química'];

  useEffect(() => {
    if (assignment) {
      setFormData({
        class: assignment.classId,
        course: assignment.courseName,
        title: assignment.title,
        grade: assignment.grade?.toString() || '',
        date: assignment.deadline.replace(/\./g, '-'),
        time: assignment.time,
        message: assignment.message || '',
        file: null
      });
    }
  }, [assignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updating assignment:', formData);
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  if (!assignment) return null;

  return (
  <dialog open={isOpen}>
      <div className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-center">Editar tarea</h2>
              <button onClick={onClose} className="absolute right-4 top-4">X</button>
          </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Clase</label>
            <input type='checkbox' value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}/>
              
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Asignatura</label>
            <input type='checkbox' value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))}/>
            
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Título de la tarea</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nota de la tarea</label>
              <input
                value={formData.grade}
                onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                className="bg-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fecha límite de la tarea</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fecha límite de la tarea</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="bg-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              placeholder="Mensaje"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="bg-gray-200 min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Archivo de la tarea</label>
            <div className="bg-gray-200 p-6 rounded-lg">
              {assignment.fileName ? (
                <div className="flex items-center justify-between bg-white p-3 rounded-lg mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{assignment.fileName}</p>
                      <p className="text-sm text-gray-500">{assignment.fileSize}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </button>
                    <button variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : null}
              
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-edit"
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="file-upload-edit" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Subir archivo
                  </div>
                  {formData.file && (
                    <p className="mt-2 text-sm text-gray-600">{formData.file.name}</p>
                  )}
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-900 hover:bg-purple-800 text-white py-3"
          >
            Enviar
          </button>
        </form>
      </div>
    </dialog>
  );
};
