import React from "react";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4" aria-label="Table navigation">
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm">
        <li>
          <button
            onClick={() => onPageChange({ selected: currentPage - 2 })}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 py-4 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: pageCount }, (_, index) => (
          <li key={index}>
            <button
              onClick={() => onPageChange({ selected: index })}
              className={`flex items-center justify-center px-3 py-4 leading-tight border border-gray-300 ${currentPage === index + 1
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange({ selected: currentPage })}
            disabled={currentPage === pageCount}
            className="flex items-center justify-center px-3 py-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
