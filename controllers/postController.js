import { Op } from "sequelize";
import models from "../models/indexModel.js";


export async function createPost (req, res) {
    try {
        const requestAuthorId = req.user.id;
        const requestPostData = req.body;
        console.log("Foydalanuvchi ID si:  ", requestAuthorId);
        if (!requestAuthorId || !requestPostData) {
            return res.status(400).json({
                error: "Post params not found."
            });
        }
        const user = await models.user.findByPk(requestAuthorId);
        if (!user) {
            return res.status(404).json({
                error: "User of post not found"
            });
        }
        const category = await models.category.findByPk(requestPostData.categoryId);
        if (!category) {
            return res.status(404).json({
                error: "Post of category not found"
            });
        }
        requestPostData.authorId = requestAuthorId;
        const createdPost = await models.post.create(requestPostData);
        if (!createdPost) {
            return res.status(422).json({
                error: "Post not created"
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
        const requestPostData = req.body;
        console.log(requestPostData);
        const post = await models.post.findByPk(requestPostId);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        await models.post.update(
            { ...requestPostData },
            {
                where: { id: requestPostId }
            }
            );
        const updatedPost = await models.post.findByPk(requestPostId,{
            include: [
                {
                    model: models.user,
                    key: "id",
                    attributes: { exclude: ["password", "createdAt", "updatedAt", "profileImage"] }
                }
            ]
        });
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
                error: "Post not found"
            });
        }
        await models.post.destroy({
            where: { id: requestPostId }
        });
        return res.status(204).json({
            message: "Post deleted successfully"
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
        const posts = await models.post.findAll({
            include: [
                {
                    model: models.user,
                    key: "id",
                    attributes: { exclude: ["password"] }
                },
                {
                    model: models.category,
                    key: "id"
                }
            ],
            raw: true,
            nest: true
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json({
            posts
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getPostById (req, res) {
    try {
        const requestPostId = req.params.id;
        const post = await models.post.findByPk(requestPostId, {
            include: [
                {
                    model: models.user,
                    key: "id",
                    attributes: { exclude: ["password", "createdAt", "updatedAt", "profileImage"] }
                },
                {
                    model: models.category,
                    key: "id",
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            ],
            raw: true,
            nest: true
        });
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
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
export async function getPostsByAuthorId (req, res) {
    try {
        const requestAuthorId = req.params.id;
        if (!requestAuthorId) {
            return res.status(400).json({
                error: "Author params not found"
            });
        }
        const posts = await models.post.findAll({
            where: { authorId: requestAuthorId },
            include: [
                {
                    model: models.user,
                    key: "id",
                },
                {
                    model: models.category,
                    key: "id"
                }
            ],
            raw: true,
            nest: true
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                error: "Posts not found"
            });
        }
        return res.status(200).json({
            posts
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getPostsByCategoryId (req, res) {
    try {
        const requestCategoryId = parseInt(req.params.id);
        const posts = await models.post.findAll({
            where: { categoryId: requestCategoryId },
            include: [
                {
                    model: models.user,
                    key: "id",
                    attributes: { exclude: ["password", "createdAt", "updatedAt", "profileImage"] }
                },
                {
                    model: models.category,
                    key: "id",
                    attributes: {exclude: ["createdAt", "updatedAt"] }
                }
            ],
            raw: true,
            nest: true
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        return res.status(200).json({
            posts
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getPostsOfCategoryOfUser (req, res) {
    try {
        const { id } = req.params;
        const { categoryId } = req.query;
        if (!id || !categoryId) {
            return res.status(400).json({
                error: "Params of category or author not found"
            });
        }
        const posts = await models.post.findAll({
            where: {
                [Op.and] : [
                    {
                        authorId: id
                    },
                    {
                        categoryId: categoryId
                    }
                ]
            },
            include: [
                {
                    model: models.user,
                    key: "id"
                },
                {
                    model: models.category,
                    key: "id",
                    attributes: {exclude: ["createdAt", "updatedAt"] }
                }
            ],
            raw: true,
            nest: true
        });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                error: "Posts not found"
            });
        }
        return res.status(200).json({
            posts
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getPostsByPagination (req, res) {
    try {
        const currentPage = parseInt(req.query.currentPage) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const offset = (currentPage - 1) * limit;

        const { count, rows } = await models.post.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        }, { raw: true });
        if ((!count && !rows) || count === 0) {
            return res.status(404).json({
                error: "Posts not found"
            });
        }
        return res.status(200).json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage,
            posts: rows
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: err.message
        });
    }
}