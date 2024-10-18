import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book, initialState } from './types';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSlice = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Define your API endpoint
    bookData: builder.query({
      query: (endpoint: string) => ({
        url: `${endpoint}`,
        method: 'GET',
      }),
    }),
  }),
});

export const postSlice = createApi({
  reducerPath: 'textAnalysisApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    textAnalysis: builder.mutation({
      query: ({ body, bookId }) => ({
        url: `/text-analysis/${bookId}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.unshift(action.payload);
    },

    selectBook: (state, action: PayloadAction<number>) => {
      state.selectedBook = state.books.find((book) => book.id === action.payload) || null;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { addBook, selectBook, setCurrentPage, setPageSize, setError } =
  bookSlice.actions;

export const { useLazyBookDataQuery } = getSlice;
export const { useTextAnalysisMutation } = postSlice;

export default bookSlice.reducer;
