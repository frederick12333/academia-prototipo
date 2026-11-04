import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';
import { useAcademic } from '../../contexts/AcademicContext';

const RED = '#C0392B';

export const ConfigureWeightsModal = ({ isOpen, onClose }) => {
  const { evaluationColumns, updateWeights, addEvaluationColumn, removeEvaluationColumn } = useAcademic();

  const [columns, setColumns] = useState(() => structuredClone(evaluationColumns));
  const [newColName, setNewColName] = useState('');
  const [newColWeight, setNewColWeight] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Cálculo en tiempo real del total
  const currentTotal = columns.reduce((sum, col) => sum + (parseFloat(col.weight) || 0), 0);
  const isOver100 = currentTotal > 100.001;
  const isExact100 = Math.abs(currentTotal - 100) < 0.01;
  const isValidTotal = !isOver100 && currentTotal > 0;

  const handleWeightChange = (index, value) => {
    setErrorMsg('');
    setSuccessMsg('');
    const num = value === '' ? 0 : Math.max(0, Math.min(100, parseFloat(value) || 0));
    setColumns(prev => {
      const next = [...prev];
      next[index] = { ...next[index], weight: num };
      return next;
    });
  };

  const handleSave = () => {
    if (isOver100) {
      setErrorMsg(`La suma de ponderaciones no puede exceder el 100%. Actualmente suma ${currentTotal.toFixed(1)}% (Excedido en ${(currentTotal - 100).toFixed(1)}%).`);
      return;
    }
    const res = updateWeights(columns);
    if (res.success) {
      setSuccessMsg('¡Ponderaciones guardadas y actualizadas correctamente!');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setErrorMsg(res.error);
    }
  };

  const handleAddNewColumn = (e) => {
    e.preventDefault();
    if (!newColName.trim()) {
      setErrorMsg('Ingresa un nombre para la nueva evaluación.');
      return;
    }
    const weightNum = parseFloat(newColWeight) || 0;
    if (currentTotal + weightNum > 100) {
      setErrorMsg(`No se puede agregar con peso de ${weightNum}% porque la suma excedería el 100% (alcanzaría ${(currentTotal + weightNum).toFixed(1)}%).`);
      return;
    }
    const added = addEvaluationColumn(newColName.trim(), weightNum);
    setColumns(prev => [...prev, added]);
    setNewColName('');
    setNewColWeight('');
    setErrorMsg('');
  };

  const handleRemove = (colId) => {
    if (columns.length <= 1) {
      setErrorMsg('Debe mantenerse al menos una evaluación.');
      return;
    }
    removeEvaluationColumn(colId);
    setColumns(prev => prev.filter(c => c.id !== colId));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
        {/* Cabecera */}
        <div className="px-6 py-4 flex items-center justify-between text-white" style={{ backgroundColor: RED }}>
          <div className="flex items-center gap-2">
            <Scale size={20} />
            <div>
              <h3 className="font-bold text-base">Ponderación de Evaluaciones (Pesos %)</h3>
              <p className="text-[11px] text-red-100">Docente: Jhon Wick • Academia Apu San Antonio</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-gray-800">
          <p className="text-xs text-gray-500 leading-relaxed">
            Modifica los pesos de cada evaluación (ej. Primer Examen = 50%). La suma total de los pesos <strong>no debe exceder el 100%</strong>.
          </p>

          {/* Listado de Evaluaciones y Pesos */}
          <div className="space-y-2.5">
            {columns.map((col, idx) => (
              <div key={col.id} className="flex items-center justify-between gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm font-semibold text-gray-800 flex-1">{col.name}</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={col.weight}
                    onChange={(e) => handleWeightChange(idx, e.target.value)}
                    className="w-20 px-2.5 py-1 text-center font-bold text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <span className="text-sm font-bold text-gray-500">%</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(col.id)}
                  title="Eliminar columna"
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Indicador de Suma en Tiempo Real */}
          <div className={`p-3 rounded-lg border flex items-center justify-between ${
            isOver100
              ? 'bg-red-50 border-red-200 text-red-800'
              : isExact100
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              {isOver100 ? (
                <AlertTriangle size={18} className="text-red-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
              )}
              <span>
                {isOver100
                  ? `Inválido: Excede el 100% por ${(currentTotal - 100).toFixed(1)}%`
                  : isExact100
                  ? 'Suma óptima: 100% (Válido)'
                  : `Total: ${currentTotal.toFixed(1)}% (Válido, no excede el 100%)`}
              </span>
            </div>
            <span className="text-base font-bold">{currentTotal.toFixed(1)}%</span>
          </div>

          {errorMsg && (
            <div className="p-2.5 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 text-xs bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {successMsg}
            </div>
          )}

          {/* Formulario para Añadir Nueva Columna de Evaluación */}
          <div className="pt-3 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              + Añadir Nueva Columna Evaluativa
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej. Intervención Oral / Paso"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <input
                type="number"
                placeholder="Peso %"
                min="0"
                max="100"
                value={newColWeight}
                onChange={(e) => setNewColWeight(e.target.value)}
                className="w-20 px-2 py-1.5 text-center text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <button
                type="button"
                onClick={handleAddNewColumn}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-md text-xs font-semibold hover:bg-black transition-colors flex items-center gap-1"
              >
                <Plus size={14} /> Añadir
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValidTotal}
            className="px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            style={{ backgroundColor: RED }}
          >
            Guardar Ponderaciones
          </button>
        </div>
      </div>
    </div>
  );
};
