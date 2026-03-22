// import { styleText } from 'util';

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js");


const Review=require('./models/review.js');

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



const validateListing = (req, res, next) => {
  console.log("BODY:", req.body);   
  if (!req.body.listing) {
    throw new ExpressError(400, "Listing is required");
  }

  const { error } = listingSchema.validate(req.body.listing);

  if (error) {
    console.log("JOI ERROR:", error.details); 
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }

  next();
};
const validateReview = (req, res, next) => {
  console.log("BODY:", req.body);  

  if (!req.body.review) {
    throw new ExpressError(400, "Listing is required");
  }

  const { error } = reviewSchema.validate(req.body);

  if (error) {
    console.log("JOI ERROR:", error.details); // 👈 THIS
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }

  next();
};
// main().catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hi I am ROOT');
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.get('/listings', wrapAsync(async (req, res) => {
 
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  
  }
));

app.get('/listings/new', (req, res) => {
 try{
   res.render("listings/new.ejs");
 }catch(err){
    console.error("field error",err);
 }
}
);
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
  
    const { id } = req.params;
   

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/edit.ejs', { listing });
}));
   
app.get('/listings/:id', wrapAsync(async (req, res) => {
 
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('./listings/show.ejs', { listing });
 
}));


app.post('/listings/new',validateListing, wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing ");
    // }
     
    const newListing = new Listing(req.body.listing);
    //   if(!newListing.description){
    //   throw new ExpressError(400,"description is missing ");
    // }
    // if(!newListing.title){
    //   throw new ExpressError(400,"description is missing ");
    // }
    // if(!newListing.location){
    //   throw new ExpressError(400,"description is missing ");
    // }
    // if(!newListing.country){
    //   throw new ExpressError(400,"description is missing ");
    // }
    // if(!newListing.price){
    //   throw new ExpressError(400,"description is missing ");
    // }
    await newListing.save();
    res.redirect('/listings');
  
  }
));


app.post('/listings/:id/reviews',validateReview,wrapAsync(async (req,res)=>{

let listing=await Listing.findById(req.params.id);
let newReview=new Review(req.body.review);


listing.reviews.push(newReview);
 await newReview.save();
 await listing.save();

console.log("new review saved");
res.redirect(`/listings/${listing._id}`);
}));



// delete review route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
let {id,reviewId}=req.params;
 await Review.findByIdAndDelete(reviewId);
 await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }
  });
 res.redirect(`/listings/${id}`);
}));

app.put('/listings/:id',validateListing,wrapAsync( async (req, res) => {
 
    const { id } = req.params;
    //   if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing ");
    // }

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
 
}));

//delete listing
app.delete('/listings/:id', wrapAsync(async (req, res) => {
  
    const { id } = req.params;
    const listing=await Listing.findById(id);
  

  // delete all reviews linked to this listing
  await Review.deleteMany({
    _id: { $in: listing.reviews }
  });


    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
 

}));
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong !"}=err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs",{message});
});