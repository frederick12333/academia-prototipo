import React, { useState } from 'react';
import { Trash2  } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { courses, lectures } from '../../data/mockData'; // Import lectures

export const AbsenceJustificationModal = ({
  isOpen,
  onClose,
}) => {
  const { user: authUser } = useAuth();
  const isStudent = authUser.role === 'student';

  // State for the lecture type (coming or old)
  const [lectureType, setLectureType] = useState('coming'); // 'coming' or 'old'

  // State for selected course and lecture
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLecture, setSelectedLecture] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState (null);

  // Filter lectures based on selected course and lecture type
  const filteredLectures = lectures.filter(lecture => {
    const lectureDate = new Date(lecture.date); // Assuming lecture object has a date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    const isComing = lectureDate >= today;
    const isOld = lectureDate < today;

    const matchesType = lectureType === 'coming' ? isComing : isOld;
    const matchesCourse = selectedCourse === '' || lecture.courseId === Number(selectedCourse);

    return matchesType && matchesCourse;
  });


  const handleSend = () => {
    console.log('Submitting justification request:', {
      courseId: selectedCourse,
      lectureId: selectedLecture,
      message,
      file,
      lectureType
    });

    // Here you would typically send the justification request to your backend

    // Reset form
    setLectureType('coming');
    setSelectedCourse('');
    setSelectedLecture('');
    setMessage('');
    setFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  if (!isOpen) return null;

  return (
      <div className="bg-white w-[40vw] max-w-5xl rounded-lg relative overflow-y-auto max-h-[90vh] p-2">
        <h2 className="text-xl font-semibold text-center mb-6">Solicitud de justificación</h2>

        {/* Coming/Old Lecture Buttons */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 w-full  py-2 rounded-l-lg font-medium ${lectureType === 'coming' ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129]  text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLectureType('coming')}
          >
            Próxima clase
          </button>
          <button
            className={`px-4 py-2 w-full  rounded-r-lg font-medium ${lectureType === 'old' ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129]  text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setLectureType('old')}
          >
            Clase anterior
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="space-y-4">
          {/* Course Selection */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Asignatura</label>
            <select
              id="course"
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedLecture(''); // Reset lecture when course changes
              }}
            >
              <option value="">Selecciona una asignatura</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Lecture Selection */}
          <div>
            <label htmlFor="lecture" className="block text-sm font-medium text-gray-700">Clase</label>
            <select
              id="lecture"
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              value={selectedLecture}
              onChange={(e) => setSelectedLecture(e.target.value)}
              disabled={!selectedCourse || filteredLectures.length === 0} // Disable if no course selected or no lectures found
            >
              <option value="">Selecciona una clase</option>
              {filteredLectures.map((lecture) => (
                <option key={lecture.id} value={lecture.id}>
                  {/* Display lecture info, e.g., Subject - Date - Time */}
                  {`${lecture.subject} - ${lecture.date} - ${lecture.time}`}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder="Mensaje"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Archivo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-200">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-gray-300 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="px-2">Subir un archivo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1 text-gray-700">o arrastra y suelta</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX hasta 10 MB</p>
                 {file && (
                  <div className='flex bg-gray-300 items-center justify-between cursor-text h-8 my-1 rounded-md p-2'>
                    <p className="text-sm text-gray-700">
                      {file.name}
                    </p>
                    <Trash2 onClick={() => setFile(null)} className='bg-gray-400 w-5 text-sm cursor-pointer text-gray-800 rounded-md ml-2 p-1'>X</Trash2>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2 font-semibold"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-red-600 hover:opacity-90 rounded-lg text-white py-2 font-semibold"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
  );
};
