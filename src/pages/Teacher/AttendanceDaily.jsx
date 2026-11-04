import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'
import { courses, attendanceRecords } from '../../data/mockData';
import { Search, Plus, Filter } from 'lucide-react';
import { AttendanceTable } from '../../components/teacher/AttendanceTable';
import { useModal } from '../../contexts/ModalProvider';
import { CreateNewAttendanceList } from '../../components/teacher/CreateNewAttendanceList';

const AttendanceDaily = () => {
    const { showModal, hideModal } = useModal();

  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 22))
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState("All") // State for course filter
  const [selectedClass, setSelectedClass] = useState("All") // State for class filter

  const formatDate = (date) => date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    // Limit navigation to the range of dates available in mockData
    if (newDate >= new Date(2025, 4, 11)) setCurrentDate(newDate)
  }

  const goToNextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    // Limit navigation to the range of dates available in mockData
    if (newDate <= new Date(2025, 6, 31)) setCurrentDate(newDate)
  }

  const formattedCurrentDate = currentDate.toISOString().split('T')[0];

  // Check if the current date is a weekend (Saturday or Sunday)
  const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

  // Filter attendance records for the selected date
  const dateRecords = attendanceRecords.filter(record => record.date === formattedCurrentDate);

  // Get unique courses from the date records
  const availableCourses = ["All", ...new Set(dateRecords.map(record => record.courseName))];

  // Get the selected course record(s) for class filtering
  const selectedCourseRecords = selectedCourse === "All" 
    ? dateRecords 
    : dateRecords.filter(record => record.courseName === selectedCourse);

  // Get unique classes from the selected course record(s)
  const availableClasses = ["All", ...new Set(
    selectedCourseRecords.flatMap(record => 
      (record?.classes || []).map(cls => cls?.className)
    )
  )];

  // Handler function for saving a new attendance list (placeholder)
  const handleSaveNewAttendance = (newAttendanceData) => {
    console.log("New Attendance Data to Save:", newAttendanceData);
    // Here you would typically send this data to your backend or update mockData
    hideModal(); // Close the modal after saving/processing
  };

  const openCreateModal = () => showModal( 
 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
 <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">    
     {/* Use the new CreateNewAttendanceList component */}
       <CreateNewAttendanceList
         selectedDate={formattedCurrentDate}
         selectedCourse={selectedCourse}
         selectedClass={selectedClass}
         onSave={handleSaveNewAttendance} // Pass the save handler
         onCancel={hideModal} // Pass the cancel handler
       />
       </div>
       </div>
    );

  return (
      <div className="min-h-screen bg-white w-full py-6">
        {/* Create Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
          >
            <Plus size={20} />
            Crear nueva lista de asistencia
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={20} />
            <input
              type="text"
              placeholder="Buscar alumnos por nombre o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course Filter */}
          <div className='flex gap-2 items-center '>
            <label htmlFor="courseFilter" className="font-medium text-gray-700">Asignatura:</label>
            <select
              id="courseFilter"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedClass("All"); // Reset class when course changes
              }}
              className="h-10 min-w-36 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Class Filter */}
          <div className='flex gap-2 items-center '>
            <label htmlFor="classFilter" className="font-medium text-gray-700">Clase:</label>
            <select
              id="classFilter"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 border min-w-36 border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousDay}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              &#8592; Día anterior
            </button>
            <span className="text-lg font-semibold text-black min-w-[150px] text-center">
              {formatDate(currentDate)}
            </span>
            <button
              onClick={goToNextDay}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Día siguiente &#8594;
            </button>
          </div>
        </div>

        {/* Attendance Content - Conditional Rendering */}
        {isWeekend ? (
          <div className="text-center text-xl font-semibold text-gray-600 py-10">
            Es fin de semana. No hay datos de asistencia disponibles.
          </div>
        ) : (
          // Attendance Table (only shown on weekdays)
          <div className="border rounded-lg overflow-hidden p-6">
            <AttendanceTable
              selectedDate={formattedCurrentDate}
              searchTerm={searchTerm}
              selectedCourse={selectedCourse}
              selectedClass={selectedClass}
              onClose={() => {}} // onClose is not strictly needed here but keeping it as it's a prop
            />
          </div>
        )}
      </div>
  )
}

export default AttendanceDaily