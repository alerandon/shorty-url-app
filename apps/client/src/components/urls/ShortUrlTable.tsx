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
  refetch?: () => Promise<void> | void; // opcional para refrescar tras eliminar
}

const ShortUrlTable: React.FC<ShortUrlTableProps> = ({
  urls,
  loading,
  error,
  refetch,
}) => {
  const { deleteUrl } = useDeleteUrl();
  const { addToast } = useToast();
  const [optimistic, setOptimistic] = useState<IUrl[]>(urls);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

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

    // Optimistic update
    setDeletingIds((prev) => new Set(prev).add(target._id));
    setOptimistic((prev) => prev.filter((u) => u.shortCode !== shortCode));

    const ok = await deleteUrl(shortCode);
    if (ok) {
      addToast('URL eliminada', { variant: 'success' });
      if (refetch) await refetch();
    } else {
      // rollback
      addToast('Error eliminando URL', { variant: 'error' });
      setOptimistic((prev) =>
        [...prev, target].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      );
    }
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(target._id);
      return next;
    });
  };

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
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {optimistic.map((url) => {
              const shortUrl = `${ROOT_URL}/${url.shortCode}`;
              const isDeleting = deletingIds.has(url._id);
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
                  <td className="px-4 py-3 md:px-6 md:py-4 text-right">
                    <button
                      onClick={() => handleDelete(url.shortCode)}
                      aria-label={`Eliminar URL corta ${shortUrl}`}
                      disabled={isDeleting}
                      className="text-red-400 hover:text-red-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs md:text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-red-400/50 rounded"
                    >
                      {isDeleting ? 'Eliminando…' : 'Eliminar'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShortUrlTable;
