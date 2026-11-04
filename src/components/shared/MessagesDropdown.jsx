import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleMore, Search, Paperclip, Send } from 'lucide-react';

const MessagesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const dropdownRef = useRef(null);

  // Example messages - replace with actual data from your backend
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      avatar: '/default-avatar.png',
      message: '¿Puedes ayudarme con la tarea de matemáticas?',
      time: 'Hace 5 minutos',
      unread: true
    },
    {
      id: 2,
      sender: 'Jane Smith',
      avatar: '/default-avatar.png',
      message: 'Se ha actualizado el horario de clases',
      time: 'Hace 1 hora',
      unread: false
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      avatar: '/default-avatar.png',
      message: 'No olvides la reunión del proyecto grupal',
      time: 'Hace 2 horas',
      unread: false
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = messages.filter(m => m.unread).length;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add new message to the list
      setMessages([
        {
          id: Date.now(),
          sender: 'Tú',
          avatar: '/default-avatar.png',
          message: newMessage,
          time: 'Ahora mismo',
          unread: false
        },
        ...messages
      ]);
      setNewMessage('');
    }
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-8 cursor-pointer transition-colors bg-gradient-to-br from-[#10062B] to-[#4F0129] rounded-full flex items-center justify-center"
      >
        <MessageCircleMore color='white' size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Mensajes</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar mensajes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`px-4 py-3 hover:bg-gray-50 ${
                    message.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {message.sender}
                        </p>
                        <p className="text-xs text-gray-400">
                          {message.time}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-gray-500">
No se encontraron mensajes
              </div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 px-3 py-2 text-sm bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Adjuntar archivo"
              >
                <Paperclip size={18} />
              </button>
              <button
                type="submit"
                className="p-2 text-blue-600 hover:text-blue-700"
                title="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesDropdown; 