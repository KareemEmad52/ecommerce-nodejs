import { Router } from "express";
import { validate } from "../../middleware/validations.middlewares.js";
import { addproduct, deleteproduct, getAllproduct, getAllProductsWithoutPagenation, getsingleproduct, updateproduct } from "./product.controller.js";
import { addProductSchema, deleteProductSchema, getSingleProductSchema, updateProductSchema } from "./product.validations.js";
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js";
import { uniqueTitle } from "../../middleware/unique.productTitle.js";
import { upload } from "../../middleware/upload.middleware.js";
import { attachCoverImage } from "./product.middlewares.js";

const router = Router()

router
    .get("", getAllproduct)
    .get("/all", getAllProductsWithoutPagenation)
    .post("", Authenticate,
        Authorize('admin'),
        upload.fields([
            { name: 'imgCover', maxCount: 1 },
            { name: 'images', maxCount: 10 },
        ]),
        validate(addProductSchema),
        attachCoverImage(),
        uniqueTitle,
        addproduct)

router
    .route("/:id")
    .get(validate(getSingleProductSchema), getsingleproduct)
    .put(Authenticate,
        Authorize('admin'),
        upload.fields([
            { name: 'imgCover', maxCount: 1 },
            { name: 'images', maxCount: 10 },
        ]),
        validate(updateProductSchema),
        attachCoverImage(),
        updateproduct)
    .delete(Authenticate, Authorize('admin'), validate(deleteProductSchema), deleteproduct)


export default router