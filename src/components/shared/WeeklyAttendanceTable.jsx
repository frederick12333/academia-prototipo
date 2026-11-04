import React, { useState, useEffect } from 'react';
import { format, eachDayOfInterval, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

export const WeeklyAttendanceTable = ({ attendanceData, startDate, endDate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableAttendanceData, setEditableAttendanceData] = useState(attendanceData);

  // Update editable data when attendanceData prop changes (e.g., due to filtering or view switch)
  useEffect(() => {
    setEditableAttendanceData(attendanceData);
  }, [attendanceData]);

  if (!startDate || !endDate || editableAttendanceData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        {startDate && endDate ? "No se encontraron alumnos para los filtros y el rango de fechas seleccionados." : "Selecciona un rango de fechas para ver la asistencia semanal."}
      </div>
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Generate array of dates for the table headers
  const datesInWeek = eachDayOfInterval({ start, end });

  // Handle status change for a student on a specific date
  const handleStatusChange = (studentId, date, isChecked) => {
    const newStatus = isChecked === 'attended' ? 'absent':'attended';
    setEditableAttendanceData(prevData => 
      prevData.map(student => 
        student.studentId === studentId ? 
        {
          ...student,
          attendanceByDate: {
            ...student.attendanceByDate,
            [date]: { // Update or add the attendance record for this date
              ...(student.attendanceByDate[date] || { studentId, date, status: 'N/A', justification: null, courseName: student.courseName, className: student.className, studentName: student.studentName, avatar: student.avatar }), // Keep existing data or create a minimal record
              status: newStatus,
               // Optional: Handle justification here if needed for weekly view
               justification: newStatus === 'absent' ? student.attendanceByDate[date]?.justification || null : null
            }
          }
        }
        : student
      )
    );
  };

  const handleSave = () => {
    console.log("Saving weekly attendance data:", editableAttendanceData);
    // Here you would call a prop function to save the data to your backend or state management
    // Example: onSave(editableAttendanceData);
    setEditMode(false); // Exit edit mode after saving
  };

  const handleCancel = () => {
    setEditableAttendanceData(attendanceData); // Revert changes
    setEditMode(false); // Exit edit mode
  };

  return (
    <>
      {/* Header with Edit/Save/Cancel */}
      <div className="flex justify-end gap-4 mb-4">
          {editMode ? (
              <>
                  <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                      Guardar cambios
                  </button>
                  <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                      Cancelar
                  </button>
              </>
          ) : (
              <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                  Editar asistencia
              </button>
          )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 rounded-lg sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 sticky left-0 bg-gray-100 z-10">Alumno</th>
              {datesInWeek.map(date => (
                <th key={format(date, 'yyyy-MM-dd')} className="px-3 py-3 text-center text-sm font-medium text-gray-600">
                  {format(date, 'dd MMM', { locale: es })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {editableAttendanceData.map((student) => (
              <tr key={student.studentId} className="border-t border-gray-200 hover:bg-blue-50">
                <td className="px-4 py-4 whitespace-nowrap sticky left-0 bg-white flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium text-xs">
                            {student.avatar ? (
                            <img
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.studentName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium text-xs">
                              {student.studentName
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "U"}
                            </div>
                          )}
                      </div>
                  <div>
                      <div className="font-medium text-gray-900 text-sm">{student.studentName}</div>
                       <div className="text-xs text-gray-500">ID: {student.studentId}</div>
                  </div>
                </td>
                {datesInWeek.map(date => {
                    const formattedDate = format(date, 'yyyy-MM-dd');
                    const attendanceRecord = student.attendanceByDate[formattedDate];
                    const status = attendanceRecord ? attendanceRecord.status : 'N/A'; // N/A for dates with no record

                    let statusIndicator = '-'; // Default for no record
                    let bgColor = '';

                    if (status === 'attended') {
                      statusIndicator = '✔';
                      bgColor = 'bg-green-500 text-white';
                    } else if (status === 'absent') {
                      statusIndicator = '✖';
                      bgColor = 'bg-red-500 text-white';
                    }

                    return (
                      <td key={formattedDate} className="px-3 py-4 text-center whitespace-nowrap">
                          {editMode ? (
                        //     <input
                        //     type="checkbox"
                        //     checked={status === 'attended'}
                        //     onChange={(e) => handleStatusChange(student.studentId, formattedDate, e.target.checked)}
                        //     className="form-checkbox h-4 w-4 text-blue-600"
                        // />
                            <div className="flex justify-center">
                              <button
                                onClick={() => handleStatusChange(student.studentId, formattedDate, status)}
                                className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                                  status === 'attended'
                                    ? "border border-[#e8e8e8] bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {status === 'attended' ? "✔": "✖"}
                              </button>
                            </div>
                        
                              
                          ) : (
                              <span className={`inline-flex items-center justify-center h-6 w-6 rounded text-xs font-medium ${bgColor}`}>
                                  {statusIndicator}
                              </span>
                          )}
                      </td>
                    );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WeeklyAttendanceTable; 