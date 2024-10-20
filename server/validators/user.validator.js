import Joi from 'joi';

// Registration validation schema
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    isVerified: Joi.boolean(),
    verificationCode: Joi.string().optional(),
    attempts: Joi.number().optional()
});

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Verification validation schema
const verifySchema = Joi.object({
    email: Joi.string().email().required(),
    verificationCode: Joi.string().required()
});

// Delete user validation schema (id validation for params)
const deleteUserSchema = Joi.object({
    id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required() // Checks for valid MongoDB ObjectId
});

export { registerSchema, loginSchema, verifySchema, deleteUserSchema };
