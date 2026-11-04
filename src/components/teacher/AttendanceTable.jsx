import { useState } from "react"
import { attendanceRecords } from "../../data/mockData"

export const AttendanceTable = ({ onClose, selectedDate, searchTerm,isCreating, selectedCourse, selectedClass }) => {
  const [editMode, setEditMode] = useState(false)
  // Use state to hold a copy of the attendance records for editing
  const [editableRecords, setEditableRecords] = useState(structuredClone(attendanceRecords));

  // Get attendance records for the selected date from the editable state
  const dateRecords = editableRecords.filter(record => record.date === selectedDate);

  // Get students based on selected course and class from the dateRecords
  const getFilteredStudents = () => {
    let students = [];

    // Filter dateRecords by selectedCourse
    const recordsFilteredByCourse = selectedCourse === "All" 
      ? dateRecords 
      : dateRecords.filter(record => record.courseName === selectedCourse);
    
    recordsFilteredByCourse.forEach(courseRecord => {
      courseRecord.classes.forEach(classRecord => {
        // Filter by selectedClass
        if (selectedClass === "All" || classRecord.className === selectedClass) {
          // Map students to include className and courseName directly for easier access
          students = [...students, ...classRecord.students.map(student => ({
            ...student,
            className: classRecord.className,
            courseName: courseRecord.courseName // Add courseName here
          }))];
        }
      });
    });

    // Apply search term filter
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return students.filter(student => 
      student.studentName.toLowerCase().includes(lowerCaseSearchTerm) ||
      student.studentId.toLowerCase().includes(lowerCaseSearchTerm) // Assuming student.studentId exists
    );
  };

  const filteredStudents = getFilteredStudents();

  // Handle status change for a student
  const handleStatusChange = (studentId, isChecked) => {
    const newStatus = isChecked ? 'attended' : 'absent';
    
    const updatedRecords = editableRecords.map(dateRec => {
      if(dateRec.date === selectedDate) {
        return {
          ...dateRec,
          classes: dateRec.classes.map(classRec => {
            return {
              ...classRec,
              students: classRec.students.map(student => {
                if (student.studentId === studentId) {
                  // Found the student, update their status and justification
                  return { 
                    ...student, 
                    status: newStatus, 
                    justification: newStatus === 'absent' ? student.justification : null // Clear justification if attended
                  };
                }
                return student;
              })
            };
          })
        };
      }
      return dateRec;
    });
    setEditableRecords(updatedRecords);
    console.log(`Updating status for student ${studentId} to ${newStatus}`);
  };

  // Handle justification file selection (placeholder)
  const handleJustificationUpload = (studentId, file) => {
     const updatedRecords = editableRecords.map(dateRec => {
      if(dateRec.date === selectedDate) {
        return {
          ...dateRec,
          classes: dateRec.classes.map(classRec => {
            return {
              ...classRec,
              students: classRec.students.map(student => {
                if (student.studentId === studentId) {
                   // In a real app, you'd upload the file and get a URL/name to save
                   // For mock data, we can just save the file name or a placeholder
                  console.log(`Uploading file for student ${studentId}:`, file.name);
                  return { ...student, justification: file.name }; // Save file name as justification
                }
                return student;
              })
            };
          })
        };
      }
      return dateRec;
    });
    setEditableRecords(updatedRecords);
    console.log(`Uploading justification file for student ${studentId}:`, file);
  };

  // Find a student in editableRecords to get their current state for display
  const findStudentInEditableRecords = (studentId) => {
    // Search within the dateRecords (already filtered by date)
    for (const dateRec of dateRecords) {
      for (const classRec of dateRec.classes) {
        const student = classRec.students.find(s => s.studentId === studentId);
        if (student) return student;
      }
    }
    return null; // Should not happen if studentId is valid within filteredStudents
  };
      
  return (
    <>
        {/* Header */}
     <div className="flex   justify-between   items-center  sticky top-0 bg-white z-10">
         {/* Filters */}
         <div className="w-2/3 flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Total: {filteredStudents.length} alumno{filteredStudents.length !== 1 ? "s" : ""}
          </span>
        </div>
        {editMode ? (
          <>
        
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-1/6 bg-green-500 hover:opacity-90 rounded-lg text-white py-2"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="w-1/12  bg-red-500 hover:opacity-90 rounded-lg text-white py-2"
            >
              Cancelar
            </button>
            
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className="w-1/6 bg-blue-500 hover:opacity-90 rounded-lg text-white py-2"
            >
              Editar 
            </button>
            <button
              type="button"
              className="w-1/12 bg-gradient-to-br from-[#10062B] to-[#4F0129] hover:opacity-90 rounded-lg text-white py-2"
            >
              Exportar
            </button>
        
          </>
        )}
        </div>
      <div className="border rounded-lg max-w-full max-h-[80vh] mt-2 overflow-y-auto">
       

       

        {/* Table */}
        <div className="max-h-[60vh] text-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 rounded-lg sticky top-0 z-5">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Alumno</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Asignatura</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Clase</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Justificante</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  // Find the current state of the student from editableRecords based on the filtered student's ID
                  const currentStudentState = findStudentInEditableRecords(student.studentId);
                  // Use the state for display if available, otherwise use the initial student data (should always be available now)
                  const displayStatus = currentStudentState?.status !== undefined ? currentStudentState.status : student.status;
                  const displayJustification = currentStudentState?.justification !== undefined ? currentStudentState.justification : student.justification;

                  return (
                    <tr
                      key={student.studentId}
                      // Apply row background color based on the *current* displayed status
                    className={
                        displayStatus === 'absent'
                          ? "bg-red-50 hover:bg-blue-100 border"
                          : "bg-white hover:bg-blue-100"
                          // Removed: index based alternating row color, as filtering can change indices
                    }
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
                          {student.avatar ? (
                          <img
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-medium">
                            {student.studentName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "U"}
                          </div>
                        )}
                          </div>
                        <div>
                            <div className="font-medium text-gray-900">{student.studentName}</div>
                            <div className="text-xs text-gray-500">ID: {student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      {/* Course Data */}
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {student.courseName}
                      </td>
                      {/* Class Data */}
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {student.className}
                    </td>
                      {/* Status Checkbox/Display */}
                    <td className="px-6 py-4">
                        {editMode ? (
                        <input
                          type="checkbox"
                            checked={displayStatus === 'attended'}
                            onChange={(e) => handleStatusChange(student.studentId, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      ) : (
                          <span className={displayStatus === 'attended' ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                            {displayStatus === 'attended' ? "Presente" : "Ausente"}
                        </span>
                      )}
                    </td>
                      {/* Justification Input/Display */}
                    <td className="px-6 py-4">
                        {editMode && displayStatus === 'absent' ? (
                          <input
                            type="file"
                            onChange={(e) => handleJustificationUpload(student.studentId, e.target.files[0])}
                            className="text-gray-700 text-sm"
                          />
                        ) : displayStatus === 'absent' && displayJustification ? (
                          <a
                            href={`/justifications/${displayJustification}`}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver justificante
                          </a>
                        ) : displayStatus === 'absent' && !displayJustification ? (
                           <span className="text-gray-500">Sin justificante</span>
                        ) : (
                          <span className="text-gray-500">----</span>
  )}
</td>         
         </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron alumnos para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

     
    </>
  )
}

export default AttendanceTable
