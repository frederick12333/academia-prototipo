import React from 'react';
import { Pencil } from 'lucide-react';


const AnnouncementCard = ({
  title,
  content,
  fileName,
  fileSize,
  dateAdded,
  lastUpdate,
  isUpdated,
  userAuth,
  course
}) => {
  return (
    <div className=" bg-white border rounded-xl shadow-lg p-4 border-l-4 border-red-900">
   
      <div className="flex items-start justify-between ">
    
        <div className="flex items-center gap-2">
          <span className="text-2xl mr-3">📢</span>
          <h3 className="text-md font-bold text-gray-800">{title}</h3>
          {isUpdated && (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            Actualizado
          </span>
        )}
        </div>
        
         {userAuth?.role==='teacher'&&
    <div className=' flex  justify-end items-end mb-2'>
       <div className='bg-gradient-to-br from-[#10062B] to-[#4F0129] flex justify-center items-center h-9 w-9 rounded-full hover:opacity-90 cursor-pointer' >
      <Pencil size={19} color='white' />
      </div>
      </div>}
      </div>
      
      {/* Show course info if available */}
      {course && (
        <div className="mb-2 ml-8">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {course.code}
          </span>
          <span className="text-xs text-gray-700 font-medium">{course.name}</span>
        </div>
      )}
      
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{content}</p>
      
      {fileName && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center">
          <div className="bg-red-100 p-2 rounded-lg mr-3">
            <span className="text-red-600">📄</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-md text-gray-800">{fileName}</p>
            <p className="text-sm text-gray-500">{fileSize}</p>
          </div>
          <button className="text-purple-600 hover:text-purple-800 font-medium">
             Descargar
          </button>
        </div>
      )}
      
      <div className="flex justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <span>Fecha de publicación: {dateAdded}</span>
        <span>Fecha de la última actualización: {lastUpdate}</span>
      </div>
    </div>
  );
};

export default AnnouncementCard;