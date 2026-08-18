const express = require("express");
const User = require("../modules/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const userController = require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post( wrapAsync (userController.signUp));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, 
    passport.authenticate("local" , {failureRedirect: "/listing" , failureFlash: true}), 
    userController.logIn
);

router.get("/logout" , userController.logOut);

module.exports = router;