import { Router } from "express"
import { validate } from "../../middleware/validations.middlewares.js"
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js"
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupons.controllers.js"
import { addCouponSchema, deleteCouponSchema, getCouponSchema, updateCouponSchema } from "./coupons.validations.js"

const router = Router()

router
	.route('/')
	.get(
		getAllCoupons
	)
	.post(
        Authenticate,
		Authorize('admin'),
		validate(addCouponSchema),
		addCoupon
	)

router
	.route('/:couponId')
	.get(
		Authenticate,
		Authorize('admin'),
		validate(getCouponSchema),
		getCoupon
	)
	.put(
		Authenticate,
		Authorize('admin'),
		validate(updateCouponSchema),
		updateCoupon
	)
	.delete(
		Authenticate,
		Authorize('admin'),
		validate(deleteCouponSchema),
		deleteCoupon
	)

export default router
