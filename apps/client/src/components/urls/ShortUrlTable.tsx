import React from 'react';
import NoData from '../feedback/NoData';
import type { IUrl } from '../../types/url.types';
import { ROOT_URL } from '../../globals';
import { useDeleteUrl } from '../../hooks/api/urls/useDeleteUrl';
import ShortUrlTableSkeleton from './ShortUrlTableSkeleton';
import { useToast } from '../../hooks/toast/useToast';
import { formatDateES } from '../../utils/date';
import { useDropdownMenu } from '../../hooks/ui/useDropdownMenu';

interface ShortUrlTableProps {
  urls: IUrl[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void> | void;
}

const ShortUrlTable: React.FC<ShortUrlTableProps> = ({
  urls,
  loading,
  error,
  refetch,
}) => {
  const { deleteUrl, error: deleteError } = useDeleteUrl();
  const { addToast } = useToast();
  const { toggle, close, isOpen } = useDropdownMenu();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const handleDelete = async (shortCode: string) => {
    const confirmed = window.confirm(
      '¿Eliminar este enlace corto? Esta acción no se puede deshacer.',
    );
    if (!confirmed) return;
    const target = urls.find((u) => u.shortCode === shortCode);
    if (!target) return;

    setDeletingId(target._id);
    const isDeleted = await deleteUrl(shortCode);
    setDeletingId(null);
    if (isDeleted) {
      addToast('URL eliminada', { variant: 'success' });
      await refetch();
    } else {
      addToast(deleteError || 'Error eliminando URL', { variant: 'error' });
    }
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
    <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-visible">
      {urls.length === 0 ? (
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
            {urls.map((url) => {
              const shortUrl = `${ROOT_URL}/${url.shortCode}`;
              const deleting = deletingId === url._id;
              const menuOpen = isOpen(url._id);
              return (
                <tr
                  key={url._id}
                  className={`transition-colors duration-200 rounded-2xl ${deleting ? 'opacity-40 pointer-events-none' : 'hover:bg-secondary'}`}
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
                    {formatDateES(url.createdAt)}
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
                        disabled={deleting}
                        onClick={() => toggle(url._id)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-secondary/60 focus:outline-none focus-visible:ring focus-visible:ring-indigo-400/50 transition text-lg ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            close();
                            handleDelete(url.shortCode);
                          }}
                          disabled={deleting}
                          className={`w-full text-left px-3 py-2 text-xs md:text-sm flex items-center gap-2 transition-colors
                            ${
                              deleting
                                ? 'text-red-300 bg-transparent cursor-not-allowed opacity-50'
                                : 'text-red-400 hover:bg-red-500/10 hover:text-red-500 active:bg-red-600/20 cursor-pointer'
                            }`}
                        >
                          {deleting ? 'Eliminando…' : 'Eliminar'}
                        </button>
                      </div>
                    )}
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
