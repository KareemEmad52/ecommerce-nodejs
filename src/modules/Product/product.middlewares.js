import { CatchAsyncError } from "../../utils/error.handler.js";
import { makeImage } from "../image/image.utils.js";

export const attachCoverImage = () =>
    CatchAsyncError(async (req, res, next) => {
        if(!req.files.imgCover) return next()
        const image = await makeImage(req.files.imgCover[0].path)
        req.body.imgCover = image._id
        next()
    })