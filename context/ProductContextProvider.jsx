'use client';

import React, { useState } from 'react';
import { ProductContext } from './ProductContext';

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const addProduct = (product) => {
    product.id = products.length;
    setProducts([...products, product]);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
