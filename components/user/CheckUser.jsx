'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/context/UserContext';

import axios from 'axios';
import { useRouter } from 'next/navigation';

/**
 * 
 * @returns check if the user have a valid token in local storage
 */
const CheckUser = () => {
  const router = useRouter()
  const { user, addUser } = useUserContext();
  const [tokenInLocalStorage, setTokenInLocalStorage] = useState('')
  useEffect(() => {
    console.log(('here'));
    if (window.localStorage.getItem('lpfAccount') !== null) {
      setTokenInLocalStorage(JSON.parse(window.localStorage.getItem('lpfAccount')))
    }

    console.log(tokenInLocalStorage && tokenInLocalStorage);


  }, [])
  useEffect(() => {

    // validité du token pas mise en place popur le moment
    // findUserInBdd(tokenInLocalStorage)
    checkTokenAndLogin(tokenInLocalStorage)
  }, [tokenInLocalStorage])

  /**
   * 
   * @param {Object} tokenInLocalStorage objet contenant les informations de l'utilisateur stocké dans le local storage lors de son inscription 
   */
  const checkTokenAndLogin = async (data) => {
    console.log(data && data, 'data');
    // récupérer le token de l'user connecté dans le localstorage et son userId
    const userId = data && data.userId
    console.log(userId, 'user id');
    // chercher si pour l'userId enregistré en base le token correspond
    const res = await axios.post('/api/user/token/getUserToken', { 'userId': userId })
    const tokenObject = await res.data
    console.log(tokenObject.userAccount, 'tokenObject', userId);
    const uId = await tokenObject.userAccount.filter(el => el.userId.toString() === userId.toString())

    console.log(uId, 'uId', data.access_token, 'data acces token');
    const uIdAccessToken = await uId[0]

    // login
    if (uIdAccessToken) {

      if (data.access_token !== uIdAccessToken.access_token) {
        return
      } else {
        // utiliser un paramètres d'url popur passer l'userId et faire une requête dans api/login popur retrouver l'user et remonter ses infos
        const res = await axios.get(`/api/user/login`, {
          params: {
            userId: userId
          }
        })
        const user = await res.data
        console.log(user);
        const userInfos = user.user[0]
        addUser(userInfos)
      }

    }
  }


  const findUserInBdd = async (token) => {
    console.log('here');
    const res = await axios.post('/api/user/getUserInfos', { 'token': token })
    const status = await res.data.status;
    console.log(res.data);
    if (res.data.msg === 'token expired') {

    }
    if (status === 200) {

      const user = await res.data.user
      addUser(user)
    } else {
      alert('session expirez veuillez vous reconnecter')
      router.push('/login')

    }
  }



  return (
    <div>
    </div>
  );
};

export default CheckUser;