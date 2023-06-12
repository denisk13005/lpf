'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import UserContainer from '../user/UserContainer';
import { useUserContext } from '/context/UserContext';

const Header = () => {
  const { user } = useUserContext();
  console.log('user', user);
  if (user.token === '') {
    return (
      <header className={styles.headerContainer}>
        <Link href={'/'}> home</Link>
        <Link href={'/login'}> login</Link>
      </header>
    );
  }
  return (
    <header className={styles.headerContainer}>
      <Link href={'/'}> home</Link>
      <UserContainer user={user} />
    </header>
  );
};

export default Header;
