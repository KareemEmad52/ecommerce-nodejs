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

export const userModel = mongoose.model('user', schema)



