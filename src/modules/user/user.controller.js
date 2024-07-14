import env from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userModel } from "../../../database/models/user.model.js";
import { AppError, CatchAsyncError } from "../../utils/error.handler.js";
env.config()


export const getUser = CatchAsyncError(async (req, res) => {
    const { _id } = req.user
    

    const user = await userModel.findById(_id,['-password'])
    res.status(200).json({ user })
})

export const addUser = CatchAsyncError(async (req, res) => {
    const { email, password, name ,profilePicture} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 5)
    const user = await userModel.create({ email, password: hashedPassword, name,profilePicture })

    const token = await jwt.sign({ email }, process.env.SECRET_KEY)

    const link = `http://localhost:3000/api/v1/user/verifyemail/${token}`


    res.status(201).json({ status: "success",user })


})

export const login = CatchAsyncError(async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })


    if (!user || !bcrypt.compareSync(password, user.password)) throw new AppError("invalid email or password")

    const { _id, name ,profilePicture } = user
    const token = await jwt.sign({ email, _id, name ,profilePicture }, process.env.SECRET_KEY)

    res.status(200).json({ message: "Login Successfully ", token })


})

export const verifyemail = CatchAsyncError(async (req, res) => {
    const { token } = req.params

    const { error, email } = jwt.verify(token, process.env.SECRET_KEY);

    if (error) throw new AppError("invalid Email", 400)

    const user = await userModel.findOne({ email })

    user.isEmailVerified = true
    user.save()

    res.status(200).json("Email verified successfully ✔️")

})

export const updateUser = CatchAsyncError(async (req, res) => {
    const { id } = req.params
    const { name, password, email } = req.body
    let hashedPassword;
    if (password) hashedPassword = bcrypt.hashSync(password, 5)
    const user = await userModel.findByIdAndUpdate(id, { name, password: hashedPassword, email }, { new: true })
    res.status(200).json({ message: "success", user })
})

export const deleteUser = CatchAsyncError(async (req, res) => {
    const { id } = req.params
    const user = await userModel.findByIdAndDelete(id)
    res.status(200).json({ message: "success", user })
})