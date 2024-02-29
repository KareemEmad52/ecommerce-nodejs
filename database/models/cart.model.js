import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        products: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        coupon_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'coupon',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

schema.pre(/find/, function (next) {
    this.populate({
        path: 'products',
        populate: {
            path: 'product_id',
            model: 'product',
        },
    })
    this.populate('coupon_id')
    next()
})




schema.virtual('total_price').get(function () {
    const total = this.products.reduce(
        (acc, entry) =>
            acc + entry.product_id.priceAfterDiscount * entry.quantity,
        0
    )
    return total - ((this.coupon_id?.discount || 0) / 100) * total
})

const cartModel = mongoose.model('cart', schema)

export default cartModel
