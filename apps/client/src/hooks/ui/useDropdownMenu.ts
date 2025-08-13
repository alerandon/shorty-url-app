import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  closeOnEsc?: boolean;
  closeOnOutside?: boolean;
  containerSelector?: string; // para delimitar clicks fuera
}

export function useDropdownMenu(options: Options = {}) {
  const {
    closeOnEsc = true,
    closeOnOutside = true,
    containerSelector = '[data-actions-menu]',
  } = options;
  const [openId, setOpenId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const toggle = useCallback(
    (id: string) => setOpenId((curr) => (curr === id ? null : id)),
    [],
  );
  const isOpen = useCallback((id: string) => openId === id, [openId]);

  useEffect(() => {
    if (!closeOnEsc && !closeOnOutside) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') close();
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!closeOnOutside) return;
      const target = e.target as HTMLElement;
      if (!target.closest(containerSelector)) close();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onMouseDown);
    };
  }, [close, closeOnEsc, closeOnOutside, containerSelector]);

  const triggerProps = (id: string) => ({
    'aria-haspopup': 'menu' as const,
    'aria-expanded': openId === id,
    onClick: () => toggle(id),
  });

  const menuProps = () => ({
    role: 'menu' as const,
    'aria-label': 'Acciones',
  });

  return {
    openId,
    isOpen,
    open,
    close,
    toggle,
    triggerProps,
    menuProps,
    containerRef,
  };
}
