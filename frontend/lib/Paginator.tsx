import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Paginator({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}): ReactNode {
  if (totalPages <= 1) return null;

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <li key="page-1">
          <button
            onClick={() => onPageChange(1)}
            className={clsx(
              "flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-300",
              {
                "bg-indigo-600 text-white": currentPage == 1,
                "bg-white text-gray-700 hover:bg-indigo-100": currentPage !== 1,
              }
            )}
          >
            {" "}
            1
          </button>
        </li>
      );
    }

    if (startPage > 2) {
      buttons.push(
        <li key="ellipse-1" className="flex items-center justify-center px-3">
          ...
        </li>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <li key={`page-${i}`}>
          <button
            onClick={() => onPageChange(i)}
            className={clsx(
              "flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-300",
              {
                "bg-indigo-600 text-white": currentPage === i,
                "bg-white text-gray-700 hover:bg-indigo-100": currentPage !== i,
              }
            )}
          >
            {i}
          </button>
        </li>
      );
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <li
            key="ellipsis-2"
            className="flex items-center justify-center px-3"
          >
            ...
          </li>
        );
      }
      buttons.push(
        <li key={`page-${totalPages}`}>
          <button
            onClick={() => onPageChange(totalPages)}
            className={clsx(
              "flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-300",
              {
                "bg-indigo-600 text-white": currentPage === totalPages,
                "bg-white text-gray-700 hover:bg-indigo-100":
                  currentPage !== totalPages,
              }
            )}
          >
            {totalPages}
          </button>
        </li>
      );
    }
    return buttons;
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-indigo-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
        </li>

        {renderPageButtons()}

        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-white text-gray-700 hover:bg-indigo-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
