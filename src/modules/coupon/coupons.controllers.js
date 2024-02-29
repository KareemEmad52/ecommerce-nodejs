import couponModel from "../../../database/models/coupon.model.js"
import { Apifeature } from "../../utils/apiFeature.js"
import { AppError, CatchAsyncError } from "../../utils/error.handler.js"


export const addCoupon = CatchAsyncError(async (req, res) => {

    const existCoupon = await couponModel.findOne({code: req.body.code})
    if(existCoupon) throw new AppError("coupon already exists ! ",400)

	const coupon = await couponModel.create(req.body)
	res.status(201).json({ coupon })
})

export const getAllCoupons = CatchAsyncError(async (req, res) => {
	const apiFeatures = new Apifeature(couponModel.find(), req.query)
	const coupons = await apiFeatures.mongooseQuery
	res.status(201).json({ coupons })
})

export const getCoupon = CatchAsyncError(async (req, res) => {
	const { couponId } = req.params

	const coupon = await couponModel.findById(couponId)
	if (coupon) {
		return res.json({ coupon })
	}
	res.status(404).json({ error: 'Coupon not found' })
})

export const updateCoupon = CatchAsyncError(async (req, res) => {
	const { couponId } = req.params

	const coupon = await couponModel.findByIdAndUpdate(couponId, req.body, {
		new: true,
	})

	if (coupon) {
		return res.json({ coupon })
	}
	res.status(404).json({ error: 'Coupon not found' })
})

export const deleteCoupon = CatchAsyncError(async (req, res) => {
	const couponId = req.params.couponId

	const deletedCoupon = await couponModel.findByIdAndDelete(couponId)

	if (deletedCoupon) {
		return res.json({ message: 'Coupon deleted successfully' })
	}
	res.status(404).json({ error: 'Coupon not found' })
})
