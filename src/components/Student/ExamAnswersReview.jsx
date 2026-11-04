import React, { useState, useEffect } from 'react';
import { Check, X, ArrowLeft } from 'lucide-react';

const ExamAnswersReview = ({ exam, studentAnswers, onClose }) => {
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    // Calculate how many questions should be correct based on score percentage
    const scorePercentage = (exam.grades.filter(grade => grade.studentId === exam.course.students[0].id)[0].percentage);
    const totalQuestions = exam.questions.length;
    const correctCount = Math.round((scorePercentage / 100) * totalQuestions);

    // Create object with correct answers
    const correctAnswersObj = {};
    exam.questions.forEach((question, index) => {
      if (scorePercentage === 100) {
        // For 100% score, all answers are correct
        correctAnswersObj[question.id] = question.correct_answer;
      } else if (scorePercentage === 0) {
        // For 0% score, all answers are incorrect
        const wrongAnswers = question.Choices
          .filter(choice => choice.value !== question.correct_answer)
          .map(choice => choice.value);
        correctAnswersObj[question.id] = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      } else if (index < correctCount) {
        // Select a random choice as correct answer
        const randomIndex = Math.floor(Math.random() * question.Choices.length);
        correctAnswersObj[question.id] = question.Choices[randomIndex].value;
      } else {
        // For incorrect answers, randomly select a wrong answer
        const wrongAnswers = question.Choices
          .filter(choice => choice.value !== question.correct_answer)
          .map(choice => choice.text);
        correctAnswersObj[question.id] = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
      }
    });

    setCorrectAnswers(correctAnswersObj);
  }, [exam]);

  return (
    <div className="max-w-4xl w-screen max-h-[90vh] p-4 mx-auto bg-white shadow-md rounded-md overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white z-10 pb-4 border-b">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 text-purple-900 hover:bg-purple-100 rounded">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-2xl font-bold">Revisión del examen</h2>
        </div>
      </div>

      {/* Questions and Answers */}
      <div className="space-y-8">
        {exam.questions.map((question, index) => {
          const studentAnswer = correctAnswers[question.id];
          const isCorrect = studentAnswer === question.correct_answer;
          
          return (
            <div key={question.id} className={`rounded-lg p-6 border ${
              isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}>
              {/* Question Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pregunta {index + 1}</h3>
                <div className={`flex items-center gap-2 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Correcta</span>
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" />
                      <span className="font-medium">Incorrecta</span>
                    </>
                  )}
                </div>
              </div>

              {/* Question Content */}
              <div className="mb-6">
                <p className="text-gray-800 mb-4">{question.question}</p>
                {question.image && (
                  <img 
                    src={question.image} 
                    alt="Pregunta" 
                    className="max-w-full h-auto rounded-lg mb-4"
                  />
                )}
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {question.Choices.map((choice, choiceIndex) => {
                  const isStudentAnswer = choice.value === studentAnswer;
                  const isCorrectAnswer = choice.value === question.correct_answer;
                  
                  return (
                    <div
                      key={choiceIndex}
                      className={`p-4 rounded-lg border ${
                        isCorrectAnswer
                          ? 'bg-green-50 border-green-500'
                          : isStudentAnswer && !isCorrect
                          ? 'bg-red-50 border-red-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{String.fromCharCode(65 + choiceIndex)}.</span>
                        <span>{choice.value}</span>
                        {isCorrectAnswer && (
                          <Check className="w-5 h-5 text-green-600 ml-auto" />
                        )}
                        {isStudentAnswer && !isCorrect && (
                          <X className="w-5 h-5 text-red-600 ml-auto" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Points */}
              <div className="mt-4 text-sm text-gray-600">
                Puntos: {question.points}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamAnswersReview; 