/**
 * Learn Page
 * Educational content and crypto tutorials for users
 *
 * @component
 * Route: /learn
 */

import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import learnHero from '../assets/pictures/Learn_Illustration_Ultimate_Guide_Bitcoin.avif';
import image1 from '../assets/pictures/image.avif';

/**
 * Article Card Component
 * Displays a single learning article with image, category, title, and read time
 * @param {Object} props - Component props
 * @returns {React.ReactNode} Article card
 */
const ArticleCard = ({ category, title, time, image }) => (
  <Card
    image={image}
    imageAlt={title}
    badge={category}
    title={title}
    subtitle={`${time} read`}
    variant="default"
    hoverable
  />
);

const Learn = () => {
  // Mock data for articles
  const articles = [
    { category: "Crypto Basics", title: "What is Bitcoin?", time: "4 min", image: learnHero },
    { category: "Crypto Basics", title: "What is Ethereum?", time: "3 min", image: null },
    { category: "Trading", title: "How to trade crypto", time: "5 min", image: image1 },
    { category: "Security", title: "How to keep your crypto safe", time: "6 min", image: null },
    { category: "Market Updates", title: "Weekly market recap", time: "2 min", image: null },
    { category: "Advanced", title: "What is DeFi?", time: "7 min", image: null },
  ];

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-blue-600 text-white py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="text-blue-200 font-bold tracking-wide uppercase">
              Crypto Tips & Tutorials
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn everything about crypto
            </h1>
            <p className="text-blue-100 text-lg max-w-lg">
              Whether you're a beginner or an expert, we have articles to help
              you understand the market.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 border-none">
              Start learning
            </Button>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={learnHero}
              alt="Learn Crypto"
              className="w-full max-w-sm rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="md">
            View all articles
          </Button>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Stay up to date</h2>
          <p className="text-gray-500">
            Get the latest crypto news and updates delivered to your inbox.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              required
            />
            <Button variant="primary" type="submit" size="md">
              Subscribe
            </Button>
          </form>
          {subscribed && (
            <p className="text-green-600 text-sm">
              ✓ Thanks for subscribing!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;
