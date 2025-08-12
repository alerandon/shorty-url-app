import React, { useCallback, useState } from 'react';
import { ToastContext } from './ToastContext';
import type { Toast, ToastVariant } from './ToastTypes';

// Tipos exportados para reutilización externa

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (
      message: string,
      options?: { variant?: ToastVariant; duration?: number },
    ) => {
      const id = crypto.randomUUID();
      const toast: Toast = {
        id,
        message,
        variant: options?.variant || 'info',
        duration: options?.duration ?? 4000,
      };
      setToasts((prev) => [...prev, toast]);
      if (toast.duration) {
        setTimeout(() => removeToast(id), toast.duration);
      }
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
