'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUserContext } from '@/context/UserContext';

import styles from './styles.module.scss';

// schéma de validation des champs fait grâce a yup

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const { user, addUser } = useUserContext();
  const [tokenInLocalStorage, setTokenInLocalStorage] = useState('')

  const router = useRouter();

  // localStorage.getItem('lpfAccount') && setTokenInLocalStorage(localStorage.getItem('lpfAccount').token)
  // console.log(tokenInLocalStorage,);

  const loggin = async (e) => {
    e.preventDefault();
    console.log(data);

    let res = await axios.post('api/user/login', {
      email: data.email,
      password: data.password,
    });
    let userRes = await res.data;

    // check if user had a token in the bdd

    
    // if(tokenInLocalStorage){
      
    // }

    addUser(userRes.userInfos);
    console.log(userRes, 'user res');
    if (userRes) {
      alert('utilisateur connecté');
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
