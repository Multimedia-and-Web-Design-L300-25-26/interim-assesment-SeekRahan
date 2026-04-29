// src/pages/landing/Company.jsx
import React from 'react';
import GenericLanding from './GenericLanding';
import heroImg from '../../assets/pictures/company_upsell.png';

const Company = () => {
    const benefits = [
        { title: "Our Mission", description: "To increase economic freedom in the world." },
        { title: "Careers", description: "Work on the future of finance. We are hiring." },
        { title: "Support", description: "Get help with your account or questions about crypto." }
    ];

  return (
    <GenericLanding 
        sectionName="Company"
        title="Building the cryptoeconomy"
        subtitle="We are building a more fair, accessible, safe, and transparent financial system."
        image={heroImg}
        benefits={benefits}
    />
  );
};

export default Company;
