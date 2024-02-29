import { productModel } from "../../database/models/product.model.js"
import { AppError, CatchAsyncError } from "../utils/error.handler.js"

export const uniqueTitle = CatchAsyncError(async (req, res, next) => {
    const { title } = req.body
    const user = await productModel.findOne({ title })
    if (user) {
        throw new AppError("Title already exists", 400)
    } else {
        next()
    }
})