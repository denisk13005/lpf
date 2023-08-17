'use client'
import React from 'react';
import { useEffect } from 'react';
import { useUserContext } from '@/context/UserContext';

import axios from 'axios';

/**
 * 
 * @returns check if the user have a valid token in local storage
 */
const CheckUser = () => {
  const { user, addUser } = useUserContext();
  useEffect(() => {
    console.log(('here'));
    const tokenInLocalStorage = localStorage.getItem('lfpToken')
    
  if (tokenInLocalStorage){
    findUserInBdd(tokenInLocalStorage)
  }
  
   
  }, [])
  const findUserInBdd = async(token) => {
    console.log('here');
     const res = await axios.post('/api/user/getUserInfos',{'token' : token})
     const user = await res.data.user
     addUser(user)
  } 
  


  return (
    <div>
    </div>
  );
};

export default CheckUser;