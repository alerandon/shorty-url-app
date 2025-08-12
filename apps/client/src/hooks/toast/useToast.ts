import { useContext } from 'react';
import { ToastContext } from '../../context/toast/ToastContext';
import type { ToastContextValue } from '../../context/toast/ToastContext';

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};
