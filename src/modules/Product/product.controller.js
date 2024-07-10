import slugify from "slugify";
import { CatchAsyncError } from "../../utils/error.handler.js";
import { productModel } from "../../../database/models/product.model.js";
import { deleteOne, getSingleDocument } from "../../handlers/handlers.js";
import imageOnProductModel from "../../../database/models/imageOnProduct.model.js";
import { Apifeature } from "../../utils/apiFeature.js";
import { makeImage } from "../image/image.utils.js";



export const addproduct = CatchAsyncError(async (req, res, next) => {

    req.body.slug = slugify(req.body.title)
    let product = new productModel(req.body)
    await product.save()

    console.log(req.files.images);
    await Promise.all(req.files.images.map(async (file) => {
        try {
            const image = await makeImage(file.path)
            await imageOnProductModel.create({
                image_id: image._id,
                product_id: product._id
            })
        } catch (error) { return next(error) }
    }))

    res.status(201).json({ message: "product added successfully ", product })
})

export const getAllproduct = CatchAsyncError(async (req, res) => {
    // Create an instance of Apifeature with pagination, sorting, searching, and filtering
    let apifeature = new Apifeature(productModel.find(), req.query).pagination(10).sort().search().filter();

    // Execute the query to get the documents
    let document = await apifeature.mongooseQuery;

    // Get the total count of documents without pagination
    const totalDocuments = await productModel.countDocuments();

    // Calculate the number of pages
    const totalPages = Math.ceil(totalDocuments / 10);

    // Check if documents are found and send the response with the number of pages
    if (!document) {
        res.status(404).json({ message: "document not found" });
    } else {
        res.status(200).json({ message: "success", document, totalPages : totalPages });
    }
});


export const getsingleproduct = getSingleDocument(productModel)

export const updateproduct = CatchAsyncError(async (req, res) => {

    if (req.files?.images) {
        const product = await productModel.findById(req.params.id)
        await Promise.all(
            product.images.map(async (image) => {
                try {
                    await imageOnProductModel.findByIdAndDelete(image._id)
                } catch (error) { return next(error) }
            })
        )

        await Promise.all(req.files.images.map(async (file) => {
            try {
                const image = await makeImage(file.path)
                await imageOnProductModel.create({
                    image_id: image._id,
                    product_id: product._id
                })
            } catch (error) { return next(error) }
        }))

    }

    if (req.body.title) req.body.slug = slugify(req.body.title)
    let product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    !product && res.status(404).json({ message: "product not found" })
    product && res.status(200).json({ message: "success", product })
})


export const deleteproduct = deleteOne(productModel)