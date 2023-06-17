'use client'
import React from 'react';
import { useUserContext } from '/context/UserContext';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const { user } = useUserContext();
  const router = useRouter()
  if(!user)
{
  router.push('/login')
}

  return (
    <div>
      profile
    </div>
  );
};

export default UserProfile;