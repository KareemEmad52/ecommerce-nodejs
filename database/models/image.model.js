import mongoose from 'mongoose'
import { deleteImage } from '../../src/utils/image.js'

const schema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		minLength: 3,
		maxLength: 500,
		required: true,
	},
	path: {
		type: String,
		trim: true,
		required: true,
	},
})

schema.pre(/delete/i, async function (next) {
	const toBeDeletedImage = await imageModel.findOne(this._conditions)
	if (!toBeDeletedImage) return next()
	await deleteImage(toBeDeletedImage.name)
	next()
})


const imageModel = mongoose.model('image', schema)

export default imageModel
