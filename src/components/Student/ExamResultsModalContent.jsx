import React, { useState } from 'react';
import StudentExamTaker from './StudentExamTaker';
import ExamAnswersReview from './ExamAnswersReview';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
// Assuming a CircularProgress component exists or needs to be created
// import CircularProgress from './CircularProgress'; 

const ExamResultsModalContent = ({ exam,user, onClose,hight='h-40' , width='w-40 ',textSize='text-3xl',isblue=false }) => {
  const [showExam, setShowExam] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [policiesAccepted, setPoliciesAccepted] = useState(false);
  const [studentAnswers, setStudentAnswers] = useState({});

  // Find student's grade or use default values
  const studentGrade = exam.grades?.find(grade => grade.studentId === user.id) || {
    percentage: 0,
    score: 0,
    attended: false,
    passed: false
  };

  const scorePercentage = studentGrade.percentage;
  const studentScore = studentGrade;
  const correctPercentage = scorePercentage;
  const incorrectPercentage = 100 - scorePercentage;

  // Combine date and time for comparison
  const examStartTime = exam?.date && exam?.time ? new Date(`${exam.date}T${exam.time}:00`) : null;
  const examEndTime = examStartTime ? new Date(examStartTime.getTime() + (exam?.duration || 0) * 60000) : null; // add duration in minutes
  const currentTime = new Date();

  const isExamUpcoming = examStartTime && currentTime < examStartTime;
  const isExamActive = examStartTime && examEndTime && currentTime >= examStartTime && currentTime <= examEndTime;
  const isExamEnded = examEndTime && currentTime > examEndTime;

  const getExamStatusMessage = () => {
    if (isExamUpcoming) {
      return `El examen comienza el ${format(examStartTime, 'PP HH:mm', { locale: es })}`;
    }
    if (isExamEnded) {
      return `El examen finalizó el ${format(examEndTime, 'PP HH:mm', { locale: es })}`;
    }
    return ''; // Should not display a message if active
  };

  // Calculate remaining time if exam is active
  const remainingTime = isExamActive && examEndTime ? Math.max(0, Math.floor((examEndTime.getTime() - currentTime.getTime()) / 60000)) : exam?.duration;

  const handleSubmitExam = (answers) => {
    setStudentAnswers(answers);
    // Here you would typically send the answers to your backend
    onClose();
  };

  if (showExam) {
    return <StudentExamTaker exam={exam} onClose={() => setShowExam(false)} onSubmit={handleSubmitExam} remainingTime={remainingTime} />;
  }

  if (showReview) {
    return <ExamAnswersReview exam={exam} studentAnswers={studentAnswers} onClose={() => setShowReview(false)} />;
  }

  return (
    
    isblue ? 
    <div className="bg-white overflow-y-auto rounded-lg p-6 relative max-h-[90vh] max-w-2xl mx-auto">

      <div className="flex items-center mb-6">
        {/* Circular Progress Bar Placeholder */}
        <div className={`${hight} ${width}  mr-6 flex items-center justify-center`}>
          {/* Replace with actual CircularProgress component */}
          <div className="relative w-full h-full" >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50" cy="50" r="45"
                fill="none" strokeWidth="10"
                className="stroke-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="50" cy="50" r="45"
                fill="none" strokeWidth="10"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - 100 / 100)}
                strokeLinecap="round"
                className={`${
                  policiesAccepted && isExamActive
                    ? (remainingTime < (exam?.duration || 0) / 2 ? 'stroke-red-600' : 'stroke-green-600')
                    : 'stroke-blue-600'
                } transform -rotate-90 origin-center`}
              />
            </svg>
           
              <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`${
                policiesAccepted && isExamActive
                  ? (remainingTime < (exam?.duration || 0) / 2 ? 'text-red-600' : 'text-green-600')
                  : 'text-blue-600'
              } ${textSize} font-bold `}>
              {isExamActive ? `${remainingTime}min` : `${exam?.duration || 'N/D'}min`}</span>
              <span className={`text-gray-600  text-xs font-bold `}>
              {isExamActive ? 'Restante' : 'Duración'}
             </span>
            </div>
            
            
          </div>
        </div>

        {/* Exam Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{exam?.title || 'N/D'}</h3>
          <p className="text-lg text-gray-700">{exam?.course?.name || 'N/D'}</p>
          <p className="text-gray-600 mt-2"><span className="font-bold">Puntos del examen:</span> {exam?.Total_Points}</p>
          <p className="text-gray-600"><span className="font-bold">Duración:</span> {exam?.duration || 'N/D'} min</p>
          <p className="text-gray-600"><span className="font-bold">Número de preguntas:</span> {exam?.questions?.length || 'N/D'}</p>
          <p className="text-gray-600"><span className="font-bold">Temas:</span> {exam?.topics || 'N/D'}</p>
          <p className="text-green-700"><span className="font-bold ">Ubicación:</span> {exam?.location || 'N/D'}</p>
          <p className="text-gray-600 "><span className="font-bold">Fecha: </span> {exam?.date || 'N/D'}</p>
          <p className="text-gray-600 "><span className="font-bold"> Hora: </span>{exam?.time || 'N/D'}</p>
        </div>
      </div>

      {/* Answers Section */}
    
       <div>
       <p className="text-gray-600 break-words">
          <span className="font-bold">Descripción:</span> {exam?.description || 'N/D'}
        </p>

      </div>
      
      {!isExamEnded && (
        <div className="mt-10">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="policies"
              checked={policiesAccepted}
              onChange={(e) => setPoliciesAccepted(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="policies" className="ml-2 text-sm text-gray-600">
              He leído y acepto las normas del examen
            </label>
          </div>
          {!isExamActive && (
             <p className="text-red-600 text-center mb-4">{getExamStatusMessage()}</p>
          )}
          <button
            onClick={() => setShowExam(true)}
            disabled={!policiesAccepted || !isExamActive}
            className={`p-2 rounded-lg font-medium w-full ${
              policiesAccepted && isExamActive
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Comenzar examen
          </button>
        </div>
      )}
       {isExamEnded && (
           <div className="mt-10 text-center text-red-600 font-semibold">
               {getExamStatusMessage()}
           </div>
       )}
    </div>
    :
    <div className="bg-white rounded-lg p-6 relative max-w-2xl mx-auto">

      <div className="flex items-center mb-6">
        {/* Circular Progress Bar Placeholder */}
        <div className={`${hight} ${width}  mr-6 flex items-center justify-center`}>
          {/* Replace with actual CircularProgress component */}
          <div className="relative w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50" cy="50" r="45"
                fill="none" strokeWidth="10"
                className="stroke-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="50" cy="50" r="45"
                fill="none" strokeWidth="10"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={2 * Math.PI * 45 * (1 - scorePercentage / 100)}
                strokeLinecap="round"
                className={`${scorePercentage>=50?'stroke-green-500 ':'stroke-red-500 '}transform -rotate-90 origin-center`}
              />
            </svg>
            {studentScore.attended?
              <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`${scorePercentage>=50?'text-green-600 ':'text-red-600 '} ${textSize} font-bold `}>
              {Math.round(scorePercentage)}%</span>
              <span className={`${scorePercentage>=50?'text-green-600 ':'text-red-600 '} text-md font-bold `}>
              {Math.round((scorePercentage/100)*exam.Total_Points )+' /'+exam.Total_Points}</span>
            </div>
            :
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              
              <span className={`${scorePercentage>=50?'text-green-600 ':'text-red-600 '} text-2xl font-semibold `}>
              Ausente</span>
            </div>}
            
          </div>
        </div>

        {/* Exam Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{exam?.course?.code || 'N/D'}</h3>
          <p className="text-lg text-gray-700">{exam?.course?.name || 'N/D'}</p>
          <p className="text-gray-600 mt-2"><span className="font-bold">Puntos del examen:</span> {exam?.Total_Points}</p>
          <p className="text-gray-600"><span className="font-bold">Duración:</span> {exam?.duration || 'N/D'} min</p>
          <p className="text-gray-600"><span className="font-bold">Temas:</span> {exam?.topics || 'N/D'}</p>
          <p className="text-gray-600"><span className="font-bold">Número de preguntas:</span> {exam?.questions?.length || 'N/D'}</p>

          
        </div>
      </div>

      {/* Answers Section */}
      {studentScore.attended && (
        <>
          <div>
            <h4 className="text-lg font-semibold mb-3">Respuestas</h4>
            
            {/* Correct Answers */}
            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-700 mr-4 w-20">Correctas</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${correctPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-700 ml-2 w-10 text-right">{Math.round(correctPercentage)}%</span>
            </div>

            {/* Incorrect Answers */}
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4 w-20">Incorrectas</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${incorrectPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-700 ml-2 w-10 text-right">{Math.round(incorrectPercentage)}%</span>
            </div>
          </div>

          {/* Review Button */}
          <button
            onClick={() => setShowReview(true)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
          >
            Revisar respuestas
          </button>
        </>
      )}
    </div>
  );
};

export default ExamResultsModalContent; 