'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavigationLinks from '../navigationLinks/NavigationLinks';
import PersonaHeartContainer from '../personaHeartContainer/PersonaHeartContainer';
import Logo from '../logo/Logo';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Link href={'/'}>
        <Logo />
      </Link>
      <NavigationLinks />
      <PersonaHeartContainer />
    </header>
  );
};

export default Header;
