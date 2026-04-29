/**
 * Footer Component
 * Main footer section with company info, links, and language selector
 *
 * @component
 * Features:
 * - Company logo and description
 * - Language selection dropdown
 * - Links organized by category (Company, Support, Products)
 * - Social media links
 * - Copyright information
 */

// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/pictures/coinbaseLogoNavigation-4.svg';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      {/* Demo Disclaimer */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 mb-12 pb-8 border-b border-gray-100">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-bold">📋 Demo Project Disclaimer:</span> This is a student educational project created for learning purposes. It is not affiliated with Coinbase or any financial institution. <span className="font-bold">Do not enter real personal information, passwords, or financial data.</span> This application is a mockup and should not be used for actual cryptocurrency transactions.
          </p>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <img src={logo} alt="Coinbase" className="h-5 mb-8" />
            
            <div className="mb-6">
              <select className="border border-gray-300 rounded p-2 text-sm w-full md:w-auto min-w-[200px]">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            
            <div className="text-gray-500 text-sm space-y-4 max-w-xs">
              <p>&copy; 2024 Crypto App - Student Project</p>
              <p>Educational Demo • Not affiliated with Coinbase</p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/about" className="hover:text-blue-600 hover:underline">About</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 hover:underline">Careers</Link></li>
              <li><Link to="/affiliates" className="hover:text-blue-600 hover:underline">Affiliates</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 hover:underline">Blog</Link></li>
              <li><Link to="/press" className="hover:text-blue-600 hover:underline">Press</Link></li>
              <li><Link to="/investors" className="hover:text-blue-600 hover:underline">Investors</Link></li>
              <li><Link to="/legal" className="hover:text-blue-600 hover:underline">Legal & Privacy</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-blue-600 hover:underline">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/help" className="hover:text-blue-600 hover:underline">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 hover:underline">Contact Us</Link></li>
              <li><Link to="/account" className="hover:text-blue-600 hover:underline">Create Account</Link></li>
              <li><Link to="/id-verification" className="hover:text-blue-600 hover:underline">ID Verification</Link></li>
              <li><Link to="/account-access" className="hover:text-blue-600 hover:underline">Account Access</Link></li>
              <li><Link to="/supported-crypto" className="hover:text-blue-600 hover:underline">Supported Crypto</Link></li>
              <li><Link to="/supported-countries" className="hover:text-blue-600 hover:underline">Supported Countries</Link></li>
              <li><Link to="/status" className="hover:text-blue-600 hover:underline">Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link to="/exchange" className="hover:text-blue-600 hover:underline">Exchange</Link></li>
              <li><Link to="/prime" className="hover:text-blue-600 hover:underline">Prime</Link></li>
              <li><Link to="/commerce" className="hover:text-blue-600 hover:underline">Commerce</Link></li>
              <li><Link to="/custody" className="hover:text-blue-600 hover:underline">Custody</Link></li>
              <li><Link to="/wallet" className="hover:text-blue-600 hover:underline">Wallet</Link></li>
              <li><Link to="/card" className="hover:text-blue-600 hover:underline">Card</Link></li>
              <li><Link to="/ventures" className="hover:text-blue-600 hover:underline">Ventures</Link></li>
              <li><Link to="/nft" className="hover:text-blue-600 hover:underline">NFT</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
