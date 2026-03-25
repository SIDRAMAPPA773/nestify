const Listing=require("./models/listing.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");

const Review = require("./models/review");


module.exports.isLoggedIn = (message) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            req.session.redirectUrl=req.originalUrl;
            req.flash("error", message);
            return res.redirect("/login");
        }
        next();
    };
};
// module.exports.isLoggedIn = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "You must be logged in!");
//         return res.redirect("/login");
//     }
//     next();
// };

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner=async (req,res,next)=>{

        const { id } = req.params;
        const listing= await Listing.findById(id);
     if(!listing.owner._id.equals(res.locals.currentUser._id)){
      req.flash("error","you are not the owner of listing  !");
     return   res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
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


module.exports.validateReview = (req, res, next) => {
  console.log("BODY:", req.body);  

  if (!req.body.review) {
    throw new ExpressError(400, "Review is required");
  }

  const { error } = reviewSchema.validate(req.body);

  if (error) {
    console.log("JOI ERROR:", error.details); // 👈 THIS
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  }

  next();
};



module.exports.isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};