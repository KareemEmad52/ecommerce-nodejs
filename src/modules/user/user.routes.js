import { Router } from "express";
import { validate } from "../../middleware/validations.middlewares.js";
import { addUser, deleteUser, getUser, login, updateUser, verifyemail } from "./user.controller.js";
import { uniqueEmail } from "../../middleware/unique.Email.js";
import { adduserSchema, delateUserSchema, loginSchema, updateUserSchema } from "./user.validation.js";
import { Authenticate, Authorize } from "../../middleware/Auth.middlewares.js";
import { getWishlist, updateWishlist } from "./wishlist.controller.js";
import { updateWishlistSchema } from "./wishlist.validation.js";

const router = Router()

router
    .get('/', Authenticate, Authorize('admin', 'user'), getUser)
    .post("/signup", validate(adduserSchema), uniqueEmail, addUser)
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