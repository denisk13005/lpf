import React from 'react';
import styles from './page.module.scss';
import { tilt_prism } from './fonts';
import {GiHanger } from 'react-icons/gi'

const Home = () => {
  return <main className={styles.main}>
    <div className={styles.titleContainer}>

    <div className={tilt_prism.className}>La Petite</div>
    <GiHanger className={styles.hanger}/>
    <div className={tilt_prism.className}> Friperie</div>
    </div>
  </main>;
};

export default Home;
