import Joi from "joi";

export const addCategorySchema = Joi.object({
    body: {
        name : Joi.string().min(2).max(100).trim().required(),
    },
    params: {},
    query : {},
    file : Joi.object().required()
})


export const updateCategorySchema = Joi.object({
    body: {
        name : Joi.string().min(2).max(100).trim().optional()
    },
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {},
    file : Joi.object().optional()
})

export const deleteCategorySchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {},
    
})


export const getSingleCategorySchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {}
})


