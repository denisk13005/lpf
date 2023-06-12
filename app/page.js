import React from 'react';
import styles from './page.module.css';
import UserContainer from '../components/user/UserContainer';

const Home = () => {
  return (
    <main className={styles.main}>
      <UserContainer />
    </main>
  );
};

export default Home;
