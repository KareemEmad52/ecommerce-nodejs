import { Router } from "express";
import { validate } from "../../middleware/validations.middlewares.js";
import { addUser, deleteUser, getUser, login, updateUser, verifyemail } from "./user.controller.js";
import { uniqueEmail } from "../../middleware/unique.Email.js";
import { adduserSchema, delateUserSchema, loginSchema, updateUserSchema } from "./user.validation.js";
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js";
import { getWishlist, updateWishlist } from "./wishlist.controller.js";
import { updateWishlistSchema } from "./wishlist.validation.js";
import { attachImage } from "../image/image.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const router = Router()

router
    .get('/', Authenticate, Authorize('admin', 'user'), getUser)
    .post("/signup", upload.single('profilePicture'), validate(adduserSchema), uniqueEmail, attachImage('profilePicture'), addUser)
    .post("/login", validate(loginSchema), login)

router.route("/verifyemail/:token")
    .get(verifyemail)



router
    .route('/wishlist')
    .get(Authenticate, Authorize('admin', 'user'), getWishlist)
    .put(
        Authenticate,
        Authorize('admin', 'user'),
        validate(updateWishlistSchema),
        updateWishlist
    )

router
    .route("/:id")
    .put(validate(updateUserSchema), uniqueEmail, updateUser)
    .delete(validate(delateUserSchema), deleteUser)



export default router