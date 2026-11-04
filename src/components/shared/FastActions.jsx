import React, { useState, useEffect } from 'react';
import { AbsenceJustificationModal } from '../Student/AbsenceJustificationModal';
import { SendPetitionModal } from '../Student/SendPetitionModal';
import { useModal } from '../../contexts/ModalProvider';
import { CreatePhysicalExamModal } from '../teacher/CreatePhysicalExamModal';
import { CreateHybridAssignmentModal } from '../teacher/CreateHybridAssignmentModal';
import { Settings, Check, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Rojo institucional
const RED = '#C0392B';

const FastActions = ({ user }) => {
  const [isEditing, setIsEditing]         = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const { showModal, hideModal }          = useModal();
  const navigate                          = useNavigate();

  // Acciones disponibles estrictamente orientadas a labor pedagógica (sin gestión administrativa)
  const availableActions = {
    teacher: [
      { id: 'new_assignment', label: 'Nueva Tarea Física',     action: 'new_assignment' },
      { id: 'add_exam',       label: 'Programar Examen Físico', action: 'add_exam' },
      { id: 'upload_grades',  label: 'Calificar Evaluaciones', action: 'upload_grades' },
    ],
    student: [
      { id: 'absence_justification', label: 'Justificar Inasistencia', action: 'absence_justification' },
      { id: 'send_petition',         label: 'Enviar Solicitud',        action: 'send_petition' },
      { id: 'view_assignments',      label: 'Ver Tareas',              action: 'view_assignments' },
    ],
  };

  useEffect(() => {
    const saved = localStorage.getItem(`fastActions_${user?.role}`);
    const forbiddenIds = ['add_student', 'new_subject', 'new_announcement', 'send_message', 'new_class'];

    if (saved) {
      try {
        const parsed = JSON.parse(saved).filter(
          a => !forbiddenIds.includes(a.id) && !forbiddenIds.includes(a.action)
        );
        const validList = parsed.length > 0 ? parsed : (availableActions[user?.role] || []);
        setSelectedActions(validList);
        localStorage.setItem(`fastActions_${user?.role}`, JSON.stringify(validList));
      } catch (e) {
        setSelectedActions(availableActions[user?.role] || []);
      }
    } else {
      const defaults = availableActions[user?.role] || [];
      setSelectedActions(defaults);
      localStorage.setItem(`fastActions_${user?.role}`, JSON.stringify(defaults));
    }
  }, [user?.role]);

  const handleActionClick = (actionType) => {
    switch (actionType) {
      case 'new_assignment':
        showModal(() => <CreateHybridAssignmentModal isOpen={true} onClose={hideModal} />);
        break;
      case 'add_exam':
        showModal(() => <CreatePhysicalExamModal isOpen={true} onClose={hideModal} />);
        break;
      case 'upload_grades':
        navigate('/teacher/grades');
        break;
      case 'absence_justification':
        showModal(() => <AbsenceJustificationModal isOpen={true} onClose={hideModal} />);
        break;
      case 'send_petition':
        showModal(() => <SendPetitionModal isOpen={true} onClose={hideModal} />);
        break;
      case 'view_assignments':
        navigate('/student/assignments');
        break;
      default:
        console.log(`Acción no reconocida: ${actionType}`);
    }
  };

  const toggleAction = (action) => {
    const isSelected = selectedActions.some(a => a.id === action.id);
    const newSelected = isSelected
      ? selectedActions.filter(a => a.id !== action.id)
      : [...selectedActions, action];
    setSelectedActions(newSelected);
    localStorage.setItem(`fastActions_${user?.role}`, JSON.stringify(newSelected));
  };

  const currentRoleActions = availableActions[user?.role] || [];

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Zap size={16} style={{ color: RED }} />
          <h3 className="text-sm font-semibold text-gray-900">Acciones rápidas</h3>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          title={isEditing ? 'Guardar cambios' : 'Personalizar acciones'}
        >
          {isEditing
            ? <Check size={16} className="text-green-600" />
            : <Settings size={16} className="text-gray-400" />
          }
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-1">
          {currentRoleActions.map((action) => (
            <div key={action.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{action.label}</span>
              <button
                onClick={() => toggleAction(action)}
                className="p-1 rounded-md transition-colors"
                style={
                  selectedActions.some(a => a.id === action.id)
                    ? { backgroundColor: RED, color: 'white' }
                    : { backgroundColor: '#f3f4f6', color: '#6b7280' }
                }
              >
                <Check size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {selectedActions.map((action) => (
            <button
              key={action.id}
              className="w-full text-left text-sm px-3 py-2 rounded-lg border font-medium transition-all"
              style={{ borderColor: RED, color: RED, backgroundColor: 'white' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = RED; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = RED; }}
              onClick={() => handleActionClick(action.action)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FastActions;
