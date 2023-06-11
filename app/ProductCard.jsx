import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className='border shadow hover:shadow-md cursor-pointer transition rounded-md flex flex-col items-center justify-center gap-2 p-5'>
      <p className='text-green-600 text-center text-lg'>{product.name}</p>
      <p className='text-slate-500 text-center'>{product.price} $</p>
    </div>
  );
};

export default ProductCard;
