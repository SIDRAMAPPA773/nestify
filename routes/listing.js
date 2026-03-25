const express=require("express");
const router=express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const Review=require('../models/review.js');



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


router.get('/new',isLoggedIn("Please log in to create a listing."), (req, res) => {
 try{
 
    res.render("listings/new.ejs");
 }catch(err){
    console.error("field error",err);
 }
}
);


router.get('/:id/edit',isLoggedIn("Please log in to edit a listing."),isOwner, wrapAsync(async (req, res) => {
  
    const { id } = req.params;
   

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/edit.ejs', { listing });
}));

   
router.get('/:id', wrapAsync(async (req, res) => {
 
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author",
    },
  }).populate("owner");
    if (!listing) {
    req.flash("error", "The requested listing could not be found.");
        return res.redirect("/listings"); 
    }
    res.render('./listings/show.ejs', { listing });
 
}));

// new listing route
router.post('/',isLoggedIn("You must be logged in to create a listing."),validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing created!");
    res.redirect('/listings');
  }
));



router.put('/:id',isLoggedIn("You must be logged in to update this listing."),isOwner,validateListing,wrapAsync( async (req, res) => {
 
    const { id } = req.params;

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
      if (!updatedListing) {
    req.flash("error", "The requested listing could not be found.");
        return res.redirect("/listings"); 
    }
    req.flash("success", "Listing Updated Successfully  !");
    res.redirect(`/listings/${updatedListing._id}`);
 
}));

//delete listing
router.delete('/:id',isLoggedIn("You must be logged in to delete this listing."),isOwner, wrapAsync(async (req, res) => {
  
    const { id } = req.params;
    const listing=await Listing.findById(id);


  if(!listing){
      req.flash("error", "The listing you are trying to delete does not exist.");
        return res.redirect("/listings");
  }
  // delete all reviews linked to this listing
  await Review.deleteMany({
    _id: { $in: listing.reviews }
  });
    await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted !");
    res.redirect('/listings');
 

}));







module.exports=router;