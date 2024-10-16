import React from 'react';

type OwnProps = {
  totalPages: number;
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
};

type Props = OwnProps;

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  nextPage,
  previousPage,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={previousPage}
        disabled={currentPage <= 1}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Previous Page
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
