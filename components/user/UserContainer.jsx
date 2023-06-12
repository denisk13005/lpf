import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';

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
