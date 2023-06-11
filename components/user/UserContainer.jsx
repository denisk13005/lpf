'use client';

import { useUserContext } from '/context/UserContext';
import Image from 'next/image';
import React from 'react';

const UserContainer = () => {
  const { user } = useUserContext();
  const { message, name, picture, userId, token, role } = user;
  if (token === '') return <p>Non connecté</p>;
  return (
    <div>
      <p>Message: {message}</p>
      <p>Name: {name}</p>
      <p>Role: {role}</p>
      <p>userId: {userId}</p>
      <p>token: {token}</p>

      {/* <Image
        alt='user'
        src={user.picture ||}
        width={100}
        height={100}
      /> */}
    </div>
  );
};

export default UserContainer;
