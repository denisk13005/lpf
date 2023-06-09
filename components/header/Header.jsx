import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
         
          <Link href={"/"}> home</Link>
          <Link href={"/login"}> login</Link>
    </header>
  );
};

export default Header;