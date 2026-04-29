/**
 * SignUp Page
 * User registration page for new Coinbase Clone users
 *
 * @component
 * Route: /signup
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Form from '../components/common/Form';
import useForm from '../hooks/useForm';
import { register } from '../api/authApi';
import logo from '../assets/pictures/coinbaseLogoNavigation-4.svg';

/**
 * Validation function for sign up form
 * @param {Object} values - Form values
 * @returns {Object} Validation errors
 */
const validateSignUp = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must accept the terms and conditions';
  }

  return errors;
};

const SignUp = () => {
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
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      termsAccepted: false,
    },
    async (values) => {
      try {
        setGeneralError(null);
        const response = await register(
          values.firstName,
          values.lastName,
          values.email,
          values.password
        );

        if (response?.success) {
          setSuccessMessage('Account created successfully! Redirecting to sign in...');
          setTimeout(() => {
            navigate('/signin');
          }, 2000);
        }
      } catch (error) {
        setGeneralError(error.message || 'Sign up failed. Please try again.');
      }
    },
    validateSignUp
  );

  const navigate = useNavigate();

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
        <Link to="/signin" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Sign In
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">
              Join millions of users building their crypto portfolio
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
            {/* First Name & Last Name */}
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  id="firstName"
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="Satoshi"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName}
                  required
                />
              </div>
              <div className="flex-1">
                <Input
                  id="lastName"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Nakamoto"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <Input
              id="email"
              label="Email"
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
              placeholder="Create a strong password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              required
              autoComplete="new-password"
            />

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <input
                id="termsAccepted"
                type="checkbox"
                name="termsAccepted"
                checked={values.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer mt-1"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-600 cursor-pointer">
                I certify that I am 18 years of age or older, and agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  User Agreement
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500">{errors.termsAccepted}</p>
            )}

            {/* Create Account Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Creating account...' : 'Create free account'}
            </Button>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/signin" className="text-blue-600 font-medium hover:text-blue-700">
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
