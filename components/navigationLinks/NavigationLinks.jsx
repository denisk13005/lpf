import React from 'react';
import { useEffect,useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {AiOutlineCloseCircle} from 'react-icons/ai'
import styles from './styles.module.scss';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'A-propos', href: '/a-propos' },
  { name: 'Nos produits', href: '/products' },
  { name: 'Nos évènements', href: '/events' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const NavigationLinks = ({showHambMenu, closeHamb}) => {
  const pathname = usePathname();
  
  useEffect(() => {
    console.log(showHambMenu)
  }, [showHambMenu])
  

  return (
    <nav  className= { showHambMenu ? `${styles.navContainer} ${styles.navContainerVisible}` : styles.navContainer}>
      <span></span>
      <AiOutlineCloseCircle className={styles.closeBtn} onClick={() => closeHamb(true)}/>
      {navLinks.map((link) => {
        const isActive =
        (pathname.startsWith(link.href) && link.href !== '/') ||
        (pathname === '/' && link.href === '/');
        
        return (
          <div
          className={
            isActive
            ? `${styles.active} ${styles.navLinkContainer}`
            : styles.navLinkContainer
          }
          key={link.name}>
            <Link href={link.href} onClick={() => closeHamb(true)}>{link.name}</Link>
          </div>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;
