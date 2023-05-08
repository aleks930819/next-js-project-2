/* eslint-disable curly */
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submiting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const searchParams = useSearchParams();
  const propmptId = searchParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${propmptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (propmptId) getPromptDetails();

    return () => {
      setPost({});
    };
  }, [propmptId]);

  const editPrompt = async (e) => {
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
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      setSubmiting(false);
    }
    setSubmiting(false);
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submiting={submiting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
