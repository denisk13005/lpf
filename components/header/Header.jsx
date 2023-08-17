'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavigationLinks from '../navigationLinks/NavigationLinks';
import PersonaHeartContainer from '../personaHeartContainer/PersonaHeartContainer';
import Logo from '../logo/Logo';
import styles from './styles.module.scss';

const Header = () => {
  const [showHambMenu, setshowHambMenu] = useState(true)
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const show = () => {
    setshowHambMenu(!showHambMenu)
    setTimeout(() => {
      setShowCloseBtn(!showHambMenu)
    }, 400);
    console.log(showHambMenu)
  }
  const closeHamb = (data) => {
    show(data)
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.menu} onClick={() => show()}>menu</div>
      <Link href={'/'} className={styles.logo}>
        <Logo />
      </Link>
      <div className={styles.navLinksContainer}>

        <NavigationLinks showHambMenu={showHambMenu} closeHamb={closeHamb} />
        

            <span className={showCloseBtn ? `${styles.closeBtn} ${styles.closeBtnVisible}`: styles.closeBtn } onClick={() => show()}>X</span>
   
      </div>
      <PersonaHeartContainer />
    </header>
  );
};

export default Header;
