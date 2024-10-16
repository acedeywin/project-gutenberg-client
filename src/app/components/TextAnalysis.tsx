'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';

const TextAnalysis = () => {
  const selectedBook = useAppSelector((state) => state.books.selectedBook);
  const [isMounted, setIsMounted] = useState(false);

  // Set `isMounted` to true when the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent rendering until the component has mounted to avoid hydration mismatch
  if (!isMounted) {
    return null; // Return null during SSR to avoid mismatch
  }

  const textAnalysis = selectedBook?.textAnalysis;

  return (
    <>
      {textAnalysis && (
        <div className="w-full py-4 px-6 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-bold py-2 px-4">Text Analysis</h2>
          <p className="text-sm text-gray-600 py-2 px-4">
            <span className="font-bold">Language:</span>{' '}
            {textAnalysis?.language || 'No language available'}
          </p>
          <p className="text-sm text-gray-600 py-2 px-4 whitespace-pre-line">
            <span className="font-bold">Summary:</span>{' '}
            {textAnalysis?.summary || 'No summary available'}
          </p>
          <p className="text-sm text-gray-600 py-2 px-4 whitespace-pre-line">
            <span className="font-bold">Key Characters:</span>{' '}
            {textAnalysis?.key_characters || 'No key characters available'}
          </p>
          <p className="text-sm text-gray-600 py-2 px-4 whitespace-pre-line">
            <span className="font-bold">Sentiment Analysis:</span>{' '}
            {textAnalysis?.sentiment_analysis || 'No sentiment analysis available'}
          </p>
        </div>
      )}
    </>
  );
};

export default TextAnalysis;
