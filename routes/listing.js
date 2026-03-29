const express=require("express");
const router=express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const Review=require('../models/review.js');
const listingController=require("../controllers/listings.js");
const multer=require("multer");

const {cloudinary,storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(
    wrapAsync(listingController.index))
.post(
    isLoggedIn("You must be logged in to create a listing.")
     ,upload.single('image'),
    validateListing,
    wrapAsync(listingController.createListing)
);



router.get('/new',isLoggedIn("Please log in to create a listing."), listingController.renederNewForm);



router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn("You must be logged in to update this listing."),isOwner,upload.single('image'),validateListing,wrapAsync( listingController.updateListing))
.delete(isLoggedIn("You must be logged in to delete this listing."),isOwner, wrapAsync(listingController.destroyListing));



router.get('/:id/edit',isLoggedIn("Please log in to edit a listing."),isOwner, wrapAsync(listingController.renderEditListing));



module.exports=router;