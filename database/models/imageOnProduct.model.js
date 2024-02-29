import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	image_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'image',
	},
	product_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'product',
	},
})

schema.pre(/find/, function(next){
	this.populate('image_id',['path'])
	next()
})

schema.pre(/delete/i, async function(next){
    const toBeDeletedIOP = await imageOnProductModel.findOne(this._conditions)
    if(!toBeDeletedIOP) return next()

    await mongoose.model('image').findByIdAndDelete(toBeDeletedIOP.image_id._id)
    next()
})

const imageOnProductModel = mongoose.model(
	'imageOnProduct',
	schema
)

export default imageOnProductModel
