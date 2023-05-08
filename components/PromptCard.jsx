'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ prompt, handleTagClick, handleEdit, handleDelete }) => {
  const [copie, setCopie] = useState('');
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleCopy = () => {
    setCopie(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setCopie('false');
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={prompt?.creator?.image}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="text-lg font-semibold">{prompt?.creator?.username}</p>
          <p className="text-sm text-gray-500">{prompt?.creator?.email}</p>
        </div>
      </div>
      <div
        onClick={() => {
          handleCopy();
        }}
        className="flex flex-col items-center justify-center w-full h-full mt-8 cursor-pointer"
      >
        <Image
          src={
            copie === prompt.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
          }
          width={20}
          height={20}
        />
      </div>
      <p
        className="text-lg font-semibold text-center mt-8"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.prompt} {prompt.tag}
      </p>
      {session?.user.id === prompt.creator._id && pathname === '/profile' && (
        <div className="flex justify-between items-center w-full mt-8">
          <button
            onClick={handleEdit}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
