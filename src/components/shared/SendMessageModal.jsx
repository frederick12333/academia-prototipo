import React, { useState, useEffect } from 'react';
import { Trash2  } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockData';
import { useNotification } from '../../contexts/NotificationContext';
import { useSaveNotification } from '../../contexts/SaveNotificationContext';

export const SendMessageModal = ({
  isOpen,
  onClose,
  replyTo
}) => {
  const { user: authUser } = useAuth();
  const { showNotification } = useNotification();
  const isStudent = authUser.role === 'student';
  const { showSaveNotification, hideSaveNotification } = useSaveNotification();

  const [selectedCourse, setSelectedCourse] = useState(replyTo?.courseId || 'all');
  const [subject, setSubject] = useState(replyTo?.subject ? `Re: ${replyTo?.subject}` : '');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState (null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Convert selectedCourse to number if it's not 'all'
  const courseId = selectedCourse === 'all' ? 'all' : Number(selectedCourse);
  const selectedCourseData = courses.find(course => course.id === courseId);
  

  
  // Get available recipients based on user role
  const availableRecipients = selectedCourse === 'all' 
    ? isStudent
      ? [...new Map(courses
          .filter(course => course.teacher && course.teacher.id) // Filter out courses without teachers
          .map(course => [course.teacher.id, course.teacher])).values()]
      : [...new Map(courses
          .flatMap(course => course.students || [])
          .filter(student => student && student.id) // Filter out invalid students
          .map(student => [student.id, student])).values()]
    : isStudent
      ? selectedCourseData?.teacher ? [selectedCourseData.teacher] : []
      : selectedCourseData?.students || []; // Show all students in the selected course
  
  console.log('Available Recipients:', availableRecipients);

  const [selectedRecipient, setSelectedRecipient] = useState(replyTo?.senderId || '');

  // Reset recipient when course changes
  useEffect(() => {
    setSelectedRecipient('');
    setHasUnsavedChanges(true);
  }, [selectedCourse]);

  
  useEffect(() => {
    let timeoutId;
    let intervalId;


    if (isOpen && hasUnsavedChanges) {
      // Initial delay of 10 seconds before the first notification
      timeoutId = setTimeout(() => {
        showSaveNotification();
        // Then show every 10 seconds
        intervalId = setInterval(() => {
          showSaveNotification();
        }, 10000); // 10 seconds
      }, 10000); // Initial 10 seconds delay
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen,hasUnsavedChanges, showSaveNotification]);

  const handleSend = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validation logic
    if (!selectedRecipient || selectedRecipient === '') {
      showNotification('Selecciona un destinatario.', 'error');
      return;
    }
    if (!subject.trim()) {
      showNotification('El asunto no puede estar vacío.', 'error');
      return;
    }
    if (!message.trim()) {
      showNotification('El mensaje no puede estar vacío.', 'error');
      return;
    }

    console.log('Sending message:', {
      course: selectedCourse,
      recipient: selectedRecipient,
      subject,
      message,
      file
    });
    
    // Simulate success for now
    showNotification('¡Mensaje enviado correctamente!', 'success');

    // Reset form and hide notification
    setHasUnsavedChanges(false);
    hideSaveNotification();
    setSelectedCourse('all');
    setSelectedRecipient('');
    setSubject('');
    setMessage('');
    setFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setHasUnsavedChanges(true);
    }
  };

  return (
    <div className=" w-[40vw] max-w-5xl rounded-lg relative overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-semibold text-center">Enviar mensaje</h2>
      <div className='w-full px-2'>
        <form onSubmit={handleSend} className="space-y-10">
          <div className="space-y-2">
            <div className='w-full px-2'>
              <label className="block text-sm font-medium">Sobre qué asignatura enviarás este mensaje</label>
              <select 
                className='bg-gray-300 w-full h-8 rounded-md cursor-pointer px-2' 
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setHasUnsavedChanges(true);
                }}
              >
                <option value="all">Todas las asignaturas</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          
            <div className='w-full px-2'>
              <label className="block text-sm font-medium">Para</label>
              <select 
                className='bg-gray-300 w-full h-8 rounded-md cursor-pointer px-2' 
                value={selectedRecipient} 
                onChange={(e) => {
                  setSelectedRecipient(e.target.value);
                  setHasUnsavedChanges(true);
                }}
              >
                <option value="">Selecciona {isStudent ? 'Docente' : 'Alumno'}</option>
                {availableRecipients.map((recipient) => (
                  <option key={recipient.id} value={recipient.id}>
                    {recipient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='w-full px-2'>
              <label htmlFor="subject">Asunto:</label>
              <input
                id="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                placeholder="Asunto"
                className='bg-gray-300 w-full h-8 rounded-md p-2'    
              />
            </div>

            <div className='w-full px-2'>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                placeholder="Mensaje"
                className='bg-gray-300 w-full text-sm rounded-md min-h-28 p-2' 
              />
            </div>

            <div className='w-full px-2'>
              <label className="block text-sm font-medium mb-2">Archivo</label>
              <div className="bg-gray-300 w-full p-4 rounded-lg border-2 border-dashed border-gray-400">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer hover:opacity-90">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-gray-600 text-white px-6 py-2 text-sm rounded-lg flex items-center gap-2">
                      Subir archivo
                    </div>
                  </div>
                </label>
                {file && (
                  <div className='flex bg-gray-400 items-center justify-between cursor-text h-8 my-1 rounded-md p-2'>
                    <p className="text-sm text-gray-600">
                      {file.name}
                    </p>
                    <Trash2 onClick={() => {
                      setFile(null);
                      setHasUnsavedChanges(true);
                    }} className='bg-gray-200 w-5 text-sm cursor-pointer text-black rounded-md ml-2'>X</Trash2>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='flex gap-4'>
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => {
                setHasUnsavedChanges(false);
                hideSaveNotification();
                onClose();
              }}
              className="w-full bg-red-700 hover:opacity-90 rounded-lg text-white py-2"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
