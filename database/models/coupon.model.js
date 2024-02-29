import mongoose from 'mongoose'

const schema = new mongoose.Schema(
	{
		code: {
			type: String,
			minLength: 3,
			maxLength: 200,
			required: true,
			trim: true,
			unique: true,
		},
		expiry: {
			type: Date,
			required: true,
		},
		discount: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
)

const couponModel = mongoose.model('coupon', schema)

export default couponModel
