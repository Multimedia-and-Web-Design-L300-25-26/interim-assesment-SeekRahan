/**
 * Cryptocurrency Validators
 * Joi schemas for validating crypto requests
 */
import Joi from 'joi';

export const addCryptoSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).messages({
    'string.empty': 'Cryptocurrency name is required',
  }),
  symbol: Joi.string().required().min(1).max(10).uppercase().messages({
    'string.empty': 'Symbol is required',
    'string.max': 'Symbol cannot exceed 10 characters',
  }),
  price: Joi.number().required().positive().messages({
    'number.base': 'Price must be a number',
    'number.positive': 'Price must be a positive number',
  }),
  imageUrl: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Image URL must be a valid URL',
  }),
  change24h: Joi.number().required().messages({
    'number.base': '24h change must be a number',
  }),
  marketCap: Joi.number().optional().allow(null),
  volume24h: Joi.number().optional().allow(null),
});

/**
 * Validation middleware factory
 */
export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }

  req.validatedBody = value;
  next();
};
