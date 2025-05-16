import Joi from "joi";

// Abstract schemas
export const idSchema = Joi.object({
    id: Joi.number().required()
});

// Users schemas
export const createUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required(),
    username: Joi.string().pattern(/^[a-zA-Z]+([0-9]+|[a-zA-Z]+)$/).required(),
    password: Joi.string().min(6).max(30).required(),
    imageUrl: Joi.string().optional()
});
export const updateUserSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    role: Joi.string().optional(),
    username: Joi.string().pattern(/^[a-zA-Z]+([0-9]+|[a-zA-Z]+)$/).optional(),
    oldPassword: Joi.string().optional().min(6).max(30),
    newPassword: Joi.string().optional().min(6).max(30),
    imageUrl: Joi.string().optional()
}).min(1);

// Posts schemas
export const createPostSchema = Joi.object({
    title: Joi.string().required(),
    shortTitle: Joi.string().required(),
    content: Joi.string().required(),
    authorId: Joi.number().required(),
    categoryId: Joi.number().required(),
    imageUrl: Joi.string().uri().required()
});
export const updatePostSchema = Joi.object({
    title: Joi.string().optional(),
    shortTitle: Joi.string().optional(),
    content: Joi.string().optional(),
    authorId: Joi.number().required(),
    categoryId: Joi.number().optional(),
    imageUrl: Joi.string().uri().optional()
});

// Categories schemas
export const createCategorySchema = Joi.object({
    title: Joi.string().required()
});
export const updateCategorySchema = Joi.object({
    title: Joi.string().required()
});

// Comments schemas
export const createCommentSchema = Joi.object({
    commenterName: Joi.string().min(2).required(),
    content: Joi.string().min(2).required(),
    postId: Joi.number().required()
});