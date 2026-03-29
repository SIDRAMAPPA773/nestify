const express= require("express");
const router = express.Router({ mergeParams: true });
const Review=require('../models/review.js');
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema}=require("../schema.js");
const {validateReview, isLoggedIn, isOwner,isReviewAuthor}=require("../middleware.js");
const Listing = require('../models/listing.js');

const reviewController=require("../controllers/reviews.js");



router.post('/',isLoggedIn("login is required for creting Review"),validateReview,wrapAsync(reviewController.createReview));

// delete review route
router.delete("/:reviewId",isLoggedIn("you cannot delete Review !"),isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;