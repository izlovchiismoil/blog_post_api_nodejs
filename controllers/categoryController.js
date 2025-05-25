import models from '../models/indexModel.js';

export async function createCategory(req, res) {
    try {
        const requestCategoryData = req.body.category;
        if (!requestCategoryData) {
            return res.status(400).json({
                error: "Category params not found",
            });
        }
        const category = await models.category.findOne({
            where: {
                title: requestCategoryData.title
            },
            raw: true
        });
        if (category) {
            return res.status(409).json({
                error: "Category already exists"
            });
        }
        const createdCategory = await models.category.create({
            title: requestCategoryData.title
        });
        return res.status(201).json({
            createdCategory
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getAllCategories(req, res) {
    try {
        const categories = await models.category.findAll({ raw: true });
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        return res.status(200).json({
            categories
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function getCategoryById(req, res) {
    try {
        const requestCategoryId = req.params.id;
        const category = await models.category.findByPk(requestCategoryId, { raw: true });
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        return res.status(200).json({
            category
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function updateCategory(req, res) {
    try {
        const requestCategoryId = req.params.id;
        const requestCategoryData = req.body.category;
            const category = await models.category.findByPk(requestCategoryId, { raw: true });
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        await models.category.update(
            { ...requestCategoryData },
            {
                where: { id: requestCategoryId }
            }
        );
        const updatedCategory = await models.category.findByPk(requestCategoryId);
        return res.status(200).json({
            updatedCategory
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}
export async function deleteCategory(req, res) {
    try {
        const requestCategoryId = req.params.id;
        const category = await models.category.findByPk(requestCategoryId);
        if (!category) {
            return res.status(404).json({
                error: "Category not found"
            });
        }
        await models.category.destroy({
            where: {
                id: requestCategoryId
            }
        });
        return res.status(200).json({
            category
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message
        });
    }
}