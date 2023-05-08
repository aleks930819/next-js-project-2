'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Form from '@components/Form';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    const { prompt, tag } = post;


    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          userId: session?.user.id,
          tag: tag,
        }),
      });
      if (res.ok) {
        setSubmiting(false);
      }
    } catch (err) {
      console.log(err);
      setSubmiting(false);
    }
    setSubmiting(false);
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
