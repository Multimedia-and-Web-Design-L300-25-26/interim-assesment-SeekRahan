// src/pages/landing/Developers.jsx
import React from 'react';
import GenericLanding from './GenericLanding';
import heroImg from '../../assets/pictures/developers_upsell_cdxv2_2.jpg';

const Developers = () => {
    const benefits = [
        { title: "Cloud APIs", description: "Build crypto applications with our powerful APIs and SDKs." },
        { title: "Sign in with Coinbase", description: "The easiest way to onboard your users to crypto." },
        { title: "Wallet SDK", description: "Link your dApp to Coinbase Wallet for a seamless experience." }
    ];

  return (
    <GenericLanding 
        sectionName="Developers"
        title="Build the future of finance"
        subtitle="The most powerful tools for building in the cryptoeconomy."
        image={heroImg}
        benefits={benefits}
    />
  );
};

export default Developers;
