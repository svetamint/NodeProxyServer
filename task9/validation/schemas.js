import Joi from 'joi'

export const imageRequestSchema = Joi.object().keys({
  userId: Joi.number().integer().required().messages({
    'number.base': 'User ID must be a number.',
    'number.integer': 'User ID must be an integer.',
    'any.required': 'User ID is required.'
  }),
  userName: Joi.string().required().messages({
    'string.base': 'User Name must be a string.',
    'any.required': 'User Name is required.'
  }),
  userApiKey: Joi.string().required().messages({
    'string.base': 'API Key must be a string.',
    'any.required': 'API Key is required.'
  })
})

export const meteorQuerySchema = Joi.object().keys({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Date must be in the format YYYY-MM-DD'
    }),
  count: Joi.boolean().optional().messages({
    'boolean.base': 'count must be a boolean'
  }),
  wereDangerousMeteors: Joi.boolean().optional().messages({
    'boolean.base': 'wereDangerousMeteors must be a boolean'
  })
})
