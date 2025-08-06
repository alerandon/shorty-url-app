import React from 'react';
import NoData from './NoData';
import type { IUrl } from '../types/url.types';
import { ROOT_URL } from '../globals';

interface ShortUrlTableProps {
  urls: IUrl[];
  loading: boolean;
  error: string | null;
}

const ShortUrlTable: React.FC<ShortUrlTableProps> = ({
  urls,
  loading,
  error,
}) => {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
        <p className="text-white text-xl">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-primary w-full min-h-[450px] max-w-xl md:max-w-5xl mt-16 md:mt-24 mx-auto rounded-2xl shadow-lg overflow-hidden">
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
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => {
              const shortUrl = `${ROOT_URL}/${url.shortCode}`;
              return (
                <tr
                  key={url._id}
                  className="hover:bg-secondary transition-colors duration-200 rounded-2xl"
                >
                  <td className="px-4 py-3 md:px-6 md:py-4">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate block max-w-xs"
                    >
                      {url.originalUrl}
                    </a>
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
