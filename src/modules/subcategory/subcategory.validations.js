import Joi from "joi";

export const addSubCategorySchema = Joi.object({
    body: {
        name: Joi.string().min(2).max(100).trim().required(),
        category: Joi.string().hex().length(24).required()
    },
    params: {},
    query: {}
})


export const updateSubCategorySchema = Joi.object({
    body: {
        name: Joi.string().min(2).max(100).trim(),
        category: Joi.string().hex().length(24)
    },
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query: {}
})

export const deleteSubCategorySchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query: {}
})


export const getSingleSubCategorySchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query: {}
})



