import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUserContext } from '/context/UserContext';
import { usePathname } from 'next/navigation';
import styles from './styles.module.scss';

const PersonaHeartContainer = () => {
  const { user } = useUserContext();
  const pathname = usePathname();

  /**
   * Display the good persona and heart depending on the page
   * If the user is connected, display the user picture or the first letter of the name
   * If the user is not connected, display the persona
   * If the user is on the login page, display the yellow persona
   * If the user is on the wishes page, display the yellow heart
   * @param {object} user - user object
   * @param {string} pathname - pathname of the page
   * @returns {JSX.Element} - persona and heart
   */
  const displaypersonaHeartContainer = (user, pathname) => {
    if (user) {
      if (user?.picture) {
        return (
          <Link href={'/profile'}>
            <div className={styles.userPastille}>
              <Image
                alt='user'
                src={user.picture}
                width={100}
                height={100}
              />
            </div>
          </Link>
        );
      } else {
        return (
          <Link href={'/profile'}>
            <div
              className={
                pathname.startsWith('/profile')
                  ? styles.userPastille
                  : `${styles.userPastille} ${styles.userPastilleBlack}`
              }>
              <p>{user?.name[0].toUpperCase()}</p>
            </div>
          </Link>
        );
      }
    } else {
      return (
        <Link href={'./login'}>
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
      );
    }
  };

  return (
    <div className={styles.personaHeartContainer}>
      <div className={styles.personaHeartContainer}>
        {displaypersonaHeartContainer(user, pathname)}
        <div className={styles.line} />
        <Link href={'/wishes'} className={styles.heart}>
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
    </div>
  );
};

export default PersonaHeartContainer;
