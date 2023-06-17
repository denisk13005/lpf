'use client'
import React from 'react';
import { useUserContext } from '/context/UserContext';
import { redirect } from 'next/navigation';

const Profile = () => {
  const { user } = useUserContext();
  if(!user)
{
  redirect('/login')
}

  return (
    <div>
      profile
    </div>
  );}
export default Profile;
