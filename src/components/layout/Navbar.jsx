/**
 * Navbar Component
 * Main navigation bar with dropdown menus for all product categories
 * Responsive design with mobile hamburger menu
 * Shows auth status with Profile/Logout when logged in
 *
 * @component
 * Features:
 * - Desktop dropdown navigation
 * - Mobile hamburger menu
 * - Active link highlighting
 * - Authentication status display
 * - Conditional Sign in/Get started or Profile/Logout buttons
 * - Language/Globe selector
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, LogOut } from 'lucide-react';
import Button from '../common/Button';
import logo from '../../assets/pictures/coinbaseLogoNavigation-4.svg';

const NavItem = ({ label, items }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="flex items-center gap-1 hover:text-blue-600 font-medium text-sm text-gray-900 h-full px-3 transition-colors duration-200">
        {label}
        {items && <ChevronDown size={14} className={`transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />}
      </button>
      
      {/* Dropdown Menu */}
      {items && isHovered && (
        <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-gray-100 rounded-lg p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col">
            {items.map((item, index) => (
              <Link 
                key={index} 
                to={item.href}
                className="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors group/item"
              >
                <div className="font-medium text-gray-900 group-hover/item:text-blue-600 transition-colors">{item.title}</div>
                {item.subtitle && <div className="text-xs text-gray-500 mt-0.5">{item.subtitle}</div>}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setIsOpen(false);
    navigate('/');
  };

  // Menu data structure based on user request
  const menuSections = [
    {
      id: 'crypto',
      label: 'Cryptocurrencies',
      href: '/explore',
      items: [
        { title: 'Explore', subtitle: 'View all assets', href: '/explore' },
        { title: 'Bitcoin', subtitle: 'The original crypto networks', href: '/price/bitcoin' },
        { title: 'Ethereum', subtitle: 'Global decentralized computer', href: '/price/ethereum' },
        { title: 'New assets', subtitle: 'Recently added assets', href: '/new' },
      ]
    },
    {
      id: 'individuals',
      label: 'Individuals',
      items: [
        { title: 'Buy & Sell', subtitle: 'Buy, sell, and use crypto', href: '/buy-sell' },
        { title: 'Wallet', subtitle: 'The best self-hosted crypto wallet', href: '/wallet' },
        { title: 'NFT', subtitle: 'Create, collect, and connect', href: '/nft' },
        { title: 'Card', subtitle: 'Spend crypto, earn rewards', href: '/card' },
        { title: 'Learn', subtitle: 'Tips, tutorials, and articles', href: '/learn' },
      ]
    },
    {
      id: 'businesses',
      label: 'Businesses',
      items: [
        { title: 'Institutional', subtitle: 'Institutional-grade crypto', href: '/institutional' },
        { title: 'Prime', subtitle: 'The prime brokerage platform', href: '/prime' },
        { title: 'Asset Hub', subtitle: 'List your asset on Coinbase', href: '/asset-hub' },
        { title: 'Commerce', subtitle: 'Accept crypto payments', href: '/commerce' },
      ]
    },
     {
      id: 'developers',
      label: 'Developers',
      items: [
        { title: 'Cloud', subtitle: 'Develop with crypto APIs', href: '/cloud' },
        { title: 'Wallet SDK', subtitle: 'Link your dApp to Coinbase Wallet', href: '/wallet-sdk' },
        { title: 'Coinbase Pay', subtitle: 'Easy fiat-to-crypto onramp', href: '/pay' },
        { title: 'Base', subtitle: 'Secure, low-cost L2', href: '/base' },
      ]
    },
    {
      id: 'company',
      label: 'Company',
      items: [
        { title: 'About', subtitle: 'We are building the cryptoeconomy', href: '/about' },
        { title: 'Careers', subtitle: 'Join our team', href: '/careers' },
        { title: 'Support', subtitle: 'Get help 24/7', href: '/support' },
        { title: 'Blog', subtitle: 'The latest news and updates', href: '/blog' },
      ]
    }
  ];

  return (
    <div className="fixed top-[50px] left-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center gap-8 h-full">
          <Link to="/" className="flex-shrink-0 flex items-center mr-2">
            <img src={logo} alt="Coinbase" className="h-5" />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1 h-full">
             {menuSections.map((section) => (
                <NavItem key={section.id} label={section.label} items={section.items} />
             ))}
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center hover:text-blue-600 transition-colors cursor-pointer px-2">
              <Globe size={18} />
           </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-sm font-medium hover:text-blue-600 px-3 py-2 transition-colors">
                  Profile
                </Link>
                <Button
                  variant="primary"
                  className="py-2 px-4 text-sm font-bold flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={14} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-sm font-medium hover:text-blue-600 px-3 py-2 transition-colors">Sign in</Link>
                <Link to="/signup">
                  <Button variant="primary" className="py-2 px-4 text-sm font-bold">
                    Get started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full h-[calc(100vh-122px)] bg-white overflow-y-auto border-t border-gray-100 flex flex-col z-40 pb-20">
          <div className="flex-1 flex flex-col">
             {menuSections.map((section, idx) => (
                <div key={idx} className="border-b border-gray-100">
                   <div className="p-4 font-semibold text-base flex items-center justify-between bg-white">
                       {section.label}
                       {/* Mobile drop-down logic could be added here, for now listing items or just linking */}
                   </div>
                   {section.items && (
                       <div className="bg-gray-50 flex flex-col py-2">
                           {section.items.map((item, i) => (
                               <Link key={i} to={item.href} className="px-6 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                                   <div className="font-medium text-gray-900">{item.title}</div>
                                   {/* <div className="text-xs text-gray-500">{item.subtitle}</div> */}
                               </Link>
                           ))}
                       </div>
                   )}
                </div>
             ))}
          </div>

          <div className="p-6 border-t border-gray-100 flex flex-col gap-3 bg-white mt-auto sticky bottom-0">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="w-full py-3 text-center font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-center font-medium border border-gray-200 rounded-full hover:bg-gray-50 text-sm flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full text-center py-3">
                    Get started
                  </Button>
                </Link>
                <Link to="/signin" className="w-full py-3 text-center font-medium border border-gray-200 rounded-full hover:bg-gray-50 text-sm" onClick={() => setIsOpen(false)}>
                    Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
