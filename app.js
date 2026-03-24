// import { styleText } from 'util';

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

const listings=require('./routes/listing.js');
const reviews=require('./routes/review.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);

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


app.get('/', (req, res) => {
  res.send('Hi I am ROOT');
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];

    res.locals.success = successMsg && successMsg.trim() !== "" ? successMsg : null;
    res.locals.error = errorMsg && errorMsg.trim() !== "" ? errorMsg : null;
  next();
})


app.use('/listings',listings);
app.use('/listings/:id/reviews',reviews);


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