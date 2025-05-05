import models from '../models/indexModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';

export async function createPost (req, res) {
    try {
        const requestPostData = req.body.post;
        const user = await models.user.findByPk(requestPostData.authorId);
        if (!user) {
            return res.status(400).send({
                error: 'User not found'
            });
        }
        const category = await models.category.findByPk(requestPostData.categoryId);
        if (!category) {
            return res.status(400).send({
                error: 'Category not found'
            });
        }
        const createdPost = await models.post.create(requestPostData);
        if (!createdPost) {
            return res.status(422).json({
                error: 'Post not created'
            });
        }
        return res.status(201).json({
            createdPost
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function updatePost (req, res) {
    try {
        const requestPostId = req.params.id;
        const requestPostData = req.body.post;
        const post = await models.post.findByPk(requestPostId);
        if (!post) {
            return res.status(4404).json({
                error: 'Post not found'
            });
        }
        await models.post.update(
            { ...requestPostData },
            {
                where: { id: requestPostId }
            }
            );
        const updatedPost = await models.post.findByPk(requestPostId);
        return res.status(201).json({
            updatedPost
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function deletePost (req, res) {
    try {
        const requestPostId = req.params.id;
        const post = await models.post.findByPk(requestPostId);
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        await models.post.destroy({
            where: { id: requestPostId }
        });
        return res.status(204).json({
            message: 'Post deleted successfully'
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getAllPosts (req, res) {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Category,
                    attributes: ['id', 'title']
                }
            ]
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        return res.status(200).json({
            posts
        });
    }
    catch (err) {
        console.error(err);
    }
}
export async function getPostById (req, res) {
    try {
        const requestPostId = req.params.id;
        const post = await models.post.findByPk(requestPostId, {
            include: [{
                model: User,
                key: "id"
            }],
            raw: true,
            nest: true
        });
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        return res.status(200).json({
            post
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}