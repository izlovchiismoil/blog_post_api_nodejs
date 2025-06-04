import Joi from "joi";

// Abstract schemas
export const idSchema = Joi.object({
    id: Joi.number().required()
});

// Users schemas
export const createUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userRoleId: Joi.number().required(),
    username: Joi.string().min(2).required(),
    password: Joi.string().min(4).max(30).required(),
    reEnterPassword: Joi.string().min(4).max(30).required(),
    profileImage: Joi.string().optional()
});
export const updateUserSchema = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    userRole: Joi.string().optional(),
    username: Joi.string().optional().min(2).max(30),
    oldPassword: Joi.string().optional().min(4).max(30),
    newPassword: Joi.string().optional().min(4).max(30),
    profileImage: Joi.string().optional()
}).min(1);

// Posts schemas
export const createPostSchema = Joi.object({
    title: Joi.string().required(),
    shortTitle: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().required(),
    postImage: Joi.string().optional()
});
export const updatePostSchema = Joi.object({
    title: Joi.string().optional(),
    shortTitle: Joi.string().optional(),
    content: Joi.string().optional(),
    authorId: Joi.number().required(),
    categoryId: Joi.number().optional(),
    postImage: Joi.string().optional()
});

// Categories schemas
export const createCategorySchema = Joi.object({
    title: Joi.string().required()
});
export const updateCategorySchema = Joi.object({
    title: Joi.string().optional()
}).min(1);

// Comments schemas
export const createCommentSchema = Joi.object({
    commenterName: Joi.string().min(2).required(),
    content: Joi.string().min(2).required(),
    postId: Joi.number().required()
});