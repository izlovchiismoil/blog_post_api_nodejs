import models from '../models/indexModel.js';

export async function createCategory(req, res) {
    try {
        const requestCategoryData = req.body.category;
        if (!requestCategoryData) {
            return res.status(400).send({
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
                error: 'Category already exists'
            });
        }
        const newCategory = await models.category.create({
            title: requestCategoryData.title
        });
        return res.status(201).json({
            data: newCategory
        });
    }
    catch (err) {
        console.log(err);
    }
}
export async function getAllCategories(req, res) {
    try {
        const categories = await models.category.findAll({ raw: true });
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }
        return res.status(200).json({
            data: categories
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
}
export async function getCategoryById(req, res) {
    try {
        const requestCategoryId = req.params.id;
        const category = await models.category.findByPk(requestCategoryId, { raw: true });
        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }
        return res.status(200).json({
            data: category
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong'
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
                error: 'Category not found'
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
            data: updatedCategory
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: 'Something went wrong'
        });
    }
}
export async function deleteCategory(req, res) {
    try {
        const requestCategoryId = req.params.id;
        const category = await models.category.findByPk(requestCategoryId);
        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }
        await models.category.destroy({
            where: {
                id: requestCategoryId
            }
        });
        return res.status(200).json({
            data: category
        });
    }
    catch (err) {
        console.log(err);
    }
}