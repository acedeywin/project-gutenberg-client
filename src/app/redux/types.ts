export interface Book {
  id: number;
  metadata: {
    book_id: number;
    metadata: string;
  };
  content: {
    book_id: number;
    content: string;
    page: number;
    page_size: number;
    total_pages: number;
  };
  textAnalysis: {
    book_id: number;
    title_and_author: string;
    language: string;
    summary: string;
    key_characters: string;
    sentiment_analysis: string;
  };
}

export interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  currentPage: number;
  pageSize: number;
  error: string | null;
}

export const initialState: BooksState = {
  books: [],
  selectedBook: null,
  currentPage: Number(1),
  pageSize: Number(15000),
  error: null,
};
