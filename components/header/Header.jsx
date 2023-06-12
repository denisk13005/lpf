'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useUserContext } from '/context/UserContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user } = useUserContext();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'A-propos', href: '/a-propos' },
    { name: 'Nos produits', href: '/products' },
    { name: 'Nos évènements', href: '/events' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={styles.headerContainer}>
      <Link href={'/'}>
        <Image
          src='/img/logo.svg'
          alt='logo'
          width={77}
          height={77}
        />
      </Link>
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
            <Link href={link.href}>{link.name}</Link>
          </div>
        );
      })}

      {user ? (
        <div className={styles.personaHeartContainer}>
          <Link href={'/profile'}>
            {user?.picture ? (
              <Image
                alt='user'
                src={user.picture}
                width={100}
                height={100}
              />
            ) : (
              <div
                className={
                  pathname.startsWith('/profile')
                    ? styles.userPastille
                    : `${styles.userPastille} ${styles.userPastilleBlack}`
                }>
                <p>{user?.name[0].toUpperCase()}</p>
              </div>
            )}
          </Link>
          <div className={styles.line} />
          <Link href={'/wishes'}>
            <Image
              src={
                pathname.startsWith('/wishes')
                  ? '/img/heartYellow.svg'
                  : '/img/heart.svg'
              }
              alt='heart'
              width={17}
              height={17}
            />
          </Link>
        </div>
      ) : (
        <div className={styles.personaHeartContainer}>
          <Link href={'/login'}>
            <Image
              src={
                pathname.startsWith('/login')
                  ? '/img/personaYellow.svg'
                  : '/img/persona.svg'
              }
              alt='persona'
              width={20}
              height={20}
            />
          </Link>
          <div className={styles.line} />
          <Link href={'/wishes'}>
            <Image
              src={
                pathname.startsWith('/wishes')
                  ? '/img/heartYellow.svg'
                  : '/img/heart.svg'
              }
              alt='heart'
              width={17}
              height={17}
            />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
