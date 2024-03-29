'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';


import styles from './styles.module.scss';

import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/firebase';

import { FcGoogle } from "react-icons/fc";






const provider = new GoogleAuthProvider();

// schéma de validation des champs fait grâce a yup

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('')


  const { user, addUser } = useUserContext();

  const router = useRouter();








  const loggin = async (e) => {
    e.preventDefault();
    console.log(data);

    let res = await axios.post('api/user/login', {
      email: data.email,
      password: data.password,
    });
    let userRes = await res.data;
    if (userRes.status === 400) {
      setErrorMsg(userRes.message)
      return
    }



    if (userRes) {
      console.log('userr connected')
      const localStorage = window.localStorage.getItem('lpfAccount')
      console.log(localStorage);
      // get token of user connected
      const res = await axios.post('/api/user/token/getUserToken')
      const data = await res.data
      if (!data.status === 200) return
      addUser(userRes.userInfos);

      const userTokenInBdd = data && data.userAccount.filter(el => el.userId === userRes.userInfos.userId)[0]

      if (localStorage === null || localStorage.userId !== userRes.userInfos.userId) {
        window.localStorage.setItem('lpfAccount', JSON.stringify(userTokenInBdd))
      }



      router.push('/');
    }

  };

  const signIn = async () => {
    signInWithRedirect(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token, 'token');
      // The signed-in user info.
      const user = result.user;
      console.log(user, 'user ');
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return (
    <div className={styles.formContainer}>
      <h2>Connectez vous ...</h2>

      <div>
        <form onSubmit={loggin}>
          <div>
            <label htmlFor='email'>Email</label>
            <div>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className={styles.forgot}>
              <label htmlFor='password'>Mot de passe</label>
              <div>
                <a href='#'>Forgot password?</a>
              </div>
            </div>
            <div>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <span style={{ color: 'rgb(255,5,100)', fontSize: '18px', fontWeight: 'bold', textShadow: '2px 2px 5px white' }}> {errorMsg && errorMsg}</span>

          <div>
            <button type='submit'>Se Connecter</button>
          </div>
          <div className={styles.seCo}>Ou se connecter avec </div>
          <div className="flex justify-center">
            <span
              onClick={() => signIn("google")}
              className={styles.googleBtn}
            >
              <FcGoogle className={styles.iconGoogle} />
            </span>

          </div>

          <div className={styles.createAccountContainer}>
            <span htmlFor='password'>Pas de compte ?</span>
            <div className='text-sm'>
              <Link href={'/signUp'}>Créer un compte</Link>
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
