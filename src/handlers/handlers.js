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

export const getAllDocuments = (model) => {
    return CatchAsyncError(async (req, res) => {
        // Create an instance of Apifeature with pagination, sorting, searching, and filtering
        let apifeature = new Apifeature(model.find(), req.query).pagination(10).sort().search().filter();

        // Execute the query to get the documents
        let document = await apifeature.mongooseQuery;

        // Get the total count of documents without pagination
        const totalDocuments = await model.countDocuments();


        // Calculate the number of pages
        const totalPages = Math.ceil(totalDocuments / 10);
        // Check if documents are found and send the response with the number of pages
        if (!document) {
            res.status(404).json({ message: "document not found" });
        } else {
            res.status(200).json({ message: "success", document, totalPages: totalPages });
        }
    });
};
