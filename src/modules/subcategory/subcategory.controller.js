import slugify from "slugify";
import { CatchAsyncError } from "../../utils/error.handler.js";
import { subcategoryModel } from "../../../database/models/subcategory.model.js";
import { deleteOne, getAllDocuments, getSingleDocument } from "../../handlers/handlers.js";
import { Apifeature } from "../../utils/apiFeature.js";



export const addSubcategory = CatchAsyncError(async (req, res) => {

    req.body.slug = slugify(req.body.name)
    let subcategory = new subcategoryModel(req.body)
    await subcategory.save()

    res.status(201).json({ message: "success", subcategory })
})

export const getAllsubcategory = CatchAsyncError(async (req, res) => {

    let filterObj = {}

    if (req.params.id) {
        
        filterObj.category = req.params.id
    }
    
    let apifeature = new Apifeature(subcategoryModel.find(filterObj), req.query).pagination().sort().search().filter()

    let document = await apifeature.mongooseQuery.populate("category")
    !document && res.status(404).json({ message: "document not found" })
    document && res.status(200).json({ message: "success", document })
})

export const getsinglesubcategory = getSingleDocument(subcategoryModel)

export const updatesubcategory = CatchAsyncError(async (req, res) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let subcategory = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !subcategory && res.status(404).json({ message: "subcategory not found" })
    subcategory && res.status(200).json({ message: "success", subcategory })
})


export const deletesubcategory = deleteOne(subcategoryModel)