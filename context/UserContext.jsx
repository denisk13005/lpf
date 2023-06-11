import { createContext, useContext } from 'react';

export const UserContext = createContext({
  // products: [],
  // addProduct(product) {},
  user: {},
  setUser(user) {},
});

export const useUserContext = () => useContext(UserContext);
