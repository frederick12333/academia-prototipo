import React from 'react';
import { useModal } from '../../contexts/ModalProvider';
import { SubmissionsModal } from './SubmissionsModal';
import { AssignmentDetailsModal } from './AssignmentDetailsModal';
import { submissions } from '../../data/assignmentsData';

export const AssignmentCard = ({
  assignment,
  onCheckDetails,
  onCheckSubmissions,
  onEdit
}) => {
  const { showModal ,hideModal} = useModal();

  return (
    <div className="card w-full border rounded-lg min-h-64 bg-white shadow-md hover:shadow-lg transition-shadow">
      <div className="card-content p-4">
        <div className="space-y-4">
          <div className="text-md font-medium text-gray-800">
            ID de la tarea: {assignment.assignmentId}
          </div>
          <div className="text-sm text-gray-600">
            Asignatura: {assignment.courseName}
          </div>
          <div className="text-sm text-gray-600">
            Título de la tarea: {assignment.title}
          </div>
          <div className="text-sm text-gray-600">
            Fecha límite: {assignment.deadline}  Hora: {assignment.time}
          </div>
          <div className="text-sm text-gray-600">
            Nota: {assignment.grade}
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => showModal(
                <AssignmentDetailsModal
                isOpen={true}
                onClose={() => hideModal()}
                assignment={assignment}
              />
              )}
              className="w-full text-sm h-10 rounded-lg bg-blue-600 hover:opacity-90 text-white"
            >
             Editar
            </button>
            <button 
              onClick={() => showModal( 
              <SubmissionsModal
                isOpen={true}
                onClose={() => hideModal()}
                submissions={submissions}
                assignment={assignment}
              />)}
              className="w-full h-10 text-sm rounded-lg bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 text-white"
            >
              Ver entregas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};