import dotenv from 'dotenv'
import Stripe from 'stripe';
import { productModel } from "../../../database/models/product.model.js";
import { AppError, CatchAsyncError } from "../../utils/error.handler.js";
import orderModel from "../../../database/models/order.model.js";
import cartModel from "../../../database/models/cart.model.js";
import { Apifeature } from "../../utils/apiFeature.js";
import { userModel } from '../../../database/models/user.model.js';

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET);

export const getAllOrders = CatchAsyncError(async (req, res) => {
    const apiFeatures = new Apifeature(orderModel.find({ user_id: req.user.id }), req.query)

    const orders = await apiFeatures.mongooseQuery
    res.status(200).json({ orders })
})

export const makeCODorder = CatchAsyncError(async (req, res) => {
    const cart = await cartModel.findOne({ user_id: req.user.id });

    console.log(cart.coupon_id?.discount);

    cart.products.forEach((product) => {
        if (product.product_id.stock < product.quantity) throw new AppError("Insufficient stock", 400);
    });

    const orderProducts = cart.products.map(({ product_id: { title, price, priceAfterDiscount }, quantity }) => ({
        product: {
            title,
            price,
            priceAfterDiscount
        },
        quantity
    }));

    const order = await orderModel.create({
        user_id: req.user.id,
        products: orderProducts,
        ...req.body,
        coupon: cart.coupon_id?.discount
    });

    const bulkWriteOperations = cart.products.map(({ product_id: { _id }, quantity }) => ({
        updateOne: {
            filter: { _id },
            update: {
                $inc: {
                    stock: -quantity
                }
            }
        }
    }));

    await productModel.bulkWrite(bulkWriteOperations);

    res.status(201).json({ order });
});

export const makePaymentSession = CatchAsyncError(async (req, res) => {
    const cart = await cartModel.findOne({ user_id: req.user.id });

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: "EGP",
                unit_amount: cart.total_price * 100,
                product_data: {
                    name: req.user.name
                },
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: "https://kareememad52.github.io/ecommerce/",
        cancel_url: "https://kareememad52.github.io/ecommerce/",
        client_reference_id: cart._id,
        customer_email: req.user.email,
        metadata: {
            address: req.body.address,
            phone: req.body.phone
        }
    })

    res.status(200).json({ session })
})


export const makeOnlineOrder = async (data) => {
    const { customer_email } = data

    const user = await userModel.findOne({ email: customer_email })

    const cart = await cartModel.findOne({ user_id: user._id });

    const orderProducts = cart.products.map(({ product_id: { title, price, priceAfterDiscount }, quantity }) => ({
        product: {
            title,
            price,
            priceAfterDiscount
        },
        quantity
    }));

    const order = await orderModel.create({
        user_id: user._id,
        products: orderProducts,
        address: data.metadata.address,
        phone: data.metadata.phone,
        coupon: cart.coupon_id?.discount,
        isPaid: true,
        payment_type: "card"
    });
}