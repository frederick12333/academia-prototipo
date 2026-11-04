import React, { useState } from 'react';
import { X, FileText, Upload, Calendar, Clock, MapPin, AlertCircle, Plus } from 'lucide-react';
import { courses } from '../../data/mockData';
import { useAcademic } from '../../contexts/AcademicContext';

const RED = '#C0392B';

const STANDARD_TYPES = [
  { id: 'primer_examen', label: 'Primer Examen' },
  { id: 'segundo_examen', label: 'Segundo Examen' },
  { id: 'examen_parcial', label: 'Examen Parcial' },
  { id: 'examen_final', label: 'Examen Final' },
  { id: 'custom', label: 'Otro / Personalizado' },
];

export const CreatePhysicalExamModal = ({ isOpen, onClose }) => {
  const { addPhysicalExam, evaluationColumns } = useAcademic();

  const [courseId, setCourseId] = useState(courses[0]?.id || 1);
  const selectedCourseObj = courses.find(c => c.id === Number(courseId)) || courses[0];
  const availableClasses = selectedCourseObj?.classes || ['3A', '3B', '3C'];

  const [selectedClass, setSelectedClass] = useState(availableClasses[0] || '3A');
  const [examTypeOption, setExamTypeOption] = useState('primer_examen');
  const [customTitle, setCustomTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('08:00 - 09:30');
  const [duration, setDuration] = useState(90);
  const [location, setLocation] = useState('Aula 201 - Pabellón Apu San Antonio');
  const [instructions, setInstructions] = useState('Evaluación escrita física presencial. Traer lápiz 2B, borrador y tajador. Prohibido el ingreso de celulares o apuntes.');
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
    setErrorMsg('');

    const title = examTypeOption === 'custom'
      ? customTitle.trim()
      : STANDARD_TYPES.find(t => t.id === examTypeOption)?.label || 'Evaluación';

    if (!title) {
      setErrorMsg('Debes ingresar un título para la evaluación.');
      return;
    }
    if (!date) {
      setErrorMsg('Debes seleccionar la fecha de la evaluación.');
      return;
    }

    const newExam = {
      title,
      evaluationTypeId: examTypeOption === 'custom' ? 'otro' : examTypeOption,
      courseId: selectedCourseObj.id,
      courseName: selectedCourseObj.name,
      className: selectedClass,
      date,
      time,
      duration: Number(duration),
      location,
      instructions,
      fileName: fileName || `Ficha_Examen_${title.replace(/\s+/g, '_')}_${selectedClass}.pdf`,
      fileSize: fileSize || '1.2 MB',
      grades: {}
    };

    addPhysicalExam(newExam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200">
        {/* Cabecera */}
        <div className="px-6 py-4 flex items-center justify-between text-white" style={{ backgroundColor: RED }}>
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <h3 className="font-bold text-base">Programar Evaluación Física</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-4 text-gray-800">
          <p className="text-xs text-gray-500">
            Registra los datos de la evaluación física que los alumnos rendirán en el aula y adjunta el balotario o examen impreso para su distribución.
          </p>

          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Selector de Curso */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                1. Asignatura / Curso *
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

            {/* 2. Selector de Clase */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                2. Clase / Sección *
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

            {/* 3. Selector de Tipo de Evaluación */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                3. Tipo de Evaluación *
              </label>
              <select
                value={examTypeOption}
                onChange={(e) => setExamTypeOption(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                {STANDARD_TYPES.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Título personalizado si aplica */}
            {examTypeOption === 'custom' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Nombre personalizado *
                </label>
                <input
                  type="text"
                  placeholder="Ej. Balotario Práctico N° 1"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>
            )}

            {/* Fecha */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                <Calendar size={14} /> Fecha de la Prueba *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Hora y Duración */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                <Clock size={14} /> Horario y Duración
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="08:00 - 09:30"
                  className="w-2/3 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                />
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Min"
                  className="w-1/3 px-2 py-2 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>
            </div>

            {/* Ubicación / Aula */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                <MapPin size={14} /> Aula / Ubicación Física *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej. Aula 201 - Pabellón Apu San Antonio"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Indicaciones para el alumno */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                Indicaciones para los Alumnos
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Pautas de presentación en el aula, materiales permitidos..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>

            {/* Archivo adjunto (PDF / Word) */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1 flex items-center gap-1">
                <Upload size={14} /> Subir Archivo del Examen (PDF / Word para Imprimir)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-red-400 transition-colors bg-gray-50/50">
                <input
                  type="file"
                  id="exam-file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="exam-file" className="cursor-pointer flex flex-col items-center">
                  <Upload size={24} className="text-gray-400 mb-1" />
                  <span className="text-xs font-semibold text-gray-700">
                    {fileName ? `Archivo seleccionado: ${fileName} (${fileSize})` : 'Haz clic para seleccionar archivo PDF o Word'}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">
                    (Se generará el enlace descargable oficial para alumnos y docentes)
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
              + Registrar Evaluación Física
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

