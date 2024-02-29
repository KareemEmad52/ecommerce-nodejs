import { userModel } from "../../../database/models/user.model.js"
import { CatchAsyncError } from "../../utils/error.handler.js"


export const getWishlist = CatchAsyncError(async (req, res) => {
	const { wishlist } = await userModel.findById(req.user.id)
	res.json({ wishlist })
})

export const updateWishlist = CatchAsyncError(async (req, res) => {
	const { product_id } = req.body
	const user = await userModel.findById(req.user.id)

	const indexOfProduct = user.wishlist.findIndex(
		({ _id }) => _id.toString() === product_id
	)

	if (indexOfProduct === -1) user.wishlist.push(product_id)
	else user.wishlist.splice(indexOfProduct, 1)

	await user.save()

	res.json({ message: 'Wishlist updated successfully' })
})
