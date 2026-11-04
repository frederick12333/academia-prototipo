import React from 'react';
import { MoreHorizontal, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Table = ({ data, title, columns, isActions = true, user, actionChil=false }) => {
  const navigate = useNavigate();

  const titleLabels = {
    'Courses': 'Asignaturas',
    'Courses ': 'Asignaturas',
    'All Students': 'Todos los alumnos',
    'All Teachers': 'Todos los docentes',
    'Parents': 'Familiares',
    'Grades': 'Notas',
    'Recent Exams Performance': 'Rendimiento en exámenes recientes',
    'Classes Exams Performance': 'Rendimiento de exámenes por clase',
    'Free Time Schedule': 'Horario de tiempo libre',
  };
  const displayTitle = titleLabels[title] || title;

  const handleRowClick = (row,index) => {
  
     
    if (title === 'Courses') {
      navigate(`/student/courses/${index}`, { state: { cours: {
        name: row.Course,
        code: row.Code ,
        grade: row.Grade ,
       credits: row.Credits ,
       teacher :row.teacher.name,
      } } });
    }else  if (title === "All Students") {
      navigate(`/student/student-profile/${index}`, { state: { student: row.info.fullStudentData } });
    }else  if (title === "All Teachers") {
      navigate(`/teacher/teacher-profile/${index}`, { state: { teacher: row.info.fullTeacherData } });
    }
  };

  const handleMoreClick = (e, row,index) => {
    e.stopPropagation(); 
    if (title === 'Courses') {
      navigate(`/student/courses/${index}`, { state: { cours: {
        name: row.Course,
        code: row.Code ,
        grade: row.Grade ,
       credits: row.Credits ,
       teacher :row.teacher.name,
         } } });   
     }else  if (title === "All Students") {
          navigate(`/student/student-profile/${index}`, { state: { student: row.info.fullStudentData } });
        }
  };

  const renderCell = (cell) => {
    // Check if cell is an object with image and name properties
    if (typeof cell === 'object' && cell !== null && 'name' in cell) {
      const { avatar, name, description } = cell ;
      
      return (
        <div className="flex items-center justify-center space-x-3 hover:opacity-80">
          {avatar && (
            <div className="flex-shrink-0 hover:opacity-80">
              <img
                className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200"
                src={avatar}
                alt={name}
                onError={(e) => {
                  const target = e.target;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=32`;
                }}
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            {description && (
              <p className="text-xs text-gray-500 truncate">{description}</p>
            )}
          </div>
        </div>
      );
    }
    
    // Return cell as-is for non-object values
    return cell;
  };

  return (
    <div className="bg-white rounded-xl p-4 text-sm">
      <div className='flex justify-between mb-4 items-center'>
        <h3 className="text-lg font-semibold">{displayTitle}</h3>
        {user?.role === 'teacher' && !isActions &&
          <div className='bg-gradient-to-br from-[#10062B] to-[#4F0129] flex justify-center items-center h-9 w-9 rounded-full hover:opacity-90 cursor-pointer'>
            <Pencil size={19} color='white' />
          </div>  
        }
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th key={index} className="text-left py-3 px-4 font-medium text-gray-700">
                  {column}
                </th>
              ))}
              {isActions && <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                onClick={() => handleRowClick(row,index)}
                key={index} 
                className={`border-b border-gray-200 cursor-pointer hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                {Object.values(row).map((cell, cellIndex) => {
                   const column = columns[cellIndex];
                   
                   return (
                       <td key={cellIndex} className="py-2 pl-4 pr-2 text-gray-700">
                           {/* Check if a custom Cell renderer is provided in the column definition */}
                           {column && column.Cell && typeof column.Cell === 'function'
                               ? column.Cell({ row }) // Use the custom Cell renderer if available
                               : renderCell(cell) // Otherwise, use the default renderCell logic
                           }
                       </td>
                   );
                })}
                {isActions && !actionChil && 
                  <td className="py-2 px-8">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal 
                        onClick={(e) => handleMoreClick(e, row,index)}
                        size={16} 
                        className="text-gray-400 cursor-pointer hover:text-gray-600" 
                      />
                    </button>
                  </td>
                }
                {actionChil && 
                  <td className="py-2 px-8">
                    {actionChil}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;