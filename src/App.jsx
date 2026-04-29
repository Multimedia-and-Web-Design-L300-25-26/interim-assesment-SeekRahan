/**
 * Main App Component
 * Central routing configuration for the Coinbase Clone application
 *
 * Routes include:
 * - Public pages: Home, SignIn, SignUp, Explore, Learn, AssetDetail
 * - Individuals: Buy/Sell, Wallet, NFT, Card
 * - Businesses: Institutional, Prime, Asset Hub, Commerce
 * - Developers: Cloud, Wallet SDK, Pay, Base
 * - Company: About, Careers, Support, Blog
 *
 * @component
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DisclaimerBanner from './components/common/DisclaimerBanner';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Explore from './pages/Explore';
import Learn from './pages/Learn';
import AssetDetail from './pages/AssetDetail';
import Profile from './pages/Profile';
import Individuals from './pages/landing/Individuals';
import Businesses from './pages/landing/Businesses';
import Developers from './pages/landing/Developers';
import Company from './pages/landing/Company';
import ScrollToTop from './components/common/ScrollToTop';

/**
 * Layout wrapper component for pages that need Navbar and Footer
 * @param {React.ReactNode} children - Page content to wrap
 * @returns {React.ReactNode} Wrapped layout
 */
const PageLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <DisclaimerBanner />
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Main Public Pages */}
          <Route
            path="/"
            element={
              <PageLayout>
                <Home />
              </PageLayout>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Explore and Learn Pages */}
          <Route
            path="/explore"
            element={
              <PageLayout>
                <Explore />
              </PageLayout>
            }
          />
          <Route
            path="/learn"
            element={
              <PageLayout>
                <Learn />
              </PageLayout>
            }
          />

          {/* Crypto Asset Detail Page */}
          <Route
            path="/price/:coin"
            element={
              <PageLayout>
                <AssetDetail />
              </PageLayout>
            }
          />

          {/* Protected Profile Page */}
          <Route
            path="/profile"
            element={
              <PageLayout>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </PageLayout>
            }
          />

          {/* New Assets Redirect */}
          <Route
            path="/new"
            element={
              <PageLayout>
                <Explore />
              </PageLayout>
            }
          />

          {/* Individuals Product Routes */}
          <Route
            path="/buy-sell"
            element={
              <PageLayout>
                <Individuals />
              </PageLayout>
            }
          />
          <Route
            path="/wallet"
            element={
              <PageLayout>
                <Individuals />
              </PageLayout>
            }
          />
          <Route
            path="/nft"
            element={
              <PageLayout>
                <Individuals />
              </PageLayout>
            }
          />
          <Route
            path="/card"
            element={
              <PageLayout>
                <Individuals />
              </PageLayout>
            }
          />

          {/* Businesses Product Routes */}
          <Route
            path="/institutional"
            element={
              <PageLayout>
                <Businesses />
              </PageLayout>
            }
          />
          <Route
            path="/prime"
            element={
              <PageLayout>
                <Businesses />
              </PageLayout>
            }
          />
          <Route
            path="/asset-hub"
            element={
              <PageLayout>
                <Businesses />
              </PageLayout>
            }
          />
          <Route
            path="/commerce"
            element={
              <PageLayout>
                <Businesses />
              </PageLayout>
            }
          />

          {/* Developers Product Routes */}
          <Route
            path="/cloud"
            element={
              <PageLayout>
                <Developers />
              </PageLayout>
            }
          />
          <Route
            path="/wallet-sdk"
            element={
              <PageLayout>
                <Developers />
              </PageLayout>
            }
          />
          <Route
            path="/pay"
            element={
              <PageLayout>
                <Developers />
              </PageLayout>
            }
          />
          <Route
            path="/base"
            element={
              <PageLayout>
                <Developers />
              </PageLayout>
            }
          />

          {/* Company Routes */}
          <Route
            path="/about"
            element={
              <PageLayout>
                <Company />
              </PageLayout>
            }
          />
          <Route
            path="/careers"
            element={
              <PageLayout>
                <Company />
              </PageLayout>
            }
          />
          <Route
            path="/support"
            element={
              <PageLayout>
                <Company />
              </PageLayout>
            }
          />
          <Route
            path="/blog"
            element={
              <PageLayout>
                <Company />
              </PageLayout>
            }
          />

          {/* 404 Not Found Page */}
          <Route
            path="*"
            element={
              <PageLayout>
                <div className="pt-24 text-center min-h-[50vh] flex items-center justify-center">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">
                      Page Not Found
                    </h1>
                    <p className="text-lg font-medium text-gray-500">
                      The page you are looking for doesn't exist.
                    </p>
                  </div>
                </div>
              </PageLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
