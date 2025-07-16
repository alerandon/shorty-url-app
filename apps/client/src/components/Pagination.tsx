import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  // Calcula el rango de páginas a mostrar
  const getPages = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);
    if (page <= 3) {
      end = Math.min(5, totalPages);
    }
    if (page > totalPages - 3) {
      start = Math.max(1, totalPages - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPages();

  return (
    <nav
      className={`flex items-center justify-center gap-2 mt-8 select-none ${className || ''}`.trim()}
      aria-label="Pagination"
    >
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full  opacity-70 hover:opacity-100 transition disabled:opacity-30"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        &#60;
      </button>
      {pages[0] > 1 && (
        <>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full  opacity-70 hover:opacity-100 transition text-sm md:text-base"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {pages[0] > 2 && <span className="px-1  opacity-50">...</span>}
        </>
      )}
      {pages.map((p) => (
        <button
          key={p}
          className={`w-8 h-8 flex items-center justify-center rounded-full  transition font-semibold ${p === page ? 'bg-[#28243a] opacity-100' : 'opacity-70 hover:opacity-100'} text-sm md:text-base`}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-1  opacity-50">...</span>
          )}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full  opacity-70 hover:opacity-100 transition text-sm md:text-base"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full  opacity-70 hover:opacity-100 transition disabled:opacity-30"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        &#62;
      </button>
    </nav>
  );
};

export default Pagination;
