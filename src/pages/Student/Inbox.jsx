import Layout from '../../components/layouts/Layout';
import React, { useState } from 'react';
import { MessageCard } from '../../components/shared/MessageCard';
import { SendMessageModal } from '../../components/shared/SendMessageModal';
import { mockMessages,mockMessagesStudent } from '../../data/MessagesData';
import { Search } from 'lucide-react';
import { useModal } from '../../contexts/ModalProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const Inbox = () => {
  const { showNotification } = useNotification();

  const { showModal, hideModal } = useModal();
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('incoming');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter messages to only show those where the current user is either sender or recipient
  const filteredMessages = (authUser.role==='teacher'?mockMessages:mockMessagesStudent).filter(message => {

  

    const matchesTab = activeTab === 'new' ? true : message.type === activeTab;
    
    const matchesSearch = searchQuery === '' || 
      message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (message.courseName && message.courseName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  const handleReply = (message) => {
    
    const ReplyTo = message;
    showModal(
      <SendMessageModal
        isOpen={true}
        onClose={hideModal}
        replyTo={ReplyTo}
        recipientType="teacher" // Specify that we're sending to a teacher
      />
    );
  };

  const handleNewMessage = () => {
    showModal(
      <SendMessageModal
        isOpen={true}
        onClose={hideModal}
        recipientType="teacher" // Specify that we're sending to a teacher
      />
    );
  };

  const getTabButtonClass = (tab) => {
    const baseClass = "px-6 py-2 rounded-lg font-medium transition-colors";
    if (activeTab === tab) {
      return `${baseClass} bg-gradient-to-br from-[#10062B] to-[#4F0129] text-white`;
    }
    return tab === 'new' 
    ? `${baseClass} bg-green-600 text-white`
    : `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  };

  return (
    <Layout currentPage={'Inbox'}>
      <div className="min-h-screen w-full bg-gray-50 p-6 text-sm">
        <div className="max-w-6xl mx-auto">        
          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-4 mb-6 sticky">
            {/* Search and Filters */}
            <div className="flex-1">
              <div className="relative w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" size={20} />
                <input
                  type="text"
                  placeholder="Buscar mensajes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          
            <button 
              onClick={() => setActiveTab('incoming')}
              className={getTabButtonClass('incoming')}
            >
              Mensajes de docentes
            </button>
            <button 
              onClick={() => setActiveTab('outgoing')}
              className={getTabButtonClass('outgoing')}
            >
              Mensajes a docentes
            </button>
            <button 
              onClick={handleNewMessage}
              className={getTabButtonClass('new')}
            >
              Nuevo mensaje
            </button>
          </div>

          {/* Messages List */}
          {activeTab !== 'new' && (
            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No se encontraron mensajes</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <MessageCard 
                    key={message.id} 
                    message={message}
                    onReply={handleReply}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Inbox;
