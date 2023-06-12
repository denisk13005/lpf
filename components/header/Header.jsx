'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import UserContainer from '../user/UserContainer';
import { useUserContext } from '/context/UserContext';

const Header = () => {
  const { user } = useUserContext();
  if (!user) {
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
      <Link href={'/profile'}>
        <UserContainer user={user} />
      </Link>
    </header>
  );
};

export default Header;
