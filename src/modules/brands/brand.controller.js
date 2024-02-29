import slugify from "slugify";
import { CatchAsyncError } from "../../utils/error.handler.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { deleteOne, getSingleDocument, getAllDocuments } from "../../handlers/handlers.js";


export const addbrand = CatchAsyncError(async (req, res) => {


    req.body.slug = slugify(req.body.name)
    let brand = new brandModel(req.body)
    await brand.save()

    res.status(201).json({ message: "success", brand })
})

export const getAllbrand = getAllDocuments(brandModel)

export const getsinglebrand = getSingleDocument(brandModel)

export const updatebrand = CatchAsyncError(async (req, res) => {

    if (req.body.name) req.body.slug = slugify(req.body.name)
    let brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !brand && res.status(404).json({ message: "brand not found" })
    brand && res.status(200).json({ message: "success", brand })
})


export const deletebrand = deleteOne(brandModel)