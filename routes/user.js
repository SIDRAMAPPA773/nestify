const express= require("express");
const router = express.Router({ mergeParams: true });
const User=require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const {isLoggedIn, saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");


router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync( userController.signUp));



router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);



router.get('/logout',isLoggedIn("You must be logged in to log out."),userController.logout);


module.exports=router;