'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-8">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPrompts(data);
    };

    getPrompts();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center w-full h-full px-4 py-8 bg-gray-100 rounded-lg">
      <form>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-12 px-3 rounded-lg text-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
