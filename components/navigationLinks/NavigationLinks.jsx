import React from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AiOutlineCloseCircle } from 'react-icons/ai'
import styles from './styles.module.scss';
import {
  signOut
} from "firebase/auth";
import { auth } from '@/firebase';
import { LiaSignOutAltSolid } from "react-icons/lia";
import { GrContact } from "react-icons/gr";
import { FaQuestion } from "react-icons/fa6";
import { BsCalendar4Event } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

const navLinks = [
  { name: 'Accueil', href: '/', icon: <IoHomeOutline /> },
  { name: 'A-propos', href: '/a-propos', icon: <IoIosInformationCircleOutline /> },
  { name: 'Nos produits', href: '/products', icon: <MdOutlineProductionQuantityLimits /> },
  { name: 'Nos évènements', href: '/events', icon: <BsCalendar4Event /> },
  { name: 'FAQ', href: '/faq', icon: <FaQuestion /> },
  { name: 'Contact', href: '/contact', icon: <GrContact /> },

];

const NavigationLinks = ({ showHambMenu, closeHamb }) => {


  const pathname = usePathname();

  useEffect(() => {
    console.log(showHambMenu)
  }, [showHambMenu])

  const deco = async () => {
    console.log('click');
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav className={showHambMenu ? `${styles.navContainer} ${styles.navContainerVisible}` : styles.navContainer}>
      <span></span>
      <AiOutlineCloseCircle className={styles.closeBtn} onClick={() => closeHamb(true)} />
      {navLinks.map((link) => {
        const isActive =
          (pathname.startsWith(link.href) && link.href !== '/') ||
          (pathname === '/' && link.href === '/');

        return (
          <span
            style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', color: 'black' }}
            className={
              isActive
                ? `${styles.active} ${styles.navLinkContainer}`
                : styles.navLinkContainer
            }
            key={link.name}>
            <Link href={link.href} onClick={() => closeHamb(true)}>{link.name}</Link>
            {link.icon}
          </span>
        );
      })}
      {

      }
      <span
        className={styles.navLinkContainer}
        style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }} onClick={() => deco()}><Link href='/#' onClick={() => closeHamb(true)}>Signout</Link> <LiaSignOutAltSolid /> </span>
    </nav>
  );
};

export default NavigationLinks;
