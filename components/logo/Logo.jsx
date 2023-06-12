import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src='/img/logo.svg'
      alt='logo'
      width={77}
      height={77}
    />
  );
};

export default Logo;
