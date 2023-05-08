'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ prompt, handleTagClick, hadnleEdit, handleDelete }) => {
  const [copie, setCopie] = useState(false);

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
        onClick={() => {}}
        className="flex flex-col items-center justify-center w-full h-full mt-8"
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
    </div>
  );
};

export default PromptCard;
