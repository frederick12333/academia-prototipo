import React from 'react';

/**
 * StatsCard — Tarjeta de estadística rápida.
 * Paleta institucional: fondo blanco, borde gris fino, acento rojo (#C0392B).
 * El prop `color` se ignora para mantener consistencia institucional.
 */
const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Línea superior de acento rojo */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ backgroundColor: '#C0392B' }} />
      <div className="flex justify-between items-start pt-1">
        <div>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-gray-200 absolute right-3 top-1/2">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
