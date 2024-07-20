import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short user name']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
        },
    ]
}, { timestamps: true })


schema.pre(/find/, function (next) {
	this.populate('wishlist')
	next()
})

schema.pre(/delete/i, async function(next){
    const toBeDeletedUser = await userModel.findOne(this._conditions)
    if(!toBeDeletedUser) return next()

    await mongoose.model('image').findByIdAndDelete(toBeDeletedUser.profilePicture)
    next()
})

schema.pre(/update/i, async function(next){
    if(!this._update.profilePicture) return next()
    const toBeUpdateddUser = await userModel.findOne(this._conditions)
    if(!toBeUpdateddUser) return next()

    await mongoose.model('image').findByIdAndDelete(toBeUpdateddUser.profilePicture)
    next()
})


schema.pre(/find/, function(next){
    this.populate('profilePicture',['path']);
    next()
})

export const userModel = mongoose.model('user', schema)



