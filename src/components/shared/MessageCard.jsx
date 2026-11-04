
import React from 'react';


export const MessageCard= ({ message, onReply }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES');
  };

  return (
    <div className={`w-full  bg-gray-200 border rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition-shadow
     ${!message.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {message.senderName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-800">
                  {message.senderName}
                </div>
                {message.courseName && (
                  <div className="text-sm text-gray-500">
                  {message.courseName} 
                  </div>
                )}
                  <div className="text-sm text-gray-500">
                  Para: {message.receiverName}
                  </div>
              </div>
             
            </div>
            <div className="flex  gap-4 items-center">
            {!message.isRead && (
          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            Nuevo
          </span>
        )}
          <div className="text-sm text-gray-500">
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
          </div>
          
          <div className="space-y-2">
            <div className="font-medium text-gray-800">
              {message.subject}
            </div>
            <div className="text-sm text-gray-600 line-clamp-2">
              {message.content}
            </div>
          </div>
          
          {message.type === 'incoming' && (
            <div className="flex justify-end">
              <button 
                onClick={() => onReply(message)}
                className="bg-gradient-to-br w-36 h-8 rounded-md from-[#10062B] to-[#4F0129] hover:opacity-90 text-white text-sm"
              >
                Responder
              </button>
              
            </div>
          )}
          
        </div>
        
      </div>
    </div>
  );
};