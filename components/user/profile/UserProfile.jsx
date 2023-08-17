'use client'
import React from 'react';
import { useUserContext } from '/context/UserContext';
import { redirect } from 'next/navigation';

const UserProfile = () => {
  const { user } = useUserContext();
  if(!user)
{
 redirect('/login')
}

  return (
    <div>
      wELCOME {user.name}
    </div>
  );
};

export default UserProfile;