/**
 * SignIn Page
 * User authentication page for existing Coinbase Clone users
 *
 * @component
 * Route: /signin
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Form from '../components/common/Form';
import useForm from '../hooks/useForm';
import { login } from '../api/authApi';
import logo from '../assets/pictures/coinbaseLogoNavigation-4.svg';

/**
 * Validation function for sign in form
 * @param {Object} values - Form values
 * @returns {Object} Validation errors
 */
const validateSignIn = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit: onFormSubmit,
    isLoading,
  } = useForm(
    { email: '', password: '' },
    async (values) => {
      try {
        setGeneralError(null);
        const response = await login(values.email, values.password);

        if (response?.success) {
          setSuccessMessage('Login successful! Redirecting...');
          // Store token if returned
          if (response.data?.token) {
            localStorage.setItem('authToken', response.data.token);
          }
          // Redirect to home after 1 second
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (error) {
        setGeneralError(error.message || 'Sign in failed. Please check your credentials.');
      }
    },
    validateSignIn
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(e);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo */}
      <div className="p-6 md:p-8 flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Coinbase" className="h-5" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Sign in to Crypto App</h2>
            <p className="mt-2 text-gray-600">
              Access your account to manage your crypto portfolio
            </p>
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs text-orange-800 font-semibold">
                ⚠️ Demo app – Do not use your real password
              </p>
            </div>
          </div>

          <Form
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={generalError}
            success={successMessage}
          >
            {/* Email Field */}
            <Input
              id="email"
              label="Email address"
              type="email"
              name="email"
              placeholder="satoshi@nakamoto.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              autoComplete="email"
            />

            {/* Password Field */}
            <Input
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              required
              autoComplete="current-password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember" className="text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-700">
                Create one
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
