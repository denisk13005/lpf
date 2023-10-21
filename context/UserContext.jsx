import { createContext, useContext } from 'react';

export const UserContext = createContext({
  user: {
    
  },
  setUser(user) {},
});

export const useUserContext = () => useContext(UserContext);
