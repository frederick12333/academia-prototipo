import React, { useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { courses } from '../../data/mockData'; // Import courses

export const SendPetitionModal = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth(); // Use user if needed for context

  const [petitionTitle, setPetitionTitle] = useState('');
  const [petitionBody, setPetitionBody] = useState('');
  const [recipient, setRecipient] = useState(''); // Or use a dropdown with options
  const [selectedCourse, setSelectedCourse] = useState(''); // Add state for selected course
  const [file, setFile] = useState(null);

  const handleSend = () => {
    console.log('Submitting petition:', {
      petitionTitle,
      petitionBody,
      recipient,
      courseId: selectedCourse, // Include selected course
      file,
      sender: user.id // Include sender info
    });

    // Here you would typically send the petition data to your backend

    // Reset form
    setPetitionTitle('');
    setPetitionBody('');
    setRecipient('');
    setSelectedCourse(''); // Reset selected course
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

  if (!isOpen) return null; // The ModalProvider handles visibility, but this is a safeguard

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[40vw] max-w-5xl rounded-lg relative overflow-y-auto max-h-[90vh] p-6">
        {/* Close button provided by ModalProvider, so no need for X here */}
        <h2 className="text-xl font-semibold text-center mb-6">Enviar solicitud</h2>

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="space-y-4">
          {/* Petition Title */}
          <div>
            <label htmlFor="petitionTitle" className="block text-sm font-medium text-gray-700">Título de la solicitud</label>
            <input
              id="petitionTitle"
              type="text"
              value={petitionTitle}
              onChange={(e) => setPetitionTitle(e.target.value)}
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder="Escribe el título de la solicitud"
            />
          </div>

           {/* Related Course Selection */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Asignatura relacionada (opcional)</label>
            <select
              id="course"
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Selecciona una asignatura</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>


          {/* Recipient (Simple Input for now) */}
           <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Para (p. ej., administración del centro)</label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder="Especifica el destinatario"
            />
          </div>

          {/* Petition Body/Description */}
          <div>
            <label htmlFor="petitionBody" className="block text-sm font-medium text-gray-700">Detalles de la solicitud</label>
            <textarea
              id="petitionBody"
              value={petitionBody}
              onChange={(e) => setPetitionBody(e.target.value)}
              rows="6"
              className='mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder="Explica el problema y tu solicitud..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Documentos de apoyo (opcional)</label>
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
                    htmlFor="petition-file-upload"
                    className="relative cursor-pointer bg-gray-300 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="px-2">Subir un archivo</span>
                    <input id="petition-file-upload" name="petition-file-upload" type="file" className="sr-only" onChange={handleFileChange} />
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
              className="w-full bg-purple-900 hover:opacity-90 rounded-lg text-white py-2 font-semibold"
            >
              Enviar solicitud
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-red-600 hover:opacity-90 rounded-lg text-white py-2 font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 