import Joi from 'joi'

export const updateWishlistSchema = Joi.object({
    body: {
        product_id: Joi.string().hex().length(24).required(),
    },
    params: {},
    query: {},
})
