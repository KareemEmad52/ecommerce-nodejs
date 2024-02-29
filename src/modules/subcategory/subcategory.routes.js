import { Router } from "express";
import { validate } from "../../middleware/validations.middlewares.js";
import { addSubCategorySchema, deleteSubCategorySchema, getSingleSubCategorySchema, updateSubCategorySchema } from "./subcategory.validations.js";
import { addSubcategory, deletesubcategory, getAllsubcategory, getsinglesubcategory, updatesubcategory } from "./subcategory.controller.js";
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js";
import { attachImage } from "../image/image.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = Router({mergeParams: true})

router
    .get("",getAllsubcategory)
    .post("", 
    Authenticate,
    Authorize('user','admin'), 
    upload.single('image'),
    validate(addSubCategorySchema),
    attachImage('image'), 
    addSubcategory)

router
    .route("/:id")
    .get(validate(getSingleSubCategorySchema),getsinglesubcategory)
    .put(
        Authenticate,
        Authorize('user','admin'),
        upload.single('image'),
        validate(updateSubCategorySchema),
        attachImage('image'),
        updatesubcategory)
    .delete(Authenticate,Authorize('user','admin'),validate(deleteSubCategorySchema),deletesubcategory)


export default router