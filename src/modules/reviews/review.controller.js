import { productModel } from "../../../database/models/product.model.js";
import { AppError, CatchAsyncError } from "../../utils/error.handler.js";
import reviewModel from "../../../database/models/review.model.js";
import { Apifeature } from "../../utils/apiFeature.js";


export const getReviews = CatchAsyncError(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) throw new AppError('Invalid productId !', 400)

    const apiFeature = new Apifeature(reviewModel.find(), req.query).pagination(2)


    const review = await apiFeature.mongooseQuery
    res.status(200).json(review)
})

export const addReview = CatchAsyncError(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) throw new AppError('Invalid productId !', 400)
    const addedReview = await reviewModel.findOne({
        user_id: req.user._id,
        product_id: id
    })
    if (addedReview) throw new AppError('user Already added a review ', 400)

    const review = await reviewModel.create({
        ...req.body,
        user_id: req.user._id,
        product_id: id
    })
    res.status(200).json({ review })
})

export const updateReview = CatchAsyncError(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) throw new AppError('Invalid productId !', 400)
    const addedReview = await reviewModel.findOne({
        user_id: req.user._id,
        product_id: id
    })
    if (!addedReview) throw new AppError('review does\'t exist ', 400)

    const review = await reviewModel.findOneAndUpdate({
        user_id: req.user._id,
        product_id: id
    },
        req.body, {
            new: true
    }
    )

    if (!review) throw new AppError('review not found', 400)
    res.status(200).json({ review })
})


export const deleteReview = CatchAsyncError(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) throw new AppError('Invalid productId !', 400)
    const addedReview = await reviewModel.findOne({
        user_id: req.user._id,
        product_id: id
    })
    if (!addedReview) throw new AppError('review does\'t exist ', 400)

    const review = await reviewModel.findOneAndDelete({
        user_id: req.user._id,
        product_id: id
    })

    if (!review) throw new AppError('review not found', 400)
    res.status(200).json({ review })
})