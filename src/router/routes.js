import { Router } from "express";
import subcategoryRouter from "../modules/subcategory/subcategory.routes.js"
import categoryRouter from "../modules/category/category.routes.js"
import ProductRouter from "../modules/Product/product.routes.js"
import ReviewsRouter from "../modules/reviews/review.routes.js"
import CouponRouter from "../modules/coupon/coupon.routes.js"
import BrandsRouter from "../modules/brands/brand.routes.js"
import orderRouter from "../modules/orders/order.routes.js"
import UserRouter from "../modules/user/user.routes.js"
import cartRouter from "../modules/cart/cart.routes.js"

const router = Router()

router.use("/categories", categoryRouter)
router.use("/subcategory", subcategoryRouter)
router.use("/product", ProductRouter)
router.use("/reviews", ReviewsRouter)
router.use("/coupons", CouponRouter)
router.use("/brands", BrandsRouter)
router.use("/user", UserRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)


export default router