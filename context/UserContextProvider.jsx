'use client';

import React, { useState } from 'react';
import { UserContext } from './UserContext';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    role: 'User',
    picture: '',
    userId: '',
    token: '',
  });
  const addUser = (newUser) => {
    setUser({ ...user, ...newUser });
  };
  return (
    <UserContext.Provider value={{ user, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
