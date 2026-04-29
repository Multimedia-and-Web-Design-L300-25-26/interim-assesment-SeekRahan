// src/pages/landing/Businesses.jsx
import React from 'react';
import GenericLanding from './GenericLanding';
import heroImg from '../../assets/pictures/institutions_upsell.png';

const Businesses = () => {
    const benefits = [
        { title: "Institutional Grade", description: "A complete suite of products for institutional investors." },
        { title: "Accept Crypto", description: "Accept cryptocurrency payments on your website in minutes." },
        { title: "Asset Hub", description: "List your asset on Coinbase and reach millions of customers." }
    ];

  return (
    <GenericLanding 
        sectionName="Businesses"
        title="Powering the crypto economy for businesses"
        subtitle="Trusted by thousands of institutions and businesses."
        image={heroImg}
        benefits={benefits}
    />
  );
};

export default Businesses;
