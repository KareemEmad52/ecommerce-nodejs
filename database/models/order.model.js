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
                product: {
                    title: String,
                    price: Number,
                    priceAfterDiscount: Number
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        coupon: Number,
        payment_type: {
            type: String,
            enum: ['COD', 'card'],
            default: 'COD'
        },
        address: String,
        phone: String,
        isPaid: {
            type: Boolean,
            default: false
        },
        isDelivered: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)






schema.virtual('total_price').get(function () {
    const total = this.products.reduce(
        (acc, entry) =>
            acc + entry.product.priceAfterDiscount * entry.quantity,
        0
    )
    return total
})


schema.virtual('total_discounted_price').get(function () {
    const total = this.products.reduce(
        (acc, entry) =>
            acc + entry.product.priceAfterDiscount * entry.quantity,
        0
    )
    return total - ((this.coupon || 0) / 100) * total
})

const orderModel = mongoose.model('order', schema)

export default orderModel
