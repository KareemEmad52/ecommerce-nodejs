import { Router } from "express";
import { validate } from "../../middleware/validations.middlewares.js";
import { addbrand, deletebrand, getAllbrand, getsinglebrand, updatebrand } from "./brand.controller.js";
import { addBrandSchema, deleteBrandSchema, getSingleBrandSchema, updateBrandSchema } from "./brand.validations.js";
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js";
import { attachImage } from "../image/image.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";


const router = Router()

router
    .get("", getAllbrand)
    .post("",
        Authenticate,
        Authorize('user', 'admin'),
        upload.single('image'),
        validate(addBrandSchema),
        attachImage('image'),
        addbrand)

router
    .route("/:id")
    .get(validate(getSingleBrandSchema), getsinglebrand)
    .put(Authenticate,
        Authorize('user', 'admin'),
        upload.single('image'),
        validate(updateBrandSchema),
        attachImage('image'),
        updatebrand)
    .delete(Authenticate, Authorize('user', 'admin'), validate(deleteBrandSchema), deletebrand)


export default router