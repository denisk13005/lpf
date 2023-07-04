import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'A-propos', href: '/a-propos' },
  { name: 'Nos produits', href: '/products' },
  { name: 'Nos évènements', href: '/events' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

const NavigationLinks = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navContainer}>
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
    </nav>
  );
};

export default NavigationLinks;
