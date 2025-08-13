import React, { useState } from 'react';
import NoData from '../feedback/NoData';
import type { IUrl } from '../../types/url.types';
import { ROOT_URL } from '../../globals';
import { useDeleteUrl } from '../../hooks/api/urls/useDeleteUrl';
import ShortUrlTableSkeleton from './ShortUrlTableSkeleton';
import { useToast } from '../../hooks/toast/useToast';

interface ShortUrlTableProps {
  urls: IUrl[];
  loading: boolean;
  error: string | null;
  refetch?: () => Promise<void> | void;
}

const ShortUrlTable: React.FC<ShortUrlTableProps> = ({
  urls,
  loading,
  error,
  refetch,
}) => {
  const { deleteUrl, error: deleteError } = useDeleteUrl();
  const { addToast } = useToast();
  const [optimistic, setOptimistic] = useState<IUrl[]>(urls);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  React.useEffect(() => {
    setOptimistic(urls);
  }, [urls]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = async (shortCode: string) => {
    const confirmed = window.confirm(
      '¿Eliminar este enlace corto? Esta acción no se puede deshacer.',
    );
    if (!confirmed) return;
    const target = optimistic.find((u) => u.shortCode === shortCode);
    if (!target) return;

    setDeletingIds((prev) => new Set(prev).add(target._id));
    setOptimistic((prev) => prev.filter((u) => u.shortCode !== shortCode));

    const ok = await deleteUrl(shortCode);
    if (ok) {
      addToast('URL eliminada', { variant: 'success' });
      if (refetch) await refetch();
    } else {
      setOptimistic((prev) =>
        [...prev, target].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      );
      addToast('Error eliminando URL', { variant: 'error' });
    }
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(target._id);
      return next;
    });
  };

  React.useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenuId(null);
    };
    const closeOnClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-actions-menu]')) setOpenMenuId(null);
    };
    window.addEventListener('keydown', closeOnEsc);
    window.addEventListener('mousedown', closeOnClickOutside);
    return () => {
      window.removeEventListener('keydown', closeOnEsc);
      window.removeEventListener('mousedown', closeOnClickOutside);
    };
  }, []);

  if (loading) return <ShortUrlTableSkeleton />;

  if (error) {
    return (
      <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
        <p className="text-red-500 text-xl" role="alert">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-hidden">
      {optimistic.length === 0 ? (
        <NoData />
      ) : (
        <table className="w-full mx-auto border-collapse md:text-base text-xs">
          <thead>
            <tr className="text-left border-b border-[#e6e6e6]/40">
              <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium">
                Original URL
              </th>
              <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium">
                Short URL
              </th>
              <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium">
                Created
              </th>
              <th className="px-4 py-3 md:px-6 md:py-4 opacity-[40%] font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {optimistic.map((url) => {
              const shortUrl = `${ROOT_URL}/${url.shortCode}`;
              const isDeleting = deletingIds.has(url._id);
              const menuOpen = openMenuId === url._id;
              return (
                <tr
                  key={url._id}
                  className={`transition-colors duration-200 rounded-2xl ${isDeleting ? 'opacity-40 pointer-events-none' : 'hover:bg-secondary'}`}
                >
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <span
                      className="truncate block max-w-xs"
                      title={url.originalUrl}
                    >
                      {url.originalUrl}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {shortUrl}
                    </a>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    {formatDate(url.createdAt)}
                  </td>
                  <td
                    className="px-4 py-3 md:px-6 md:py-4 text-right relative"
                    data-actions-menu
                  >
                    <div className="inline-flex items-center justify-end">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        aria-label="Abrir menú de acciones"
                        disabled={isDeleting}
                        onClick={() => setOpenMenuId(menuOpen ? null : url._id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-secondary/60 focus:outline-none focus-visible:ring focus-visible:ring-indigo-400/50 transition text-lg ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        ⋯
                      </button>
                    </div>
                    {menuOpen && (
                      <div
                        role="menu"
                        aria-label="Acciones"
                        className="absolute right-2 top-10 z-20 min-w-[140px] rounded-md border border-[#e6e6e6]/20 bg-[#1f1c2e] shadow-lg py-1 text-left animate-fade-in"
                      >
                        <button
                          role="menuitem"
                          onClick={() => {
                            setOpenMenuId(null);
                            handleDelete(url.shortCode);
                          }}
                          disabled={isDeleting}
                          className={`w-full text-left px-3 py-2 text-xs md:text-sm flex items-center gap-2 transition-colors
                            ${isDeleting
                              ? 'text-red-300 bg-transparent cursor-not-allowed opacity-50'
                              : 'text-red-400 hover:bg-red-500/10 hover:text-red-500 active:bg-red-600/20 cursor-pointer'
                            }`}
                        >
                          {isDeleting ? 'Eliminando…' : 'Eliminar'}
                        </button>
                        {/* Futuras acciones aquí */}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {deleteError && (
        <div className="sr-only" role="alert">
          {deleteError}
        </div>
      )}
    </div>
  );
};

export default ShortUrlTable;
