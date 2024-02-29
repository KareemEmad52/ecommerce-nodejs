import nodemailer from "nodemailer"
import env from "dotenv"

env.config()
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});