import React from 'react';

const AnnouncementsSideList = () => {
  const announcements = [
    {
      type: 'Matemáticas',
      topic: 'Próximo cuestionario de álgebra',
      content: 'Estimados alumnos: repasad las fórmulas del capítulo 5 antes de nuestra próxima clase. El próximo cuestionario abarcará expresiones algebraicas y resolución de problemas.',
      action: 'Detalles'
    },
    {
      type: 'Física',
      topic: 'Preparación del laboratorio de movimiento',
      content: '',
      action: 'Detalles'
    },
    {
      type: 'Física',
      topic: 'Preparación del laboratorio de movimiento',
      content: '',
      action: 'Detalles'
    },
    {
      type: 'Historia',
      topic: 'Revisión de fuentes primarias',
      content: '',
      action: 'Detalles'
    },
  ];

  return (
    <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">Anuncios</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="4" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
        {announcements.map((announcement, index) => (
          <div key={index} className="flex">
            <div className="w-1 flex-shrink-0 rounded-l-lg" style={{ backgroundColor: '#C0392B' }} />
            <div className="bg-gray-50 border border-gray-100 rounded-r-lg p-3 text-gray-900 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#C0392B' }}>Anuncio</span>
                  <div className="font-medium text-sm text-gray-800 truncate">{announcement.type}</div>
                  <div className="text-xs text-gray-500 truncate">Tema: {announcement.topic}</div>
                </div>
                <button
                  className="text-xs font-semibold px-2 py-1 rounded border flex-shrink-0 transition-colors"
                  style={{ borderColor: '#C0392B', color: '#C0392B', backgroundColor: 'white' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C0392B'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#C0392B'; }}
                >
                  {announcement.action}
                </button>
              </div>
              {announcement.content && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{announcement.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center">
        <button
          className="text-sm font-semibold px-6 py-2 rounded-lg border transition-colors"
          style={{ borderColor: '#C0392B', color: '#C0392B', backgroundColor: 'white' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#C0392B'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#C0392B'; }}
        >
          Ver todos los anuncios
        </button>
      </div>
    </div>
  );
};

export default AnnouncementsSideList;
