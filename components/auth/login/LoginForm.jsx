'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';

import styles from './styles.module.scss';

// schéma de validation des champs fait grâce a yup

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('')


  const { user, addUser } = useUserContext();
  const [lpfAccountInLocalStorage, setLpfAccountInLocalStorage] = useState('')

  const router = useRouter();

  const checkUserLogged = async (data) => {
    // if (localStorage.getItem('lpfAccount') !== null) {
    //   setLpfAccountInLocalStorage(JSON.parse(localStorage.getItem('lpfAccount')))
    // }
    // if (lpfAccountInLocalStorage.userId === user) {
    //   return
    // }
    // else {

    // const userId = tokens && tokens.userAccount.filter(el => el.userId === user).userId
    console.log(tokens, user && user[0].userId, 'userId in login');

    // }
  }






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



    addUser(userRes.userInfos);
    console.log(userRes, 'user res');
    if (userRes) {
      console.log('userr connected')
      const localStorage = window.localStorage.getItem('lpfAccount')
      console.log(localStorage);
      // get token of user connected
      const res = await axios.post('/api/user/token/getUserToken')
      console.log(res);
      const data = await res.data
      const userTokenInBdd = data && data.userAccount.filter(el => el.userId === userRes.userInfos.userId)[0]
      console.log(userTokenInBdd, 'user token in bdd');

      if (localStorage === null || localStorage.userId !== userRes.userInfos.userId) {
        window.localStorage.setItem('lpfAccount', JSON.stringify(userTokenInBdd))
      }



      // mettre à jour le token avec l'userId (faire un put)
      router.push('/');
    }

  };

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
          {/* <div className="text-center ">Ou se connecter avec :</div>
          <div className="flex justify-center">
            <span
              onClick={() => signIn("google")}
              className="flex justify-center items-center w-full h-[40px] bg-white rounded-md cursor-pointer"
            >
              <FcGoogle className="text-3xl" />
            </span>
            <span className="mx-6">ou</span>
            <span
              onClick={() => signIn("instagram")}
              className="flex justify-center items-center w-[40px] h-[40px]  rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-50 cursor-pointer"
            >
              <GrInstagram className="text-3xl text-white " />
            </span>
          </div> */}

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
