import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';
import { setCurrentPage, setError, useLazyBookDataQuery } from '../redux/bookSlice';
import { RootState } from '../redux/store';
import Pagination from './Pagination';

const BookContent = () => {
  const selectedBook = useAppSelector((state) => state.books.selectedBook);
  const { currentPage, pageSize } = useAppSelector((state: RootState) => state.books);
  const [paginatedContent, setPaginatedContent] = useState('');
  const [trigger] = useLazyBookDataQuery();
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Always call the hook, but conditionally perform the fetch logic
  useEffect(() => {
    const fetchPaginatedContent = async () => {
      if (selectedBook) {
        try {
          const response = await trigger(
            `?book_id=${selectedBook?.content.book_id}&page=${currentPage}&page_size=${pageSize}`,
          );
          setPaginatedContent(response.data.content);
        } catch (error) {
          console.error('Error fetching paginated content:', error);
          dispatch(setError('Failed to paginate content. Please try again.'));
        }
      }
    };
    fetchPaginatedContent();
  }, [currentPage, selectedBook, trigger]);

  useEffect(() => {
    window.scrollTo({
      top: 1230,
      behavior: 'smooth',
    });
  }, [paginatedContent]);

  if (!isMounted || !selectedBook) {
    return null;
  }

  const content = selectedBook.content;
  const totalPages = content.total_pages;

  const nextPage = () => dispatch(setCurrentPage(Math.min(currentPage + 1, totalPages)));
  const previousPage = () => dispatch(setCurrentPage(Math.max(currentPage - 1, 1)));

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Book Content</h2>
      <div className="border border-gray-300 rounded-md p-4 mb-4 shadow-md bg-white flex items-center justify-center">
        <p className="whitespace-pre-line text-gray-800 leading-relaxed text-center">
          {paginatedContent}
        </p>
      </div>
      {totalPages > 1 && (
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

export default BookContent;
