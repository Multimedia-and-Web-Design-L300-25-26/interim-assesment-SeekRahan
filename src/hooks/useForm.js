/**
 * useForm Hook
 * A custom hook for managing form state, validation, and submission
 *
 * @param {Object} initialValues - Initial form field values
 * @param {Function} onSubmit - Callback function called on form submission
 * @returns {Object} Form state and handlers
 *
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm(
 *   { email: '', password: '' },
 *   (values) => console.log(values)
 * )
 */

import { useState } from 'react';

const useForm = (initialValues, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur if validate function provided
    if (validate) {
      const fieldErrors = validate(values);
      if (fieldErrors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: fieldErrors[name],
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (validate) {
      const newErrors = validate(values);
      setErrors(newErrors);

      // If there are errors, don't submit
      if (Object.keys(newErrors).length > 0) {
        return;
      }
    }

    // Call onSubmit callback
    if (onSubmit) {
      setIsLoading(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // Set field value
  const setFieldValue = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Set field error
  const setFieldError = (name, error) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return {
    values,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
  };
};

export default useForm;
