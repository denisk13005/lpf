'use client'
import React from 'react';
import { useEffect } from 'react';
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
  useEffect(() => {
    console.log(('here'));
    const tokenInLocalStorage = JSON.parse(localStorage.getItem('lpfAccount')).access_token
    
  if (tokenInLocalStorage){
    findUserInBdd(tokenInLocalStorage)
  }
  
   
  }, [])
  const findUserInBdd = async(token) => {
    console.log('here');
     const res = await axios.post('/api/user/getUserInfos',{'token' : token})
    const status = await res.data.status;
    console.log(res.data);
    if(res.data.msg === 'token expired'){

    }
    if(status === 200){

       const user = await res.data.user
       addUser(user)
    }else {
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