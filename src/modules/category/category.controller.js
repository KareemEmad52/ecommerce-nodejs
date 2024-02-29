import slugify from "slugify";
import { CatchAsyncError } from "../../utils/error.handler.js";
import { categoryModel } from "../../../database/models/category.model.js";
import { deleteOne, getAllDocuments, getSingleDocument } from "../../handlers/handlers.js";


export const addcategory = CatchAsyncError(async (req, res) => {

    req.body.slug = slugify(req.body.name)
    let category = new categoryModel(req.body)
    await category.save()
    res.status(201).json({ message: "success", category })
})

export const getAllCategory = getAllDocuments(categoryModel)

export const getsingleCategory = getSingleDocument(categoryModel)

export const updateCategory = CatchAsyncError(async (req, res) => {

    let category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !category && res.status(404).json({ message: "category not found" })
    category && res.status(200).json({ message: "success", category })
})


export const deleteCategory = deleteOne(categoryModel)