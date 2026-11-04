import React, { useState, useEffect } from 'react';
import { courses, users } from '../../data/mockData'; // Assuming users are needed for full student info
import { useSaveNotification } from '../../contexts/SaveNotificationContext';

export const CreateNewAttendanceList = ({ onSave, onCancel }) => {
  const { showSaveNotification, hideSaveNotification } = useSaveNotification();
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection' or 'attendance'
  const [selectedModalCourse, setSelectedModalCourse] = useState('');
  const [selectedModalClass, setSelectedModalClass] = useState('');
  const [selectedModalDate, setSelectedModalDate] = useState('');
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [initialStudentsAttendance, setInitialStudentsAttendance] = useState([]); // To track initial state for changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [availableModalClasses, setAvailableModalClasses] = useState([]);

  useEffect(() => {
    // This effect runs whenever studentsAttendance changes.
    // We need to compare it to the initial state to determine if there are unsaved changes.
    if (currentStep === 'attendance') {
      const changesMade = JSON.stringify(studentsAttendance) !== JSON.stringify(initialStudentsAttendance);
      setHasUnsavedChanges(changesMade);
    }
  }, [studentsAttendance, initialStudentsAttendance, currentStep]);

  
  useEffect(() => {
    let timeoutId;
    let intervalId;


    if (currentStep === 'attendance' && hasUnsavedChanges) {
      // Initial delay of 10 seconds before the first notification
      timeoutId = setTimeout(() => {
        showSaveNotification();
        // Then show every 10 seconds
        intervalId = setInterval(() => {
          showSaveNotification();
        }, 10000); // 10 seconds
      }, 10000); // Initial 10 seconds delay
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentStep, hasUnsavedChanges, showSaveNotification, hideSaveNotification]);

  // Effect to update available classes when a course is selected in the modal
  useEffect(() => {
    if (selectedModalCourse && selectedModalCourse !== 'All') {
      const course = courses.find(c => c.name === selectedModalCourse);
      if (course) {
        setAvailableModalClasses(['All', ...course.classes]);
      } else {
        setAvailableModalClasses(['All']);
      }
    } else {
      // If no course or "All" is selected, get all unique classes from all courses
      const allUniqueClasses = [...new Set(courses.flatMap(course => course.classes))];
      setAvailableModalClasses(['All', ...allUniqueClasses]);
    }
    setSelectedModalClass('All'); // Reset class selection when course changes
  }, [selectedModalCourse]);

  // Function to load students based on selected criteria
  const loadStudents = () => {
    // Basic validation
    if (!selectedModalCourse || !selectedModalClass || !selectedModalDate) {
      alert('Selecciona asignatura, clase y fecha.');
      return;
    }

    const studentsToInclude = courses.flatMap(course => 
      course.classes.flatMap(classInfo => 
        (classInfo === selectedModalClass || selectedModalClass === "All") ? 
          course.students.map(student => ({
            studentId: student.id,
            studentName: student.name,
            avatar: student.avatar,
            status: 'absent', // Default to absent
            justification: null,
            date: selectedModalDate,
            className: classInfo, // Use classInfo directly as it's the class name string
            courseName: course.name
          })) : []
      )
    );

    // Filter by selected course if not "All"
    const filteredByCourse = selectedModalCourse === "All" ? studentsToInclude : studentsToInclude.filter(student => student.courseName === selectedModalCourse);

     // Basic deduplication
    const uniqueStudents = Array.from(new Map(filteredByCourse.map(item => [item['studentId'], item])).values());

    // Sort students by name A-Z
    const sortedStudents = uniqueStudents.sort((a, b) => a.studentName.localeCompare(b.studentName));

    setStudentsAttendance(sortedStudents);
    setInitialStudentsAttendance(sortedStudents); // Set initial state for comparison
    setCurrentStep('attendance'); // Move to attendance taking step
  };

  // Handle status change for a student (checkbox toggle)
  const handleStatusChange = (studentId, isChecked) => {
    const newStatus = isChecked ? 'attended' : 'absent';
    setStudentsAttendance(prevStudents => 
      prevStudents.map(student => 
        student.studentId === studentId ? { ...student, status: newStatus, justification: newStatus === 'absent' ? student.justification : null } : student
      )
    );
  };

  // Handle justification file selection (placeholder)
  const handleJustificationUpload = (studentId, file) => {
    console.log(`Uploading file for student ${studentId}:`, file.name);
     setStudentsAttendance(prevStudents => 
      prevStudents.map(student => 
        student.studentId === studentId ? { ...student, justification: file.name } : student
      )
    );
  };

  const handleSave = () => {
    console.log("Saving new attendance record:", studentsAttendance);
    setHasUnsavedChanges(false);
    hideSaveNotification();
    // Call the onSave prop with the collected attendance data
    onSave(studentsAttendance);
  };

  const handleCancel = () => {
    setHasUnsavedChanges(false);
    hideSaveNotification();
    // Call the onCancel prop to close the modal without saving
    onCancel();
  };

  // Render selection stage
  if (currentStep === 'selection') {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Selecciona los criterios para la nueva lista de asistencia</h3>
        <div className="flex flex-col gap-4">
          {/* Course Select */}
          <div>
            <label htmlFor="modalCourseSelect" className="block text-sm font-medium text-gray-700">Asignatura</label>
            <select
              id="modalCourseSelect"
              value={selectedModalCourse}
              onChange={(e) => setSelectedModalCourse(e.target.value)}
              className="mt-1 block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">-- Selecciona una asignatura --</option>
              <option value="All">Todas las asignaturas</option>
              {courses.map(course => (
                <option key={course.id} value={course.name}>{course.name}</option>
              ))}
            </select>
          </div>

          {/* Class Select */}
          <div>
            <label htmlFor="modalClassSelect" className="block text-sm font-medium text-gray-700">Clase</label>
            <select
              id="modalClassSelect"
              value={selectedModalClass}
              onChange={(e) => setSelectedModalClass(e.target.value)}
              className="mt-1 border block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
               <option value="">-- Selecciona una clase --</option>
               {availableModalClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Date Select */}
          <div>
            <label htmlFor="modalDateSelect" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="date"
              id="modalDateSelect"
              value={selectedModalDate}
              onChange={(e) => setSelectedModalDate(e.target.value)}
              className="mt-1 block w-full border pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            />
          </div>
        </div>
         {/* Action Buttons */}
         <div className="flex justify-end gap-4 mt-6">
           <button
             type="button"
             onClick={loadStudents}
             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
           >
             Cargar alumnos
           </button>
           <button
             type="button"
             onClick={onCancel}
             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
           >
             Cancelar
           </button>
         </div>
      </div>
    );
  }

  // Render attendance taking stage
  return (
    <>
      {/* Table */}
      <div className="max-h-[60vh] text-sm overflow-y-auto">
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
            {studentsAttendance.length > 0 ? (
              studentsAttendance.map((student) => (
                <tr
                  key={student.studentId}
                  className={
                    student.status === 'absent'
                      ? "bg-red-50 hover:bg-blue-100 border"
                      : "bg-white hover:bg-blue-100"
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
                      <input
                        type="checkbox"
                        checked={student.status === 'attended'}
                        onChange={(e) => handleStatusChange(student.studentId, e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                  </td>
                  {/* Justification Input/Display */}
                  <td className="px-6 py-4">
                      {student.status === 'absent' ? (
                        <input
                          type="file"
                          onChange={(e) => handleJustificationUpload(student.studentId, e.target.files[0])}
                          className="text-gray-700 text-sm"
                        />
                      ) : (
                        <span className="text-gray-500">----</span>
                      )}
                  </td>
                </tr>
              ))
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
       {/* Action Buttons */}
       <div className="flex justify-end gap-4 mt-4">
         <button
           type="button"
           onClick={handleSave}
           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
         >
           Crear lista de asistencia
         </button>
         <button
           type="button"
           onClick={handleCancel}
           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
         >
           Cancelar
         </button>
       </div>
    </>
  );
};

export default CreateNewAttendanceList;
