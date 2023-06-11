import React from 'react';
import styles from './page.module.css';
import ProductContainer from './ProductContainer';

const Home = () => {
  return (
    <main className={styles.main}>
      <ProductContainer />
    </main>
  );
};

export default Home;
