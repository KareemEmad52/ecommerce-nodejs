import Joi from "joi";

export const addBrandSchema = Joi.object({
    body: {
        name : Joi.string().min(2).max(100).trim().required()
    },
    params: {},
    query : {},
    file : Joi.object().required()
})


export const updateBrandSchema = Joi.object({
    body: {
        name : Joi.string().min(2).max(100).trim()
    },
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {},
    file : Joi.object().optional()
})

export const deleteBrandSchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {}
})


export const getSingleBrandSchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query : {}
})



