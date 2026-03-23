const express=require("express");
const router=express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing = require('../models/listing.js');

const Review=require('../models/review.js');

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

// const validateReview = (req, res, next) => {
//   console.log("BODY:", req.body);  

//   if (!req.body.review) {
//     throw new ExpressError(400, "Review is required");
//   }

//   const { error } = reviewSchema.validate(req.body.review);

//   if (error) {
//     console.log("JOI ERROR:", error.details); // 👈 THIS
//     const msg = error.details.map(el => el.message).join(",");
//     throw new ExpressError(400, msg);
//   }

//   next();
// };




router.get('/', wrapAsync(async (req, res) => {
 
    const listings = await Listing.find({});
    res.render("listings/index.ejs", { listings });
  
  }
));


router.get('/new', (req, res) => {
 try{
   res.render("listings/new.ejs");
 }catch(err){
    console.error("field error",err);
 }
}
);


router.get('/:id/edit', wrapAsync(async (req, res) => {
  
    const { id } = req.params;
   

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/edit.ejs', { listing });
}));

   
router.get('/:id', wrapAsync(async (req, res) => {
 
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('./listings/show.ejs', { listing });
 
}));

// new listing route
router.post('/',validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
  }
));



router.put('/:id',validateListing,wrapAsync( async (req, res) => {
 
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
 
}));

//delete listing
router.delete('/:id', wrapAsync(async (req, res) => {
  
    const { id } = req.params;
    const listing=await Listing.findById(id);
  // delete all reviews linked to this listing
  await Review.deleteMany({
    _id: { $in: listing.reviews }
  });
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
 

}));







module.exports=router;