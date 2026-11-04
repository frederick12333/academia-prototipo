import React, { useState, useEffect } from 'react';

const QuestionEditor = ({ question, onQuestionUpdate }) => {
  const [localQuestion, setLocalQuestion] = useState(question);

  useEffect(() => {
    if (question) {
      setLocalQuestion(question);
    }
  }, [question]);

  const updateLocalQuestion = (updates) => {
    const updated = { ...localQuestion, ...updates };
    setLocalQuestion(updated);
    onQuestionUpdate(updated); 
  };

  const updateChoice = (index, value) => {
    const newChoices = [...(localQuestion.choices || ['', '', '', ''])];
    newChoices[index] = value;
    updateLocalQuestion({ choices: newChoices });
  };

  const addChoice = () => {
    const newChoices = [...(localQuestion.choices || []), ''];
    updateLocalQuestion({ choices: newChoices });
  };

  const removeChoice = (index) => {
    const newChoices = (localQuestion.choices || []).filter((_, i) => i !== index);
    updateLocalQuestion({ choices: newChoices });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-6 rounded-lg">
        <label htmlFor="question-text" className="text-lg font-semibold block mb-3">
          Escribe tu pregunta
        </label>
        <textarea
          id="question-text"
          value={localQuestion.question}
          onChange={(e) => updateLocalQuestion({ question: e.target.value })}
          placeholder="Escribe aquí tu pregunta..."
          className="w-full p-3 bg-gray-300 rounded-md border border-gray-300 min-h-[100px] text-lg"
        />
      </div>

      {/* Image Upload Placeholder */}
      <div className="space-y-3">
        <label className="text-lg font-semibold">Imagen del examen</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
          <div className="text-gray-400 text-4xl mb-4">📤</div>
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
            Subir imagen
          </button>
        </div>
      </div>

      {/* Answer Choices */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold">Opciones de respuesta</label>
          <button
            onClick={addChoice}
            className="px-3 py-1 bg-green-600 hover:bg-green-800 text-white rounded text-sm"
          >
            Agregar opción
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`randomize-choices-${localQuestion.id}`}
            checked={localQuestion.isRandomChoicesOrder || false}
            onChange={(e) => updateLocalQuestion({ isRandomChoicesOrder: e.target.checked })}
            className="form-checkbox h-4 w-4   rounded"
          />
          <label htmlFor={`randomize-choices-${localQuestion.id}`} className="text-sm font-medium text-red-600">
            Aleatorizar el orden de las opciones
          </label>
        </div>

        <div className="space-y-3">
          {(localQuestion.choices || ['', '', '', '']).map((choice, index) => (
            <div key={index} className="flex items-center gap-3">
              <label className="min-w-[80px]">Opción {index + 1}</label>
              <input
                type="text"
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
                placeholder={`Escribe la opción ${index + 1}`}
                className="flex-1 p-2 border bg-gray-300 text-black border-gray-300 rounded"
              />
              {(localQuestion.choices?.length || 0) > 2 && (
                <button
                  onClick={() => removeChoice(index)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Correct Answer Selection */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Selecciona la respuesta correcta:
          </label>
          <div className="flex flex-wrap gap-2">
            {(localQuestion.choices || []).map((choice, index) => (
              <button
                key={index}
                onClick={() => updateLocalQuestion({ correctAnswer: choice })}
                disabled={!choice.trim()}
                className={`px-3 py-1 rounded text-sm ${
                  localQuestion.correctAnswer === choice
                    ? 'bg-green-700 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Opción {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Points Input */}
      <div className="flex items-center gap-4 mt-6">
        <label htmlFor="points" className="text-lg font-semibold">Puntos:</label>
        <input
          id="points"
          type="number"
          value={localQuestion.points}
          onWheel={(e) => e.target.blur()} 
          onChange={(e) =>
            updateLocalQuestion({ points: parseInt(e.target.value) })
          }
          className="w-20 bg-gray-300 p-2 border border-gray-300 rounded"
          min="1"
        />
      </div>
      
    </div>
  );
};

export default QuestionEditor;
