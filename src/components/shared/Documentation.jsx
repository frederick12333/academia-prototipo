import React, { useState } from 'react';
import { 
  Book, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  FileText,
  Bell,
  Calendar,
  BarChart
} from 'lucide-react';

const Documentation = ({ isOpen, onClose }) => {
  const [currentSection, setCurrentSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = {
    'getting-started': {
      title: 'Primeros pasos',
      content: [
        {
          title: 'Bienvenido al Sistema de Gestión Escolar',
          content: 'Esta guía completa te ayudará a navegar por el sistema y a aprovechar al máximo sus funciones. Tanto si eres docente como alumno, aquí encontrarás todo lo que necesitas saber.',
          icon: <Star className="text-yellow-500" size={20} />
        },
        {
          title: 'Guía de inicio rápido',
          content: `1. Inicia sesión con tus credenciales (p. ej., teacher@titan.edu.tr / student@titan.edu.tr)
2. Accede a tu panel desde la barra lateral
3. Ve a tus asignaturas con la pestaña "Asignaturas"
4. Consulta tu horario en la sección "Horario"
5. Revisa los anuncios en la pestaña "Anuncios"`,
          icon: <Clock className="text-blue-500" size={20} />
        },
        {
          title: 'Requisitos del sistema',
          content: `Requerido:
• Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
• Conexión a internet estable (mínimo 5 Mbps)
• Resolución de pantalla: 1024x768 o superior
• JavaScript habilitado
• Cookies habilitadas

Recomendado:
• 8 GB de RAM o más
• Procesador de 4 núcleos o superior
• Pantalla de 1080p o superior`,
          icon: <CheckCircle className="text-green-500" size={20} />
        }
      ]
    },
    'teacher-guide': {
      title: 'Guía para docentes',
      content: [
        {
          title: 'Gestión de clases',
          content: `Gestión de clases paso a paso:
1. Ve a "Lista de alumnos" en la barra lateral
2. Haz clic en el botón "Crear nueva clase"
3. Rellena los datos de la clase:
   - Nombre de la clase (p. ej., "Matemáticas 101")
   - Nivel educativo
   - Horario
   - Capacidad máxima
4. Añade alumnos con el botón "Añadir alumnos"
5. Guarda y publica la clase

Acciones rápidas:
• Ver la lista de la clase
• Registrar la asistencia
• Gestionar las notas
• Enviar anuncios`,
          icon: <Users className="text-purple-500" size={20} />
        },
        {
          title: 'Crear tareas',
          content: `Cómo crear una tarea:
1. Ve a "Tareas" en la barra lateral
2. Haz clic en "Crear nueva tarea"
3. Rellena los datos:
   - Título (p. ej., "Semana 3: problemas de álgebra")
   - Descripción
   - Fecha y hora de entrega
   - Adjuntar archivos (PDF, DOC, etc.)
   - Peso en la nota
4. Selecciona las clases destinatarias
5. Previsualiza y publica

Tipos de tarea:
• Deberes habituales
• Cuestionario
• Proyecto
• Examen
• Crédito extra`,
          icon: <FileText className="text-green-500" size={20} />
        },
        {
          title: 'Gestión de notas',
          content: `Proceso de calificación:
1. Accede a "Notas" desde la barra lateral
2. Selecciona la clase y la tarea
3. Introduce las notas:
   - Puntuaciones numéricas
   - Notas con letra
   - Comentarios
4. Calcula los promedios automáticamente
5. Genera informes

Categorías de nota:
• Tareas (30 %)
• Cuestionarios (20 %)
• Proyectos (25 %)
• Exámenes (25 %)

Tipos de informe:
• Informes individuales del alumno
• Informes de rendimiento de la clase
• Informes de seguimiento del progreso`,
          icon: <BarChart className="text-yellow-500" size={20} />
        },
        {
          title: 'Registro de asistencia',
          content: `Proceso de asistencia diaria:
1. Ve a "Asistencia" en la barra lateral
2. Selecciona la clase y la fecha
3. Marca la asistencia:
   - Presente
   - Ausente
   - Tarde
   - Justificado
4. Añade observaciones si es necesario
5. Guarda la asistencia

Informes disponibles:
• Hojas de asistencia diarias
• Resúmenes mensuales
• Historial de asistencia del alumno
• Patrones de ausencia
• Documentación justificativa`,
          icon: <Calendar className="text-blue-500" size={20} />
        }
      ]
    },
    'student-guide': {
      title: 'Guía para alumnos',
      content: [
        {
          title: 'Acceso a las asignaturas',
          content: `Navegación por las asignaturas:
1. Inicia sesión en tu cuenta
2. Ve a "Asignaturas" en la barra lateral
3. Consulta tus asignaturas matriculadas:
   - Nombre de la asignatura
   - Docente
   - Horario
   - Progreso
4. Haz clic en una asignatura para acceder a:
   - Materiales del curso
   - Tareas
   - Notas
   - Anuncios

Funciones de la asignatura:
• Calendario del curso
• Biblioteca de recursos
• Foro de debate
• Seguimiento del progreso`,
          icon: <Book className="text-purple-500" size={20} />
        },
        {
          title: 'Entrega de trabajos',
          content: `Pasos para entregar una tarea:
1. Ve a la pestaña "Tareas"
2. Localiza la tarea
3. Haz clic en "Entregar trabajo"
4. Sube los archivos:
   - Formatos admitidos: PDF, DOC, DOCX, TXT, ZIP
   - Tamaño máximo: 10 MB
5. Añade comentarios si es necesario
6. Entrega antes de la fecha límite

Estado de la entrega:
• Borrador (guardado pero no entregado)
• Entregado
• Calificado
• Entrega tardía
• Devuelto para revisión`,
          icon: <FileText className="text-green-500" size={20} />
        },
        {
          title: 'Consulta de notas',
          content: `Acceso a tus notas:
1. Haz clic en "Notas" en la barra lateral
2. Consulta las notas por:
   - Asignatura
   - Tipo de tarea
   - Fecha
3. Comprueba:
   - Notas individuales
   - Promedio de la asignatura
   - Nota media global
   - Historial de notas

Notificaciones de notas:
• Alertas de nuevas notas
• Notificaciones de cambios de nota
• Recordatorios de tareas pendientes
• Informes de progreso`,
          icon: <BarChart className="text-yellow-500" size={20} />
        },
        {
          title: 'Alertas Académicas',
          content: `Sistema de mensajería:
1. Accede a "Mensajes" desde la barra lateral
2. Redacta un mensaje nuevo:
   - Selecciona el destinatario
   - Elige la asignatura (si corresponde)
   - Escribe el mensaje
   - Adjunta archivos
3. Consulta el historial de mensajes
4. Revisa las notificaciones

Funciones de comunicación:
• Mensajería directa
• Anuncios de la asignatura
• Mensajes grupales
• Uso compartido de archivos
• Confirmaciones de lectura
• Búsqueda de mensajes`,
          icon: <Bell className="text-red-500" size={20} />
        }
      ]
    },
    'troubleshooting': {
      title: 'Solución de problemas',
      content: [
        {
          title: 'Problemas frecuentes',
          content: `Problemas habituales:

1. Problemas de inicio de sesión:
   • Borra la caché del navegador
   • Restablece la contraseña
   • Comprueba la conexión a internet

2. Problemas al subir archivos:
   • Comprueba el tamaño del archivo (máx. 10 MB)
   • Verifica el formato del archivo
   • Prueba con otro navegador

3. Problemas de visualización de notas:
   • Actualiza la página
   • Borra la caché del navegador
   • Comprueba la conexión a internet

4. Rendimiento del sistema:
   • Cierra otras aplicaciones
   • Borra la caché del navegador
   • Actualiza el navegador`,
          icon: <AlertTriangle className="text-red-500" size={20} />
        },
        {
          title: 'Soporte técnico',
          content: `Canales de soporte:

1. Soporte por correo electrónico:
   • soporte@titan.edu.tr
   • Respuesta en un plazo de 24 horas

2. Soporte telefónico:
   • (555) 123-4567
   • De lunes a viernes, de 8:00 a 18:00

3. Chat en directo:
   • Disponible 24/7
   • Haz clic en el botón "Ayuda"

4. Base de conocimiento:
   • Sección de preguntas frecuentes
   • Tutoriales en vídeo
   • Guías paso a paso`,
          icon: <CheckCircle className="text-green-500" size={20} />
        }
      ]
    }
  };

  const filteredSections = Object.entries(sections).reduce((acc, [key, section]) => {
    const filteredContent = section.content.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredContent.length > 0) {
      acc[key] = { ...section, content: filteredContent };
    }
    return acc;
  }, {});

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="px-4 py-6 bg-gray-50 sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <Book className="h-6 w-6 text-gray-900" />
                  <h2 className="ml-3 text-xl font-semibold text-gray-900">
                    Documentación
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar en la documentación..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <nav className="flex-1 px-4 py-4 space-y-1">
                {Object.entries(filteredSections).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setCurrentSection(key)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      currentSection === key
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="px-4 py-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {sections[currentSection].title}
                </h3>
                <div className="space-y-6">
                  {sections[currentSection].content.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                      <div className="flex items-center mb-2">
                        {item.icon}
                        <h4 className="text-md font-medium text-gray-900 ml-2">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cerrar documentación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation; 