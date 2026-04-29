import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { ArrowRight, Smartphone, Shield, BarChart2, Globe } from 'lucide-react';
import { getGainers } from '../api/cryptoApi';
import heroImg from '../assets/pictures/Hero__4_.avif';
import earnImg from '../assets/pictures/CB_LOLP__1_.avif';
import advancedImg from '../assets/pictures/Advanced.avif';
import learnImg from '../assets/pictures/Learn_Illustration_Ultimate_Guide_Bitcoin.avif';
import bankImg from '../assets/pictures/Replace_Bank.avif';

const CryptoRow = ({ coin }) => (
  <tr className='border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer text-sm md:text-base'>
    <td className='py-4 pl-4'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500'>
          {coin.symbol[0]}
        </div>
        <span className='font-medium'>{coin.name}</span>
        <span className='text-gray-500'>{coin.symbol}</span>
      </div>
    </td>
    <td className='py-4 text-right'>${coin.price?.toFixed(2)}</td>
    <td className={`py-4 text-right ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {coin.change24h >= 0 ? '+' : ''}{coin.change24h?.toFixed(2)}%
    </td>
    <td className='py-4 pr-4 text-right hidden md:table-cell'>
      <Button variant='primary' className='py-2 px-4 text-xs font-bold rounded'>Buy</Button>
    </td>
  </tr>
);

const Home = () => {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGainers();
  }, []);

  const fetchGainers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGainers(4);
      if (response?.success) {
        setGainers(response.data || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch gainers');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-[72px]'>
      <section className='max-w-[1180px] mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-12'>
        <div className='flex-1 space-y-6 text-center md:text-left'>
          <div className='flex items-center justify-center md:justify-start gap-2 text-blue-600 font-bold hover:underline cursor-pointer'>
            <span className='w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center'>
              <span className='w-2 h-2 rounded-full bg-blue-600'></span>
            </span>
            <span>Jump start your portfolio</span>
            <ArrowRight size={16} />
          </div>
          
          <h1 className='text-4xl md:text-6xl font-bold leading-tight tracking-tight'>
            The future of money is here
          </h1>
          
          <p className='text-gray-500 text-lg md:text-xl max-w-md mx-auto md:mx-0'>
            We're the most trusted place for people and businesses to buy, sell, and manage crypto.
          </p>
          
          <div className='flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto md:mx-0'>
             <div className='flex-1 min-w-[200px]'>
                <input
                  type='email'
                  placeholder='satoshi@nakamoto.com'
                  className='w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-600'
                />
            </div>
            <Link to="/signup">
              <Button variant='primary' className='rounded px-8 py-4 whitespace-nowrap'>
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        
        <div className='flex-1'>
          <img src={heroImg} alt='Coinbase App Interface' className='w-full max-w-md mx-auto md:max-w-full' />
        </div>
      </section>

      <section className='bg-white border-t border-gray-100 py-16'>
        <div className='max-w-[1180px] mx-auto px-4 md:px-6'>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-gray-500">Loading top gainers...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              <table className='w-full'>
                <thead className='text-gray-500 text-sm border-b border-gray-100'>
                  <tr>
                    <th className='text-left font-medium py-4 pl-4'>Name</th>
                    <th className='text-right font-medium py-4'>Price</th>
                    <th className='text-right font-medium py-4'>Change</th>
                    <th className='text-right font-medium py-4 pr-4 hidden md:table-cell'>Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {gainers.map((coin) => (
                    <CryptoRow key={coin._id || coin.symbol} coin={coin} />
                  ))}
                </tbody>
              </table>
              <div className='mt-8'>
                 <a href='/explore' className='text-blue-600 font-medium hover:underline'>View all assets &gt;</a>
              </div>
            </>
          )}
        </div>
      </section>

      <section className='py-20 bg-gray-50'>
        <div className='max-w-[1180px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-16'>
          <div className='flex-1 space-y-6 text-center md:text-left'>
            <h2 className='text-3xl md:text-4xl font-bold'>Earn up to  worth of crypto</h2>
            <p className='text-gray-500 text-lg'>Discover how specific cryptocurrencies work − and get a bit of each crypto to try out for yourself.</p>
            <Link to="/signup">
              <Button variant='primary'>Start earning</Button>
            </Link>
          </div>
          <div className='flex-1'>
             <img src={earnImg} alt='Earn Crypto' className='w-full rounded-xl shadow-lg' />
          </div>
        </div>
      </section>

      <section className='py-20 bg-white border-t border-gray-100'>
         <div className='max-w-[1180px] mx-auto px-4 md:px-6 text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>Create your cryptocurrency portfolio today</h2>
            <p className='text-gray-500 text-lg'>Coinbase has a variety of features that make it the best place to start trading</p>
         </div>

        <div className='max-w-[1180px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-16'>
          <div className='flex-1 space-y-12'>
            <div className='flex gap-4'>
               <div className='mt-1 bg-blue-500 rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0 text-white shadow-md'>
                   <BarChart2 size={24} />
               </div>
               <div className='flex flex-col gap-2'>
                   <h3 className='font-bold text-xl'>Manage your portfolio</h3>
                   <p className='text-gray-500 text-sm'>Buy and sell popular digital currencies, keep track of them in the one place.</p>
               </div>
            </div>
             <div className='flex gap-4'>
                <div className='mt-1 bg-blue-500 rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0 text-white shadow-md'>
                   <Smartphone size={24} />
               </div>
               <div className='flex flex-col gap-2'>
                   <h3 className='font-bold text-xl'>Recurring buys</h3>
                   <p className='text-gray-500 text-sm'>Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly.</p>
               </div>
            </div>
             <div className='flex gap-4'>
                <div className='mt-1 bg-blue-500 rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0 text-white shadow-md'>
                   <Shield size={24} />
               </div>
               <div className='flex flex-col gap-2'>
                   <h3 className='font-bold text-xl'>Vault protection</h3>
                   <p className='text-gray-500 text-sm'>For added security, store your funds in a vault with time delayed withdrawals.</p>
               </div>
            </div>
             <div className='flex gap-4'>
                <div className='mt-1 bg-blue-500 rounded-full p-2 h-12 w-12 flex items-center justify-center flex-shrink-0 text-white shadow-md'>
                   <Globe size={24} />
               </div>
               <div className='flex flex-col gap-2'>
                   <h3 className='font-bold text-xl'>Mobile apps</h3>
                   <p className='text-gray-500 text-sm'>Stay on top of the markets with the Coinbase app for Android or iOS.</p>
               </div>
            </div>
          </div>
          <div className='flex-1'>
             <img src={bankImg} alt='Replace Bank' className='w-full max-w-md mx-auto' />
          </div>
        </div>
      </section>

      <section className='py-20 bg-gray-900 text-white'>
          <div className='max-w-[1180px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12'>
             <div className='flex-1 space-y-6 text-center md:text-left'>
                <h2 className='text-3xl md:text-5xl font-bold'>The most trusted cryptocurrency platform</h2>
                <p className='text-gray-400 text-lg'>Here are a few reasons why you should choose Coinbase</p>

                <Link to="/signup">
                  <Button variant='primary' className='px-8 mt-4'>Get started</Button>
                </Link>
             </div>
              <div className='flex-1'>
                 <img src={advancedImg} alt='Advanced Trading' className='w-full rounded shadow-2xl opacity-90' />
             </div>
          </div>
      </section>

      <section className='py-16 bg-blue-600 text-white'>
          <div className='max-w-[1180px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-500'>
               <div className='p-4 flex flex-col items-center'>
                  <div className='text-4xl md:text-6xl font-bold mb-2'></div>
                  <div className='text-blue-200 text-base font-medium'>Quarterly volume traded</div>
              </div>
                <div className='p-4 flex flex-col items-center'>
                  <div className='text-4xl md:text-6xl font-bold mb-2'>100+</div>
                   <div className='text-blue-200 text-base font-medium'>Countries supported</div>
              </div>
                <div className='p-4 flex flex-col items-center'>
                  <div className='text-4xl md:text-6xl font-bold mb-2'>108M+</div>
                   <div className='text-blue-200 text-base font-medium'>Verified users</div>
              </div>
          </div>
      </section>

       <section className='py-20 bg-white'>
        <div className='max-w-[1180px] mx-auto px-4 md:px-6 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-16'>Get started in a few minutes</h2>
          
           <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative'>
            <div className='hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gray-200 z-0'></div>

             <div className='flex flex-col items-center gap-4 relative z-10'>
               <div className='w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg'>
                 <Globe size={32} className='text-blue-600'/>
               </div>
               <h3 className='font-bold text-lg'>Create an account</h3>
             </div>
              <div className='flex flex-col items-center gap-4 relative z-10'>
                <div className='w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg'>
                 <Smartphone size={32} className='text-blue-600'/>
               </div>
               <h3 className='font-bold text-lg'>Link your bank account</h3>
             </div>
              <div className='flex flex-col items-center gap-4 relative z-10'>
                <div className='w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-lg'>
                 <BarChart2 size={32} className='text-blue-600'/>
               </div>
               <h3 className='font-bold text-lg'>Start buying & selling</h3>
             </div>
           </div>
           
           <div className='mt-12'>
             <img src={learnImg} alt='Learn Crypto' className='mx-auto max-w-[200px] md:max-w-xs' />
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
