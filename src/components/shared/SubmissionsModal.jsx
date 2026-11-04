import React from 'react';

export const SubmissionsModal = ({ isOpen, onClose, submissions, assignment }) => {
  return (
    <>
      <div className="max-w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 mb-4 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-center flex-1">Lista de entregas de la tarea</h2>
        </div>

        {/* Assignment Details */}
        <div className="mb-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <span className="font-medium">ID de la tarea:</span> {assignment?.assignmentId || 'N/D'}
            </div>
            <div>
              <span className="font-medium">Asignatura:</span> {assignment?.courseName || 'N/D'}
            </div>
            <div>
              <span className="font-medium">Título de la tarea:</span> {assignment?.title || 'N/D'}
            </div>
            <div>
              <span className="font-medium">Fecha límite:</span> {assignment?.deadline || 'N/D'}
            </div>
            <div>
              <span className="font-medium">Hora límite:</span> {assignment?.time || 'N/D'}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="max-h-[80vh] text-sm">
          <table className="min-w-full">
            <thead className="bg-gray-100 rounded-lg sticky top-7">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Información</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID del alumno</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Archivo</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nota de la tarea</th>
              </tr>
            </thead>
            <tbody>
              {submissions && Array.isArray(submissions) &&
                submissions.map((sub, index) => (
                  <tr
                    key={sub.id || index}
                    className={
                      sub.status === "not-submitted" ? "bg-red-50 hover:bg-blue-100" : index % 2 === 0 ? "bg-white hover:bg-blue-100" : "hover:bg-blue-100 bg-blue-50"
                    }
                  >
                    <td className="px-2 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
                          {sub.studentName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "U"}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{sub.studentName || 'Alumno'}</div>
                          <div className="text-sm text-gray-500">{sub.className || "3A"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{sub.studentId}</td>
                    <td className="px-6 py-4">
                      {sub.fileName ? (
                        <a
                          href={sub.fileUrl || "#"}
                          className="text-blue-600 hover:text-blue-800 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver
                        </a>
                      ) : (
                        <span className="text-gray-400">----</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          sub.status === "submitted" ? "text-green-600 font-medium" : "text-red-600 font-medium"
                        }
                      >
                        {sub.status === "submitted" ? "Entregado" : "No entregado"}
                      </span>
                    </td>
                    <td className="px-16 py-4 text-gray-900 font-medium">{sub.grade || "----"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex justify-between gap-4 mt-4 -mb-4'>
        <button
          type="button"
          className="w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2"
        >
          Descargar lista
        </button>
        <button
          type="button"
          className="w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2"
        >
          Exportar como lista de notas
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2"
        >
          Cerrar
        </button>
      </div>
    </>
  );
};
