// src/pages/landing/GenericLanding.jsx
import React from 'react';
import Button from '../../components/common/Button';

const GenericLanding = ({ title, subtitle, image, benefits, sectionName }) => {
  return (
    <div className="pt-[72px] min-h-screen">
      {/* Hero */}
      <div className="bg-white">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6">
                <span className="text-blue-600 font-bold uppercase tracking-wide text-sm">{sectionName}</span>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900">
                    {title}
                </h1>
                <p className="text-gray-500 text-xl max-w-lg">
                    {subtitle}
                </p>
                <div className="pt-4 flex gap-4">
                    <Button variant="primary">Get started</Button>
                    <Button variant="outline">Contact sales</Button>
                </div>
           </div>
           
           <div className="flex-1">
               {image ? (
                   <img src={image} alt={title} className="w-full rounded-xl shadow-lg" />
               ) : (
                   <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                       Image Placeholder
                   </div>
               )}
           </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-20">
          <div className="max-w-[1180px] mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold text-center mb-16">Why choose Coinbase for {sectionName}?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                      <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg mb-6 flex items-center justify-center text-blue-600 font-bold text-xl">
                              {index + 1}
                          </div>
                          <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                          <p className="text-gray-500">{benefit.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default GenericLanding;
