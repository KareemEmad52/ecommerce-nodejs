import jwt from "jsonwebtoken"
import { AppError, CatchAsyncError } from "../utils/error.handler.js";
import { userModel } from "../../database/models/user.model.js";

export const Authenticate = CatchAsyncError(async (req, res, next) => {
    const token = req.header('token')

    if (!token) throw new AppError("Unathenticated", 400)

    await jwt.verify(token, process.env.SECRET_KEY, async (error, data) => {
        try {
            const { email } = data

            const user = await userModel.findOne({ email })
            req.user = user
            next()
        } catch (error) {
            throw new AppError("Forbidden", 498)
        }
    })
})


export const Authorize = (...roles) => {
    return CatchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) throw new AppError("you are unauthorized .")
        next()
    })
}
