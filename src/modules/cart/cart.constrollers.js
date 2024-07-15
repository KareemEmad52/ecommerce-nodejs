import cartModel from "../../../database/models/cart.model.js";
import couponModel from "../../../database/models/coupon.model.js";
import { AppError, CatchAsyncError } from "../../utils/error.handler.js";

export const getCart = CatchAsyncError(async (req, res) => {
    const cart = await cartModel.find({ user_id: req.user._id })
    res.status(200).json({ message: 'Done', cart })
})

export const addToCart = CatchAsyncError(async (req, res) => {

    const { product_id } = req.body
    const cart = await cartModel.findOne({ user_id: req.user._id })

    const productEntry = cart.products.find(
        (entry) => entry.product_id._id.toString() === product_id
    )

    if (!productEntry) cart.products.push({ product_id, quantity: 1 })
    else productEntry.quantity++

    await cart.save()

    res.status(200).json({ message: 'Added successfully', cart })
})


export const removeFromCart = CatchAsyncError(async (req, res) => {

    const { product_id } = req.body
    const cart = await cartModel.findOne({ user_id: req.user._id })

    const productEntry = cart.products.find(
        (entry) => entry.product_id._id.toString() === product_id
    )

    if (!productEntry) throw new AppError('product doesn\'t exist', 404)

    productEntry.quantity--

    if (productEntry.quantity === 0) cart.products.remove(productEntry)

    await cart.save()

    res.json({ message: 'Removed successfully', cart })
})


export const applyCoupon = CatchAsyncError(async (req, res) => {
    const { code } = req.body
    const cart = await cartModel.findOne({ user_id: req.user.id })

    if (!code) {
        cart.coupon_id = null
        await cart.save()
        return res.json({ message: 'Coupon removed successfully' })
    }

    const coupon = await couponModel.findOne({
        code,
        expiry: { $gte: Date.now() },
    })

    if (!coupon) throw new AppError('Invalid Coupon', 400)

    cart.coupon_id = coupon._id
    await cart.save()
    res.json({ message: 'Coupon added successfully' })
})


export const removeProductFromCart = CatchAsyncError(async (req, res) => {
    const { product_id } = req.body;
    const cart = await cartModel.findOne({ user_id: req.user._id });

    const productEntryIndex = cart.products.findIndex(
        (entry) => entry.product_id._id.toString() === product_id
    );

    if (productEntryIndex === -1) throw new AppError('product doesn\'t exist', 404);

    cart.products.splice(productEntryIndex, 1); // Remove the product from the array

    await cart.save();

    res.json({ message: 'Product removed successfully', cart });
});