/* eslint-disable curly */
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const MyProfile = () => {
  const { data: session } = useSession();

  const [prompts, setPrompts] = useState([]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    const getPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPrompts(data);
    };

    if (session?.user.id) getPrompts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
