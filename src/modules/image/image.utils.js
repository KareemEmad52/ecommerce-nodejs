import imageModel from "../../../database/models/image.model.js"
import { uploadImage } from "../../utils/image.js"

export const makeImage = async (path) => {
    const { imageName, imageUrl } = await uploadImage(path)
    return await imageModel.create({ name: imageName, path: imageUrl })
}