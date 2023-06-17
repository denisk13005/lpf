import React from 'react';
import styles from './page.module.scss';
import {GiHanger } from 'react-icons/gi'

const Home = () => {
  return <main className={styles.main}>
    <div className={styles.titleContainer}>

    <div >La Petite</div>
    <GiHanger className={styles.hanger}/>
    <div > Friperie</div>
    </div>
  </main>;
};

export default Home;
