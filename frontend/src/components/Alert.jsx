import React from 'react';

export default function Alert({ type = 'info', message, onClose }) {
  const colors = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300'
  };

  return (
    <div className={`border-l-4 p-4 rounded mb-4 flex justify-between items-start ${colors[type]}`}>
      <div className="pr-4">{message}</div>
      {onClose && (
        <button onClick={onClose} className="text-lg font-bold hover:opacity-70">
          ×
        </button>
      )}
    </div>
  );
}
