import models from "../models/indexModel.js";

export async function createComment (req, res) {
    try {
        const requestCommentData = req.body.comment;
        const post = await models.post.findByPk(requestCommentData.postId);
        if (!post) {
            return res.status(400).json({
                error: "Post not found"
            });
        }
        const createdComment = await models.comment.create(requestCommentData);
        if (!createdComment) {
            return res.status(422).json({
                error: "Comment not created"
            });
        }
        return res.status(201).json({
            data: createdComment
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err.message
        });
    }
}

export async function getAllComments (req, res) {
    try {
        const comments = await models.comment.findAll({ raw: true });
        if (!comments || comments.length === 0) {
            return res.status(404).json({
                error: "No comments found."
            });
        }
        return res.status(200).json({
            data: comments
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err.message
        });
    }
}

export async function getCommentById (req, res) {
    try {
        const commentId = req.params.id;
        const comment = await models.comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({
                error: "Comment not found."
            });
        }
        return res.status(200).json({
            data: comment
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err.message
        });
    }
}

export async function getAllCommentsByPostId (req, res) {
    try {
        const postId = req.params.id;
        const post = await models.post.findByPk(postId);
        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }
        const comments = await models.comment.findAll({
            where: { postId },
            raw: true
        });
        if (!comments || comments.length === 0) {
            return res.status(404).json({
                error: "No comments found."
            });
        }
        return res.status(200).json({
            data: comments
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err.message
        });
    }
}