import { Router } from "express";
import { addcategory, deleteCategory, getAllCategory, getsingleCategory, updateCategory } from "./category.controller.js";
import { validate } from "../../middleware/validations.middlewares.js";
import { addCategorySchema, deleteCategorySchema, getSingleCategorySchema, updateCategorySchema } from "./category.validations.js";
import subcategoryRouter from "../subcategory/subcategory.routes.js"
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js";
import { attachImage } from "../image/image.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = Router()

router.use("/:id/subcategories", subcategoryRouter)

router
    .get("", getAllCategory)
    .post("", Authenticate,
        Authorize('user', 'admin'),
        upload.single('image'),
        validate(addCategorySchema),
        attachImage('image'),
        addcategory)

router
    .route("/:id")
    .get(validate(getSingleCategorySchema), getsingleCategory)
    .put(Authenticate,
        Authorize('user', 'admin'),
        upload.single('image'),
        validate(updateCategorySchema),
        attachImage('image'),
        updateCategory)
    .delete(Authenticate, Authorize('user', 'admin'), validate(deleteCategorySchema), deleteCategory)


export default router