const express= require("express");
const router = express.Router({ mergeParams: true });
const Review=require('../models/review.js');
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema}=require("../schema.js");
const {validateReview, isLoggedIn, isOwner,isReviewAuthor}=require("../middleware.js");
const Listing = require('../models/listing.js');







router.post('/',isLoggedIn("login is required for creting Review"),validateReview,wrapAsync(async (req,res)=>{

let listing=await Listing.findById(req.params.id);

if (!listing) {
  throw new ExpressError(404, "Listing not found");
}
let newReview=new Review(req.body.review);
     newReview.author=req.user._id;

listing.reviews.push(newReview);
 await newReview.save();
 await listing.save();

console.log("new review saved");
req.flash("success", "New Review Created !");
res.redirect(`/listings/${listing._id}`);
}));

// delete review route
router.delete("/:reviewId",isLoggedIn("you cannot delete Review !"),isReviewAuthor,wrapAsync(async (req,res)=>{
let {id,reviewId}=req.params;
 await Review.findByIdAndDelete(reviewId);
 await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId }
  });
  req.flash("success", " Review Deleted SuccessFully !");
 res.redirect(`/listings/${id}`);
}));

module.exports=router;