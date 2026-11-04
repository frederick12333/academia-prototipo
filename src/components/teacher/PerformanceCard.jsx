import React from 'react';

const RED = '#C0392B';

const PerformanceCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">Rendimiento</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <div className="relative">
          <svg className="w-36 h-20" viewBox="0 0 100 50">
            {/* Fondo del semicírculo */}
            <path
              d="M 10 45 A 40 40 0 0 1 90 45"
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
            />
            {/* Progreso */}
            <path
              d="M 10 45 A 40 40 0 0 1 90 45"
              stroke={RED}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="125.6"
              strokeDashoffset="11.3"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center mt-3">
              <div className="text-2xl font-bold text-gray-900">9.1</div>
              <div className="text-xs text-gray-400">de 10 máx.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500">Semestre 2024 – 2025</div>
    </div>
  );
};

export default PerformanceCard;
