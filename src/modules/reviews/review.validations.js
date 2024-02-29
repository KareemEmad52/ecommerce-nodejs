import Joi from 'joi'

export const getReviewSchema = Joi.object({
	body: {},
	params: {
		id: Joi.string().hex().length(24),
	},
	query: {},
})

export const addReviewSchema = Joi.object({
	body: {
		text: Joi.string().min(3).max(200).trim().required(),
		rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
	},
	params: {
		id: Joi.string().hex().length(24),
	},
	query: {},
})

export const updateReviewSchema = Joi.object({
	body: {
		text: Joi.string().min(3).max(200).trim(),
		rating: Joi.number().valid(1, 2, 3, 4, 5),
	},
	params: { id: Joi.string().hex().length(24) },
	query: {},
})

export const deleteReviewSchema = Joi.object({
	body: {},
	params: { id: Joi.string().hex().length(24) },
	query: {},
})
