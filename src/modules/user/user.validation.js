import Joi from "joi";

export const adduserSchema = Joi.object({
    body: {
        name: Joi.string().min(2).max(150).trim().required(),
        password: Joi.string().min(8).max(150).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    },
    params: {},
    query: {},
    file : Joi.object().optional()
})


export const loginSchema = Joi.object({
    body: {
        password: Joi.string().min(8).max(150).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    },
    params: {},
    query: {}
})

export const updateUserSchema = Joi.object({
    body: {
        name: Joi.string().min(2).max(150).trim().optional(),
        password: Joi.string().min(8).max(150).optional(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),

    },
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query: {}
})

export const delateUserSchema = Joi.object({
    body: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
    query: {}
})