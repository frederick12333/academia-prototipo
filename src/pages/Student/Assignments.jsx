import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/layouts/Layout';
import { 
  Download, 
  ChevronDown, 
  Plus, 
  FileText, 
  Image as ImageIcon, 
  CheckCircle2, 
  Trash2, 
  Upload, 
  Paperclip,
  Clock
} from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockData';

const RED = '#C0392B';

const Assignments = () => {
  const { assignments } = useAcademic();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  // ID de la tarea expandida actualmente
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Estado persistente de entregas por alumno: { [taskId]: { submitted: boolean, files: [] } }
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem(`task_submissions_${user?.id || 'guest'}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Menú desplegable para el botón "+ Agregar o crear"
  const [activeMenuTaskId, setActiveMenuTaskId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(`task_submissions_${user?.id || 'guest'}`, JSON.stringify(submissions));
    } catch (e) {
      console.error('Error saving submissions', e);
    }
  }, [submissions, user?.id]);

  const studentCourses = (courses || []).filter(c => c && c.students?.some(s => s && s.id === user?.id));
  const studentCourseNames = studentCourses.map(c => c.name);

  const studentAssignments = (assignments || []).filter(task => {
    if (!task) return false;
    return studentCourseNames.length === 0 || studentCourseNames.includes(task.courseName);
  });

  const toggleExpand = (taskId) => {
    setExpandedTaskId(prev => (prev === taskId ? null : taskId));
    setActiveMenuTaskId(null);
  };

  const handleDownloadFile = (task, e) => {
    if (e) e.stopPropagation();
    const content = `ACADEMIA APU SAN ANTONIO DE ANDAHUAYLAS\n` +
      `GUÍA DE TRABAJO - ${task.courseName}\n` +
      `Tarea: ${task.title}\n\n` +
      `Las tareas se desarrollan en el cuaderno de trabajo y se presentan físicamente en clase.\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = task.fileName || 'Guia_Fisica_Vectores_3A.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simular o cargar archivo adjunto
  const handleAddFile = (taskId, fileName, type = 'pdf') => {
    setSubmissions(prev => {
      const current = prev[taskId] || { submitted: false, files: [] };
      const newFiles = [
        ...current.files,
        {
          id: Date.now(),
          name: fileName,
          type: type,
          size: '1.2 MB'
        }
      ];
      return {
        ...prev,
        [taskId]: { ...current, files: newFiles }
      };
    });
    setActiveMenuTaskId(null);
  };

  const handleRemoveFile = (taskId, fileId) => {
    setSubmissions(prev => {
      const current = prev[taskId] || { submitted: false, files: [] };
      return {
        ...prev,
        [taskId]: {
          ...current,
          files: current.files.filter(f => f.id !== fileId)
        }
      };
    });
  };

  // Acción principal: Entregar Tarea
  const handleSubmitTask = (taskId) => {
    setSubmissions(prev => {
      const current = prev[taskId] || { submitted: false, files: [] };
      const filesToSubmit = current.files.length > 0 
        ? current.files 
        : [{ id: Date.now(), name: 'Cuaderno_Ejercicios_Escaneado.pdf', type: 'pdf', size: '2.4 MB' }];

      return {
        ...prev,
        [taskId]: {
          ...current,
          submitted: true,
          files: filesToSubmit,
          submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
    });
  };

  // Anular entrega para permitir cambios
  const handleUnsubmitTask = (taskId) => {
    setSubmissions(prev => {
      const current = prev[taskId] || { submitted: false, files: [] };
      return {
        ...prev,
        [taskId]: {
          ...current,
          submitted: false
        }
      };
    });
  };

  return (
    <Layout currentPage="Assignments">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Cabecera limpia */}
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: RED }} />
            <h1 className="text-lg font-bold text-gray-900">Tareas</h1>
          </div>
        </div>

        {/* Listado de tareas con despliegue estilo Classroom */}
        {studentAssignments.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-gray-200 text-center text-gray-400">
            No tienes tareas asignadas actualmente.
          </div>
        ) : (
          <div className="space-y-3">
            {studentAssignments.map(task => {
              const isExpanded = expandedTaskId === task.id;
              const submission = submissions[task.id] || { submitted: false, files: [] };
              const isSubmitted = submission.submitted;

              return (
                <div
                  key={task.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden transition-all duration-200 hover:border-gray-300"
                >
                  {/* Fila o tarjeta colapsada muy limpia: Curso y Título de la actividad */}
                  <div
                    onClick={() => toggleExpand(task.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-gray-50/70"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors ${
                          isSubmitted ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      />
                      <span className="font-bold text-gray-900 text-sm sm:text-base truncate">
                        {task.courseName} – {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Etiqueta de estado dinámica: Asignada (Gris/Rojo) vs Entregada (Verde) */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          isSubmitted
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {isSubmitted ? 'Entregada' : 'Asignada'}
                      </span>

                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-red-600' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Vista expandida interactiva (Estilo Google Classroom) */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-gray-100 bg-gray-50/40 space-y-5 animate-in fade-in duration-150">
                      {/* Indicaciones de desarrollo y separata */}
                      <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                          Las tareas se desarrollan en el cuaderno de trabajo y se presentan físicamente en clase.
                        </p>

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={(e) => handleDownloadFile(task, e)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                          >
                            <Download size={14} />
                            Descargar Separata / Ficha ({task.fileName || 'Guia_Fisica_Vectores_3A.pdf'})
                          </button>
                        </div>
                      </div>

                      {/* ─── Zona de Entrega (Aula Virtual Estilo Classroom) ─── */}
                      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <Paperclip size={18} style={{ color: RED }} />
                            <h3 className="text-sm font-bold text-gray-900">Tu trabajo</h3>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                              isSubmitted
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-50 text-red-700'
                            }`}
                          >
                            {isSubmitted ? 'Tarea Entregada' : 'Sin Entregar'}
                          </span>
                        </div>

                        {/* Listado de archivos agregados */}
                        {submission.files && submission.files.length > 0 ? (
                          <div className="space-y-2">
                            {submission.files.map(file => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50 text-xs"
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  {file.type === 'image' ? (
                                    <ImageIcon size={18} className="text-blue-600 flex-shrink-0" />
                                  ) : (
                                    <FileText size={18} className="text-red-600 flex-shrink-0" />
                                  )}
                                  <span className="font-semibold text-gray-800 truncate">{file.name}</span>
                                  <span className="text-gray-400 text-[11px]">({file.size})</span>
                                </div>

                                {!isSubmitted && (
                                  <button
                                    onClick={() => handleRemoveFile(task.id, file.id)}
                                    className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors ml-2"
                                    title="Quitar archivo"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded-lg text-xs text-gray-400">
                            No has adjuntado archivos aún. Puedes subir una foto de tu cuaderno o documento PDF.
                          </div>
                        )}

                        {/* Controles de Entrega */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                          {/* Botón "+ Agregar o crear" */}
                          {!isSubmitted ? (
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setActiveMenuTaskId(activeMenuTaskId === task.id ? null : task.id)}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs transition-colors shadow-2xs"
                              >
                                <Plus size={16} />
                                + Agregar o crear
                              </button>

                              {/* Menú de selección de tipo de archivo simulado */}
                              {activeMenuTaskId === task.id && (
                                <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                                  <button
                                    onClick={() => handleAddFile(task.id, 'Cuaderno_Ejercicios.pdf', 'pdf')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                  >
                                    <FileText size={15} className="text-red-600" />
                                    Archivo PDF (Cuaderno)
                                  </button>
                                  <button
                                    onClick={() => handleAddFile(task.id, 'Foto_Cuaderno_Pag1.jpg', 'image')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                  >
                                    <ImageIcon size={15} className="text-blue-600" />
                                    Foto / Imagen del Cuaderno
                                  </button>
                                  <button
                                    onClick={() => handleAddFile(task.id, 'Resolucion_Ejercicios.docx', 'word')}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                                  >
                                    <Upload size={15} className="text-green-600" />
                                    Documento Word
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-green-700 font-semibold">
                              <CheckCircle2 size={16} className="text-green-600" />
                              <span>Entregado a tiempo</span>
                            </div>
                          )}

                          {/* Botón principal de acción */}
                          {!isSubmitted ? (
                            <button
                              type="button"
                              onClick={() => handleSubmitTask(task.id)}
                              className="px-6 py-2.5 rounded-lg text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-2"
                              style={{ backgroundColor: RED }}
                            >
                              Entregar Tarea
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUnsubmitTask(task.id)}
                              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-xs transition-colors"
                            >
                              Anular entrega
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Assignments;
