import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <Link href={'/'}> home</Link>
      <Link href={'/login'}> login</Link>
      <Link href={'/addProduct'}>Add Product</Link>
    </header>
  );
};

export default Header;
