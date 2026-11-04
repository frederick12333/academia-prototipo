import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts/Layout';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { attendanceRecords, courses } from '../../data/mockData'; // Import mock data
import AttendanceDaily from './AttendanceDaily'; // Import the existing AttendanceDaily page
import WeeklyAttendanceTable from '../../components/shared/WeeklyAttendanceTable'; // Import the new weekly table component

// Assuming AttendanceDaily.jsx had these imports and state
import { format, startOfWeek, endOfWeek } from 'date-fns';


const Attendance = () => {

  // State for view selection (Day/Week)
  const [viewType, setViewType] = useState('week'); // 'day' or 'week'

  // State for Daily View (from previous AttendanceDaily.jsx logic)
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd'); // Format for input and filtering

  // State for Weekly View (new)
  const initialStartDate = format(startOfWeek(new Date()), 'yyyy-MM-dd');
  const initialEndDate = format(endOfWeek(new Date()), 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  // State for Filters and Search (from previous AttendanceDaily.jsx logic)
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // State for available classes based on selected course (from previous AttendanceDaily.jsx logic)
  const [availableClasses, setAvailableClasses] = useState([]);
  // Effect to update available classes when a course is selected (from previous AttendanceDaily.jsx logic)
  useEffect(() => {
    if (selectedCourse && selectedCourse !== 'All') {
      const course = courses.find(c => c.name === selectedCourse);
      if (course) {
        // Get unique classes for the selected course
        const courseClasses = [...new Set(course.classes)];
        setAvailableClasses(['All', ...courseClasses]);
      } else {
        setAvailableClasses(['All']); // Should not happen if course exists
      }
    } else {
      // If no course or "All" is selected, get all unique classes from all courses
      const allUniqueClasses = [...new Set(courses.flatMap(course => course.classes || []))];
      setAvailableClasses(['All', ...allUniqueClasses]);
    }
    setSelectedClass('All'); // Reset class selection when course changes
  }, [selectedCourse]);

  // Check if the current day (for daily view) is a weekend
  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // Sunday is 0, Saturday is 6
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // Load students for the Daily Attendance Table based on current filters and date
  const loadDailyStudents = () => {
      const filteredByDate = attendanceRecords.filter(record => record.date === formattedCurrentDate);

      const filteredByCourse = selectedCourse === 'All'
          ? filteredByDate
          : filteredByDate.filter(record => record.courseName === selectedCourse);

      const filteredByClass = selectedClass === 'All'
          ? filteredByCourse
          : filteredByCourse.filter(record => record.className === selectedClass);

      const filteredBySearch = searchTerm
          ? filteredByClass.filter(record =>
              record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              String(record.studentId).includes(searchTerm)
            )
          : filteredByClass;

      // Deduplicate students, keeping one record per student for the date
      const uniqueStudentsMap = new Map();
      filteredBySearch.forEach(record => {
           // Prioritize 'attended' if multiple records exist for a student on the same day (shouldn't happen with current mock structure but good for robustness)
          if (!uniqueStudentsMap.has(record.studentId) || record.status === 'attended') {
             uniqueStudentsMap.set(record.studentId, record);
          }
      });

      const uniqueStudents = Array.from(uniqueStudentsMap.values());


      // Sort students by name A-Z
      const sortedStudents = uniqueStudents.sort((a, b) => a.studentName.localeCompare(b.studentName));

      return sortedStudents;
  };

   // Load students for the Weekly Attendance Table based on current filters and date range
   const loadWeeklyStudents = () => {
       if (!startDate || !endDate) return [];

       const start = new Date(startDate);
       const end = new Date(endDate);

       const weeklyData = {}; // Use an object to group by studentId

       // Iterate through the nested attendanceRecords structure
       attendanceRecords.forEach(dateRecord => {
           // Check if the record date is within the selected range
           const recordDate = new Date(dateRecord.date);
           if (recordDate >= start && recordDate <= end) {

               // Filter by selected course if not "All"
               const filteredByCourse = selectedCourse === 'All'
                   ? [dateRecord] // If All, include the current dateRecord for further class filtering
                   : (dateRecord.courseName === selectedCourse ? [dateRecord] : []);

               filteredByCourse.forEach(courseRecord => {
                   courseRecord.classes.forEach(classRecord => {
                       // Filter by selected class if not "All"
                       if (selectedClass === 'All' || classRecord.className === selectedClass) {
                           classRecord.students.forEach(studentAttendance => {
                               // Apply search term filter
                               const lowerCaseSearchTerm = searchTerm.toLowerCase();
                               const matchesSearch = searchTerm
                                   ? studentAttendance.studentName.toLowerCase().includes(lowerCaseSearchTerm) ||
                                     String(studentAttendance.studentId).includes(searchTerm) // Assuming studentId is a number or string
                                   : true; // If no search term, include all

                               if (matchesSearch) {
                                   // If student not yet in weeklyData, add their basic info
                                   if (!weeklyData[studentAttendance.studentId]) {
                                       weeklyData[studentAttendance.studentId] = {
                                           studentId: studentAttendance.studentId,
                                           studentName: studentAttendance.studentName,
                                           avatar: studentAttendance.avatar,
                                           // Store course and class name for display/context
                                           courseName: courseRecord.courseName,
                                           className: classRecord.className,
                                           attendanceByDate: {}
                                       };
                                   }
                                   // Add the attendance record for this date
                                   weeklyData[studentAttendance.studentId].attendanceByDate[dateRecord.date] = studentAttendance;
                               }
                           });
                       }
                   });
               });
           }
       });

       const studentsForWeeklyView = Object.values(weeklyData);

        // Sort students by name A-Z
        const sortedStudents = studentsForWeeklyView.sort((a, b) => a.studentName.localeCompare(b.studentName));


       return sortedStudents;
   };







  return (
    <Layout currentPage={'Attendance'}>
      <div className="max-h-screen bg-white max-w-6xl  overflow-x-auto px-6 py-2">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Asistencia</h1> {/* Changed title slightly */}
       
         {/* View Type Selection (Day/Week) */}
         <div className="flex gap-4 mb-6">
        
           <button
                className={`px-4 py-1 rounded ${viewType === 'day' ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setViewType('day')}
            >
                Vista diaria
              </button>
            <button
                className={`px-4 py-1 rounded ${viewType === 'week' ? 'bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setViewType('week')}
            >
                Vista semanal
              </button>
            </div>
          </div>

        {/* Attendance Table Container */}
        <div className="bg-white rounded-lg">
           {viewType === 'day' ? (
               isWeekend(formattedCurrentDate) ? (
                   <div className="p-6 text-center text-xl text-gray-600">¡Es fin de semana! No hay datos de asistencia para {formattedCurrentDate}.</div>
               ) : (
                   <AttendanceDaily 
                       attendanceData={loadDailyStudents()} 
                       selectedDate={formattedCurrentDate}
                       searchTerm={searchTerm}
                       selectedCourse={selectedCourse}
                       selectedClass={selectedClass}
                   />
               )
           ) : (
            <>
            
             {/* Filters and Date Selection */}
        <div className="bg-white rounded-lg p-2 ">
            <div className="flex flex-wrap items-center gap-4 ">
                 {/* Search Input */}
                <div className="flex-grow max-w-xs">
                    <label htmlFor="search" className="sr-only">Buscar alumnos</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                        placeholder="Buscar por nombre o ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Course Filter */}
                <div className="flex-grow max-w-xs">
                   <label htmlFor="courseFilter" className="sr-only">Filtrar por asignatura</label>
                   <select
                      id="courseFilter"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                   >
                      <option value="All">Todas las asignaturas</option>
                      {courses.map(course => (
                          <option key={course.id} value={course.name}>{course.name}</option>
                      ))}
                   </select>
          </div>

                {/* Class Filter */}
                 <div className="flex-grow max-w-xs">
                    <label htmlFor="classFilter" className="sr-only">Filtrar por clase</label>
                    <select
                      id="classFilter"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                    >
                       <option value="All">Todas las clases</option>
                       {availableClasses.map((className) => (
                          <option key={className} value={className}>
                            {className}
                          </option>
                        ))}
                    </select>
                 </div>

                 {/* Date Selection based on View Type */}
                 {viewType === 'day' ? (
                      <div className="flex-grow max-w-xs">
                           <label htmlFor="dailyDate" className="sr-only">Seleccionar fecha</label>
                           <input
                               type="date"
                               id="dailyDate"
                               value={formattedCurrentDate}
                               onChange={(e) => setCurrentDate(new Date(e.target.value))}
                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                           />
                      </div>
                 ) : (
                      <div className="flex items-center gap-4 flex-grow max-w-sm">
                           <div>
                               <label htmlFor="startDate" className="sr-only">Desde</label>
                               <input
                                   type="date"
                                   id="startDate"
                                   value={startDate}
                                   onChange={(e) => setStartDate(e.target.value)}
                                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                               />
                           </div>
                           <span>a</span>
                           <div>
                                <label htmlFor="endDate" className="sr-only">Hasta</label>
                                <input
                                   type="date"
                                   id="endDate"
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                                />
                           </div>
                      </div>
                 )}

          </div>
        </div>
               <WeeklyAttendanceTable attendanceData={loadWeeklyStudents()} startDate={startDate} endDate={endDate} />
            </>
           )}
        </div>

      </div>
      
     

    </Layout>
  )
}

export default Attendance;

// Keeping ClassTab component that was made by waleed here for now, but review its usage later
const ClassTab = ({ label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 font-medium rounded-[5px] transition-all duration-200 ${
      active
        ? "bg-[#10062B] text-white"
        : "text-[#565656] hover:text-white hover:bg-[#4F0129]"
    }`}
  >
    {label}
  </button>
)