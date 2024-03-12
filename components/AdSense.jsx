// components/AdSense.js

import { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXX" // Remplacez XXXXX par votre ID client AdSense
      data-ad-slot="YYYYY" // Remplacez YYYYY par votre ID d'emplacement d'annonce
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export default AdSense;
