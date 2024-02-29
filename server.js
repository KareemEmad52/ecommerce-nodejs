import express from 'express'
import env from "dotenv"
import { v2 as cloudinary } from 'cloudinary';
import { DBConnection } from './database/dbConnection.js'
import v1Router from "./src/Router/routes.js"
import { AppError } from './src/utils/error.handler.js'


const app = express()
const port = process.env.PORT || 3000
env.config()

app.use('/uploads', express.static("uploads"))
app.use(express.json())

app.use("/api/v1", v1Router)

app.all('*', (req, res, next) => {
    throw new AppError('Route not found', 404)
})


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.use((err, req, res, next) => {
    const { status, stack, message } = err
    res.status(status || 500).json({
        message,
        ...(process.env.MODE === "development" && { stack })
    })
})


DBConnection()


app.listen(port, () => console.log(`Example app listening on port ${port}!`))