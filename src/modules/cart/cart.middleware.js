import cartModel from "../../../database/models/cart.model.js"
import { CatchAsyncError } from "../../utils/error.handler.js"


export const assertCart = CatchAsyncError(async (req, res, next) => {
	// console.log("heree");
	const cart = await cartModel.findOne({ user_id: req.user.id })
	if (cart) return next()

	await cartModel.create({ user_id: req.user.id, products: [] })
	next()
})
