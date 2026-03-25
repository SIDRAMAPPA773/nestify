const express= require("express");
const router = express.Router({ mergeParams: true });
const User=require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const {isLoggedIn, saveRedirectUrl}=require("../middleware.js");
router.get("/signup",(req,res)=>{
    res.render('users/signup.ejs');
})


router.post("/signup",wrapAsync( async (req,res)=>{
try{
    let {username,email,password}=req.body;
const newUser= new User({
    email,username
});
const registereduser=await User.register(newUser,password);
console.log(registereduser);
req.login(registereduser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome To Wanderlust You are logged in !");
res.redirect("/listings");
});


}catch(err){
    req.flash("error", err.message);
        return res.redirect("/signup");
}
}));




router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async (req,res)=>{
req.flash("success","Welcome To Wanderlust You are logged in !");
const redirectUrl=res.locals.redirectUrl||"/listings";
res.redirect(redirectUrl);

});




router.get('/logout',isLoggedIn("You must be logged in to log out."),(req,res,next)=>{
    req.logout((err)=>{
       if(err){
        return next(err);
       }
       req.flash("success","You are logged out !");
       res.redirect("/listings");
    })
})
module.exports=router;