import { createContext, useContext } from 'react';

export const ProductContext = createContext({
  products: [],
  addProduct(product) {},
});

export const useProductContext = () => useContext(ProductContext);
