import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product title']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'too short product description'],
        maxLength: [500, 'too long product description']
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    sold: {
        type: Number,
        min: 0,
        default: 0
    },
    rateCount: {
        type: Number,
        min: 0,
        default: 0
    },
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    imgCover: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand"
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

schema.pre(/find/i, function (next) {
    this.populate('imgCover', ['path'])
    next()
})

schema.virtual('images', {
    ref: 'imageOnProduct',
    localField: '_id',
    foreignField: 'product_id'
})

schema.pre(/find/, function (next) {
    this.populate('images', ['image_id', '-product_id'])
    next()
})


schema.pre(/delete/i, async function (next) {
    const toBeDeletedProduct = await productModel.findOne(this._conditions)
    if (!toBeDeletedProduct) return next()

    await mongoose.model('image').findByIdAndDelete(toBeDeletedProduct.imgCover)
    next()
})

schema.pre(/delete/i, async function (next) {
    const toBeDeletedProduct = await productModel.findOne(this._conditions)
    if (!toBeDeletedProduct) return next()

    await Promise.all(
        toBeDeletedProduct.images.map(async (image) => {
            await mongoose.model('imageOnProduct').findByIdAndDelete(image._id)
        })
    )
    next()
})


schema.pre(/update/i, async function (next) {
    if(!this._update.imgCover) return next()
    const toBeUpdatedProduct = await productModel.findOne(this._conditions)
    if (!toBeUpdatedProduct) return next()

    await mongoose.model('image').findByIdAndDelete(toBeUpdatedProduct.imgCover)
    next()
})

export const productModel = mongoose.model('product', schema)



