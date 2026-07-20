import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    error: 'border-rose-200 bg-rose-50 text-rose-900',
    info: 'border-indigo-200 bg-indigo-50 text-indigo-900'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 border rounded-xl shadow-lg transition-all duration-300 animate-slide-up ${borderColors[type] || borderColors.info}`}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
