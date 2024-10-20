import Joi from 'joi';

// Create Task validation schema
const createTaskSchema = Joi.object({
    title: Joi.string().min(3).required(),
    priority: Joi.string().valid('low', 'medium', 'high'),
    dueDate: Joi.date().required()
});

// Update Task validation schema
const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).optional(),
    dueDate: Joi.date().optional(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    status: Joi.string().valid('pending', 'in-progress', 'completed').optional() // Assuming task has a status field
});

// Update Task Status validation schema
const updateStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'completed').required(),

});

// Validate task id in params (to check MongoDB ObjectId validity)
const taskIdSchema = Joi.object({
    id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required()
});

export { createTaskSchema, updateTaskSchema, updateStatusSchema, taskIdSchema };
