import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';

/**
 * User container component that displays user information.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.user - The user object containing user information.
 * @param {string} props.user.name - The name of the user.
 * @param {string} props.user.picture - The URL of the user's picture.
 * @param {string} props.user.color - The color associated with the user.
 * @returns {JSX.Element} The user container component.
 */
const UserContainer = ({ user }) => {
  console.log('user', user);

  return (
    <div className={styles.userContainer}>
      <p>{user?.name}</p>
      {user?.picture ? (
        <Image
          alt='user'
          src={user.picture}
          width={100}
          height={100}
        />
      ) : (
        <div
          className={styles.userPastille}
          style={{ backgroundColor: user?.color || 'black' }}>
          <p>{user?.name[0].toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default UserContainer;
