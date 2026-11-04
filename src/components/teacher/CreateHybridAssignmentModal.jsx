import React, { useState } from 'react';
import { X, ClipboardList, Upload, Calendar, Clock, AlertCircle } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useAcademic } from '../../contexts/AcademicContext';

const RED = '#C0392B';

export const CreateHybridAssignmentModal = ({ isOpen, onClose }) => {
  const { addPhysicalAssignment } = useAcademic();

  const [courseId, setCourseId] = useState(courses[0]?.id || 1);
  const selectedCourseObj = courses.find(c => c.id === Number(courseId)) || courses[0];
  const availableClasses = selectedCourseObj?.classes || ['3A', '3B', '3C'];

  const [selectedClass, setSelectedClass] = useState(availableClasses[0] || '3A');
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState(new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().slice(0, 16));
  const [instructions, setInstructions] = useState('Resolver los ejercicios en el cuaderno de trabajo de manera ordenada. Presentación física en el aula para revisión y firma del docente.');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCourseChange = (id) => {
    setCourseId(Number(id));
    const c = courses.find(item => item.id === Number(id));
    if (c && c.classes && c.classes.length > 0) {
      setSelectedClass(c.classes[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Debes ingresar un título para la tarea.');
      return;
    }
    if (!deadline) {
      setErrorMsg('Debes indicar la fecha límite de revisión.');
      return;
    }

    const newAssignment = {
      title: title.trim(),
      courseId: selectedCourseObj.id,
      courseName: selectedCourseObj.name,
      className: selectedClass,
      deadline,
      instructions,
      fileName: fileName || `Guia_Trabajo_${title.trim().replace(/\s+/g, '_')}.pdf`,
      fileSize: fileSize || '850 KB',
      grades: {}
    };

    addPhysicalAssignment(newAssignment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-200">
        {/* Cabecera */}
        <div className="px-6 py-4 flex items-center justify-between text-white" style={{ backgroundColor: RED }}>
          <div className="flex items-center gap-2">
            <ClipboardList size={20} />
            <h3 className="font-bold text-base">Crear Tarea con Revisión Física</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-4 text-gray-800">
          <p className="text-xs text-gray-500">
            Crea una tarea híbrida: los alumnos descargarán la separata/guía y la desarrollarán en su cuaderno para revisión presencial en el aula.
          </p>

          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Curso */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Asignatura / Curso *
              </label>
              <select
                value={courseId}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Clase */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Clase / Sección *
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {availableClasses.map(cls => (
                  <option key={cls} value={cls}>Clase {cls}</option>
                ))}
              </select>
            </div>

            {/* Título de la tarea */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Título de la Tarea / Guía *
              </label>
              <input
                type="text"
                required
                placeholder="Ej. Guía Práctica N° 4 - Trigonometría y Ángulos"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Fecha y hora límite de revisión física */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                <Calendar size={14} /> Fecha Límite de Revisión Física en Aula *
              </label>
              <input
                type="datetime-local"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Indicaciones para el cuaderno */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Pautas e Indicaciones de Revisión Física
              </label>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Ej. Resolver del ejercicio 1 al 15 en el cuaderno cuadriculado..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Archivo adjunto */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                <Upload size={14} /> Subir Material o Ficha (PDF / Word)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors bg-gray-50/50">
                <input
                  type="file"
                  id="task-file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="task-file" className="cursor-pointer flex flex-col items-center">
                  <Upload size={22} className="text-gray-400 mb-1" />
                  <span className="text-xs font-semibold text-gray-700">
                    {fileName ? `Archivo: ${fileName} (${fileSize})` : 'Haz clic para adjuntar ficha de trabajo o balotario'}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    (Los estudiantes podrán descargarlo directamente desde su panel)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90 shadow-sm"
              style={{ backgroundColor: RED }}
            >
              + Publicar Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

