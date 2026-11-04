import React from 'react';
import { HelpCircle } from 'lucide-react';

const HelpTooltip = ({ content, position = 'top' }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block">
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
          aria-label="Información de ayuda"
      >
        <HelpCircle size={18} />
      </button>
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45" 
               style={{
                 [position]: '-4px',
                 left: position === 'left' || position === 'right' ? '50%' : 'auto',
                 top: position === 'top' || position === 'bottom' ? '50%' : 'auto',
                 transform: `translate(-50%, -50%) rotate(45deg)`
               }}
          />
        </div>
      )}
    </div>
  );
};

export default HelpTooltip; 