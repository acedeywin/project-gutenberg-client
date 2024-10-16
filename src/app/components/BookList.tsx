'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectBook } from '../redux/bookSlice';
import { Book } from '../redux/types';
import Pagination from './Pagination';

const BookList = () => {
  const books = useAppSelector((state) => state.books.books);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const pageIndex = 1;
  const startIndex = (currentPage - pageIndex) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksListLength = books.length;
  const totalPages = Math.ceil(booksListLength / itemsPerPage);

  const nextPage = () => setCurrentPage(Math.min(currentPage + pageIndex, totalPages));
  const previousPage = () => setCurrentPage(Math.max(currentPage - pageIndex, pageIndex));

  // Use useEffect to ensure the component is mounted before rendering client-specific content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing or a loader during SSR to prevent hydration mismatch
    return null;
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const currentDataList = (): Book[] => {
    return Object.keys(books)
      .slice(startIndex, endIndex) // Get the keys for the current page
      .map((key) => books[key as any]);
  };

  const bookList = currentDataList();

  return (
    <div className="p-4">
      {booksListLength >= pageIndex && (
        <h2 className="text-2xl mb-4">Previously Accessed Books</h2>
      )}
      <ul>
        {bookList.map((book: Book) => (
          <li key={book.id} className="mb-2">
            <div className="flex justify-between items-center p-2 border-b border-gray-300">
              <span className="font-semibold">Book ID: {book.id}</span>
              <span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={book.metadata?.metadata}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  View Metadata
                </a>
              </span>
              <button
                onClick={() => dispatch(selectBook(book.id))}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Read Book
              </button>
            </div>
          </li>
        ))}
      </ul>
      {booksListLength > itemsPerPage && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </div>
  );
};

export default BookList;
