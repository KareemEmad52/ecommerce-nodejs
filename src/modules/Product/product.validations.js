import Joi from "joi";

export const addProductSchema = Joi.object({
    body: {
        title : Joi.string().min(2).max(200).trim().required(),
        description : Joi.string().min(10).max(1500).trim().required(),
        price : Joi.number().min(0).required(),
        priceAfterDiscount : Joi.number().optional(),
        stock : Joi.number().min(0).required(),
        category: Joi.string().hex().length(24).required(),
        subcategory: Joi.string().hex().length(24).required(),
        brand: Joi.string().hex().length(24).required(),
        createdby: Joi.string().hex().length(24).optional(),
    },
    params: {},
    query : {},
    files: Joi.object().required()
})


export const updateProductSchema = Joi.object({
    body: {
        title : Joi.string().min(2).max(200).trim(),
        description : Joi.string().min(10).max(1500).trim(),
        price : Joi.number().min(0),
        priceAfterDiscount : Joi.number().optional(),
        stock : Joi.number().min(0),
        title : Joi.string().min(2).max(100).trim(),
        category: Joi.string().hex().length(24),
        subcategory: Joi.string().hex().length(24),
        brand: Joi.string().hex().length(24),
        createdby: Joi.string().hex().length(24),
    },
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {},
    files: Joi.object().optional()
})

export const deleteProductSchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {}
})


export const getSingleProductSchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {}
})


