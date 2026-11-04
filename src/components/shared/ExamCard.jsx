import React from 'react';

export const ExamCard = ({ exam, isPrevious,onCheckDetails, onEdit,user }) => {
  // Check if exam is today
  const isExamToday = () => {
    const today = new Date();
    const examDate = new Date(exam.date);
    return today.toDateString() === examDate.toDateString();
  };

  return (
    <div className={`card w-full rounded-lg border min-h-64 ${isExamToday() ? 'bg-red-100' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}>
      <div className="card-content p-4">
        <div className="space-y-4">
          <div className="text-md font-medium text-gray-800">
            Título del examen: {exam.title}
          </div>
          <div className="text-sm text-gray-600">
                Asignatura: {exam.course?.name || 'N/D'}
          </div>
          <div className="text-sm text-gray-600">
                Clases: {(exam.course?.classes || []).join(', ') || 'N/D'}
          </div>
          <div className="text-sm text-gray-600">
            Fecha: {exam.date}  Hora: {exam.time}
          </div>
          <div className="text-sm text-gray-600">
            Duración: {exam.duration}
          </div>
          <div className="text-sm text-gray-600">
            Ubicación:   
            { exam.isOnline ?
            <span className="bg-green-100 text-green-700 ml-2 px-2 py-1 rounded-full text-sm font-medium">
             {exam.location}
            </span>
            :
            <span className="  ml-2 px-2 py-1 text-black  rounded-full text-sm font-medium">
             {exam.location}
            </span>
            }
          </div>
          <div className="text-sm text-gray-600">
            Temas: {exam.topics}
          </div>
          <div className="text-sm text-gray-600">
            Número de preguntas: {exam.number_of_questions}
          </div>
          <div className="text-sm text-gray-600">
           Puntos totales: {exam.Total_Points}
          </div>
          {(onCheckDetails || onEdit) && (
            <div className="space-y-3">
             
              {onEdit &&(
                <button
                className="w-full text-sm h-10 rounded-lg bg-blue-600 hover:opacity-90 text-white"
                  onClick={() => onEdit(exam)}
                >
                 {isPrevious?' Renovar examen':'Editar'}
                </button>
              )}
               {onCheckDetails && isPrevious && (
                <button
                  onClick={() => onCheckDetails(exam)}
                  className="w-full text-sm h-10 rounded-lg bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 text-white"
                >
              Ver notas
                </button>
              )}
              {onCheckDetails && !isPrevious && user.role==='student' &&(
                <button
                  onClick={() => onCheckDetails(exam)}
                  className={`w-full text-sm h-10 rounded-lg text-white ${
                    isExamToday() ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:opacity-90'
                  }`}
                >
                {isExamToday() ? "Comenzar examen":'Ver detalles del examen'} 
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamCard;