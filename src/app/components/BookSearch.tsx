'use client';

import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addBook,
  setCurrentPage,
  setError,
  useLazyBookDataQuery,
  useTextAnalysisMutation,
} from '../redux/bookSlice';
import { Book } from '../redux/types';

const BookSearch = () => {
  const [bookId, setBookId] = useState('');
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books);

  const [textAnalysis, isLoading] = useTextAnalysisMutation();
  const [trigger] = useLazyBookDataQuery();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setError(''));
  }, [dispatch]);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    try {
      const bookIndex = books.books.find((book) => book.id === Number(bookId));

      if (bookIndex) {
        dispatch(setError(`Book with ID ${bookId} already exist.`));
        return;
      }

      const content = await trigger(`/${bookId}?page=${1}&page_size=${15000}`);
      dispatch(setCurrentPage(1));

      if (content.error) {
        dispatch(setError(`Book with ID ${bookId} not found.`));
      }

      if (content.data) {
        const data = {
          body: { content: content.data.content },
          bookId,
        };
        const metadata = await trigger(`/metadata/${bookId}`);
        const textAnalysisResponse = await textAnalysis(data).unwrap();

        if (!isLoading.isError) {
          const book: Book = {
            id: Number(bookId),
            content: content.data,
            metadata: metadata.data,
            textAnalysis: textAnalysisResponse,
          };

          dispatch(addBook(book));
        }
      }
    } catch (error) {
      console.log('error', error);
      dispatch(setError('Failed to fetch the book. Please try again.'));
    } finally {
      setLoading(isLoading.isLoading);
    }
  }, [
    bookId,
    dispatch,
    books.books,
    isLoading.isError,
    isLoading.isLoading,
    textAnalysis,
    trigger,
  ]);

  const isDisabled = !bookId.trim();

  const handleOnChnge = (e: { target: { value: SetStateAction<string> } }) => {
    setBookId(e.target.value);
    dispatch(setError(''));
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        type="number"
        value={bookId}
        onChange={handleOnChnge}
        placeholder="Enter Book ID"
        className="mb-4 p-2 border rounded-md"
        name="bookId"
      />
      <button
        disabled={isDisabled}
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md"
      >
        {loading ? 'Loading' : 'Search'}
      </button>
      <p className="text-red-600 mt-5">{books.error}</p>
    </div>
  );
};

export default BookSearch;
