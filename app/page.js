import CheckUser from '@/components/user/CheckUser';
import React from 'react';
import { GiHanger } from 'react-icons/gi';
import styles from './page.module.scss';

const Home = () => {
  return <main className={styles.main}>
    <div className={styles.titleContainer}>
      <CheckUser />

      <div >Frip Boutique</div>
      <GiHanger className={styles.hanger} />
      <div > Ambulante</div>

    </div>

  </main>;
};

export default Home;
