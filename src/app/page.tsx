'use client';

import BookSearch from './components/BookSearch';
import BookList from './components/BookList';
import BookContent from './components/BookContent';
import TextAnalysis from './components/TextAnalysis';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Project Gutenberg Book Viewer</h1>
      <BookSearch />
      <BookList />
      <TextAnalysis />
      <BookContent />
    </div>
  );
};

export default Home;
