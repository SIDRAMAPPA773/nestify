// import { styleText } from 'util';

if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}




const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
// const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
// const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js")
// const {listingSchema,reviewSchema}=require("./schema.js");
const session=require("express-session");
const flash=require('connect-flash');


const Review=require('./models/review.js');

const listingRouter=require('./routes/listing.js');
const reviewRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require('./models/user.js');


main().then(() => console.log('Connected to MongoDB')
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/wanderlustDB');
}


// main().catch(err => console.log(err));

const sessionOptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
};


// app.get('/', (req, res) => {
//   res.send('Hi I am ROOT');
// });

app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
      res.locals.currentUser=req.user;

    res.locals.success = successMsg && successMsg.trim() !== "" ? successMsg : null;
    res.locals.error = errorMsg && errorMsg.trim() !== "" ? errorMsg : null;
  
    next();
})

app.get('/demouser',async (req,res)=>{
let fakeUser= new User({
  email:"student@gmail.com",
  username:"sid"
});

let registereduser=await User.register(fakeUser,"heysid");
res.send(registereduser);
});




app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong !"}=err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs",{message});
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});