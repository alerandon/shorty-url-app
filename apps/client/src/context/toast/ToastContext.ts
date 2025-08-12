import { createContext } from 'react';
import type { ToastVariant, Toast } from './ToastTypes';

export interface ToastContextValue {
  addToast: (
    message: string,
    options?: { variant?: ToastVariant; duration?: number },
  ) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);
