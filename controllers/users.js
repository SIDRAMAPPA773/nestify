const User=require('../models/user.js');
const {isLoggedIn, saveRedirectUrl}=require("../middleware.js");



module.exports.renderSignUpForm=(req,res)=>{
    res.render('users/signup.ejs');
};


module.exports.signUp=async (req,res)=>{
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
};


module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};


module.exports.login=async (req,res)=>{
req.flash("success","Welcome To Wanderlust You are logged in !");
const redirectUrl=res.locals.redirectUrl||"/listings";
res.redirect(redirectUrl);

};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
       if(err){
        return next(err);
       }
       req.flash("success","You are logged out !");
       res.redirect("/listings");
    })
};