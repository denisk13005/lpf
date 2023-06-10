import React from 'react';
import styles from './styles.module.scss'
import LoginForm from '@/components/auth/login/LoginForm';

const login = () => {
  return (
    <div className={styles.container}>
      <LoginForm/>
    </div>
  );
};

export default login;