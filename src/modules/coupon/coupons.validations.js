import Joi from 'joi'


export const addCouponSchema = Joi.object({
	body: {
		code: Joi.string().min(3).max(200).trim().required(),
		expiry: Joi.date().required(),
		discount: Joi.number().required(),
	},
	params: {},
	query: {},
})

export const updateCouponSchema = Joi.object({
	body: {
		code: Joi.string().min(3).max(200).trim(),
		expiry: Joi.date(),
		discount: Joi.number(),
	},
	params: {
		couponId: Joi.string().hex().length(24),
	},
	query: {},
})

export const getCouponSchema = Joi.object({
	body: {},
	params: {
		couponId: Joi.string().hex().length(24),
	},
	query: {},
})

export const deleteCouponSchema = Joi.object({
	body: {},
	params: {
		couponId: Joi.string().hex().length(24),
	},
	query: {},
})
