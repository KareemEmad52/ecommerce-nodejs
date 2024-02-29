import { Router } from 'express'
import { validate } from '../../middleware/validations.middlewares.js'
import { addReviewSchema, deleteReviewSchema, getReviewSchema, updateReviewSchema } from './review.validations.js'
import { Authenticate, Authorize } from '../../middleware/Auth.middlewares.js'
import { addReview, deleteReview, getReviews, updateReview } from './review.controller.js'

const router = Router({ mergeParams: true })

router
	.route('/:id')
	.get(validate(getReviewSchema), getReviews)
	.post(
		Authenticate,
		Authorize('user','admin'),
		validate(addReviewSchema),
		addReview
	)
	.put(
		Authenticate,
		Authorize('user','admin'),
		validate(updateReviewSchema),
		updateReview
	)
	.delete(
		Authenticate,
		Authorize('user','admin'),
		validate(deleteReviewSchema),
		deleteReview
	)

export default router
