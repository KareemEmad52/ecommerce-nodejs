import imageModel from "../../../database/models/image.model.js";
import { CatchAsyncError } from "../../utils/error.handler.js";
import { makeImage } from "./image.utils.js";

export const attachImage = (bodyFieldName) => 
    CatchAsyncError(async (req, res, next) => {
        if (!req.file) return next()
        const image = await makeImage(req.file.path)
        req.body[bodyFieldName] = image._id
        next()
    })
