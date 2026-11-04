import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const StudentExamTaker = ({ exam, onClose, onSubmit, remainingTime }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState((remainingTime > 0 ? remainingTime : exam.duration) * 60); // Use remainingTime if provided, else use total duration
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit(answers);
  };

  const getCurrentQuestionData = () => {
    return exam.questions.find(q => q.id === `${exam.id}-${currentQuestion}`) || null;
  };

  const handleQuestionNavigation = (questionNumber) => {
    setCurrentQuestion(questionNumber);
  };

  return (
    <div className="max-w-4xl w-screen max-h-[90vh] p-4 mx-auto bg-white shadow-md rounded-md overflow-y-auto">
      {/* Header with Timer */}
      <div className="flex items-center justify-between mb-6  bg-white z-10 pb-4 border-b">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 text-purple-900 hover:bg-purple-100 rounded">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-2xl font-bold">{exam.title}</h2>
        </div>
        <div className="flex items-center gap-2 bg-red-100 px-4 py-2 rounded-lg">
          <Clock className="w-5 h-5 text-red-600" />
          <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Numbers */}
      <div className="flex flex-wrap gap-2 mb-6">
        {exam.questions.map((_, index) => {
          const questionNumber = index + 1;
          const isAnswered = answers[`${exam.id}-${questionNumber}`];
          return (
            <button
              key={questionNumber}
              onClick={() => handleQuestionNavigation(questionNumber)}
              className={`w-10 h-10 rounded-full font-bold text-sm transition-colors ${
                currentQuestion === questionNumber
                  ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white'
                  : isAnswered
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>

      {/* Current Question */}
      <div className="bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold">
          Pregunta {currentQuestion} de {exam.questions.length}
        </h3>
      </div>

      {/* Question Content */}
      <div className="mb-8">
        {getCurrentQuestionData() && (
          <>
            <div className="mb-6">
              <p className="text-lg font-medium mb-4">{getCurrentQuestionData().question}</p>
              {getCurrentQuestionData().image && (
                <img 
                  src={getCurrentQuestionData().image} 
                  alt="Pregunta" 
                  className="max-w-full h-auto rounded-lg mb-4"
                />
              )}
            </div>

            {/* Answer Choices */}
            <div className="space-y-3">
              {getCurrentQuestionData().Choices.map((choice, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    answers[getCurrentQuestionData().id] === choice.value
                      ? 'bg-blue-50 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${getCurrentQuestionData().id}`}
                    value={choice.value}
                    checked={answers[getCurrentQuestionData().id] === choice.value}
                    onChange={(e) => handleAnswerChange(getCurrentQuestionData().id, e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3">{choice.value}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between gap-28 items-center mt-4 pt-4 border-t">
        <button
          onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
          disabled={currentQuestion === 1}
          className="flex gap-2 justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft />
          Pregunta anterior
        </button>
        <button
          onClick={() => setCurrentQuestion(Math.min(exam.questions.length, currentQuestion + 1))}
          disabled={currentQuestion === exam.questions.length}
          className="flex gap-2 justify-center items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 disabled:opacity-50"
        >
          Siguiente pregunta
          <ChevronRight />
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar examen'}
        </button>
      </div>
    </div>
  );
};

export default StudentExamTaker; 