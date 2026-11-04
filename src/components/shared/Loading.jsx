import React from 'react';

const Loading = ({ size = 'small', color = '#fff' }) => {
  return (
    <div className="flex items-center justify-center w-full py-1">
      <div
        className="w-5 h-5 border-2 rounded-full animate-spin"
        style={{
          borderColor: color || '#fff',
          borderTopColor: 'transparent'
        }}
      />
    </div>
  );
};

export default Loading;
