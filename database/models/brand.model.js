import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short brand name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "image"
    }
}, { timestamps: true })


schema.pre(/delete/i, async function(next){
    const toBeDeletedCategory = await brandModel.findOne(this._conditions)
    if(!toBeDeletedCategory) return next()

    await mongoose.model('image').findByIdAndDelete(toBeDeletedCategory.image)
    next()
})


schema.pre(/update/i, async function (next) {
    if (!this._update.image) return next()
    const toBeUpdatesCategory = await brandModel.findOne(this._conditions)
    if (!toBeUpdatesCategory) return next()

    await mongoose.model('image').findByIdAndDelete(toBeUpdatesCategory.image)
    next()
})

schema.pre(/find/, function (next) {
    this.populate('image', ['path']);
    next()
})

export const brandModel = mongoose.model('brand', schema)



