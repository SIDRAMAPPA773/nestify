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

app.get('/', (req, res) => {
  res.send('Hi I am ROOT');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

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