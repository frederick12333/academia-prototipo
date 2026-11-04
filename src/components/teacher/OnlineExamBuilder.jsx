// OnlineExamBuilder.js (pure HTML + Tailwind CSS)
import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import QuestionEditor from './CreateQuestions';

const OnlineExamBuilder = ({ open, onOpenChange, onBack, examData }) => {
  // Initialize totalQuestions from examData
  const initialTotalQuestions = examData?.number_of_questions || 20;

  // Initialize questions array based on the number of questions
  const createEmptyQuestions = (numQuestions) => {
    const questions = [];
    for (let i = 1; i <= numQuestions; i++) {
      questions.push({
        id: i,
        type: 'multiple-choice',
        question: '',
        choices: ['', '', '', ''],
        correctAnswer: '',
        points: 1,
        isRandomChoicesOrder:false,

      });
    }
    return questions;
  };

  const [questions, setQuestions] = useState(createEmptyQuestions(initialTotalQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(initialTotalQuestions);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      type: 'multiple-choice',
      question: '',
      choices: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
    setTotalQuestions(questions.length + 1); // Update total questions when adding
  };

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q))
    );
    console.log('questions :',questions);
    
  };

  const getCurrentQuestionData = () => {
    return (
      questions.find((q) => q.id === currentQuestion) || {
        id: currentQuestion,
        type: 'multiple-choice',
        question: '',
        choices: ['', '', '', ''],
        correctAnswer: '',
        points: '',
        isRandomChoicesOrder:false,
      }
    );
  };

  const handleQuestionNavigation = (questionNumber) => {
    setCurrentQuestion(questionNumber);
   
  };

  const handleSubmitExam = () => {
    console.log('Creating online exam with questions:', { examData, questions });
    onOpenChange(false);
  };

  return (
    <div className="max-w-4xl w-screen max-h-full p-4 mx-auto bg-white shadow-md rounded-md">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 text-purple-900 hover:bg-purple-100 rounded">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-2xl font-bold">Preguntas</h2>
      </div>

      {/* Question Numbers */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
          const hasData = questions.some(
            (q) => q.id === num && q.question.trim() !== ''
          );
          return (
            <button
              key={num}
              onClick={() => handleQuestionNavigation(num)}
              className={`w-10 h-10 rounded-full font-bold text-sm transition-colors ${
                currentQuestion === num
                  ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white'
                  : hasData
                  ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white'
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Current Question Title */}
      <div className="bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-center">
          Pregunta: {currentQuestion}
        </h3>
      </div>

      {/* QuestionEditor */}
      <QuestionEditor
        question={getCurrentQuestionData()}
        onQuestionUpdate={(data) => updateQuestion(currentQuestion, data)}
      />

      {/* Controls */}
      <div className="flex justify-between gap-28 items-center mt-4 pt-4 border-t text-sm">
          <button
            onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
            disabled={currentQuestion === 1}
            className="flex gap-2 justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft />
            Pregunta anterior
          </button>
          <button
            onClick={() =>
              setCurrentQuestion(Math.min(totalQuestions, currentQuestion + 1))
            }
            disabled={currentQuestion === totalQuestions}
            className="flex gap-2 justify-center items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 disabled:opacity-50"
          >
            Siguiente pregunta
            <ChevronRight />

          </button>
        </div>
      
      <div className="flex justify-between gap-28 items-center mt-4 pt-4 border-t">

        <button
              type="button"
              onClick={onBack}
              className="flex gap-2 justify-center items-center w-full bg-red-500 hover:opacity-90 rounded-lg text-white py-2"
            >
             {'Volver'}
             
            </button>
            
      <button
          onClick={handleSubmitExam}
          className="w-full bg-blue-500 hover:opacity-90 rounded-lg text-white py-2"
          >
          Enviar todo
        </button>
    </div>
    </div>
  );
};

export default OnlineExamBuilder;
