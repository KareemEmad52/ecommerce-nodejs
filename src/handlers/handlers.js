import { Apifeature } from "../utils/apiFeature.js"
import { CatchAsyncError } from "../utils/error.handler.js"

export const deleteOne = (model) => {
    return CatchAsyncError(async (req, res) => {
        let document = await model.findByIdAndDelete(req.params.id)
        console.log(document);
        !document && res.status(404).json({ message: "document not found" })
        document && res.status(200).json({ message: "success", document })
    })
}

export const getSingleDocument = (model) => {
    return CatchAsyncError(async (req, res) => {
        let document = await model.findById(req.params.id)
        !document && res.status(404).json({ message: "document not found" })
        document && res.status(200).json({ message: "success", document })
    })
}

export const getAllDocuments =(model) =>{
    return CatchAsyncError(async (req, res) => {

        let apifeature = new Apifeature(model.find(),req.query).pagination().sort().search().filter()

        let document = await apifeature.mongooseQuery
        !document && res.status(404).json({ message: "document not found" })
        document && res.status(200).json({ message: "success", document })
    })
}