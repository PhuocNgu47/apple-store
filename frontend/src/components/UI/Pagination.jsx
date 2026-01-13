import { memo } from 'react';

/**
 * Pagination Component
 * Reusable pagination
 */
const Pagination = memo(({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisible = 5,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pages = getPageNumbers();

  return (
    <div className="flex items-center gap-2 justify-center py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        ← Trước
      </button>

      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`
            px-3 py-2 rounded
            ${page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border hover:bg-gray-100'
            }
            ${page === '...' ? 'cursor-default' : 'cursor-pointer'}
          `}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Sau →
      </button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
