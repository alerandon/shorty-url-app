import React from 'react';
import { useToast } from '../../../hooks/toast/useToast';

const variantStyles: Record<string, string> = {
  success: 'bg-green-600/90 border-green-400 text-white',
  error: 'bg-red-600/90 border-red-400 text-white',
  info: 'bg-blue-600/90 border-blue-400 text-white',
  warning: 'bg-yellow-500/90 border-yellow-300 text-black',
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-72 md:w-80">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          aria-live="polite"
          className={`border rounded-lg shadow-md px-4 py-3 text-sm flex justify-between gap-3 items-start animate-fade-in ${variantStyles[t.variant || 'info']}`}
        >
          <span className="flex-1 leading-snug">{t.message}</span>
          <button
            onClick={() => removeToast(t.id)}
            className="text-white/70 hover:text-white focus:outline-none focus-visible:ring ring-white/60 rounded"
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
