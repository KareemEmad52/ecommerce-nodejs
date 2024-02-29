import { Router } from 'express'
import { Authenticate, Authorize } from '../../middleware/Auth.middlewares.js'
import { getAllOrders, makeCODorder, makePaymentSession } from './oreders.controllers.js'
import { assertCart } from '../cart/cart.middleware.js'

const router = Router()

router.route('/').get(Authenticate, Authorize('admin', 'user'), getAllOrders)
router
    .route('/cash')
    .post(Authenticate, Authorize('admin', 'user'), assertCart, makeCODorder)


router
    .route('/online')
    .post(Authenticate, Authorize('admin', 'user'), assertCart, makePaymentSession)

export default router
