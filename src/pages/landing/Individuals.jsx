// src/pages/landing/Individuals.jsx
import React from 'react';
import GenericLanding from './GenericLanding';
import heroImg from '../../assets/pictures/zero_fees_us.avif'; // Using the zero_fees image

const Individuals = () => {
  const benefits = [
    { title: "Manage your portfolio", description: "Buy and sell popular digital currencies, keep track of them in the one place." },
    { title: "Recurring buys", description: "Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly." },
    { title: "Mobile apps", description: "Stay on top of the markets with the Coinbase app for Android or iOS." }
  ];

  return (
    <GenericLanding 
        sectionName="Individuals"
        title="The easiest place to buy and sell crypto"
        subtitle="Sign up and get started today."
        image={heroImg}
        benefits={benefits}
    />
  );
};

export default Individuals;
