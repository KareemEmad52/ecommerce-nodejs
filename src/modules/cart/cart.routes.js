import { Router } from 'express'
import { Authenticate, Authorize } from '../../middleware/Auth.middlewares.js'
import { addToCart, applyCoupon, getCart, removeFromCart, removeProductFromCart } from './cart.constrollers.js'
import { assertCart } from './cart.middleware.js'

const router = Router()

router.route('/').get(Authenticate, Authorize('admin', 'user'), assertCart, getCart)
router
    .route('/add')
    .put(Authenticate, Authorize('admin', 'user'), assertCart, addToCart)
router
    .route('/remove')
    .put(Authenticate, Authorize('admin', 'user'), assertCart, removeFromCart)
    .delete(Authenticate, Authorize('admin', 'user'), assertCart, removeProductFromCart)
router
    .route('/coupon')
    .put(Authenticate, Authorize('admin', 'user'), assertCart, applyCoupon)

    

export default router
