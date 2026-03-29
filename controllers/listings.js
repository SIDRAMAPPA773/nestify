const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.index = async (req, res) => {

  let { location, price } = req.query;

  let query = {};

  // ONLY apply if location is NOT empty
  if (location && location.trim() !== "") {
    query.location = { $regex: location.trim(), $options: "i" };
  }

  // ONLY apply if price is valid
  if (price && !isNaN(price)) {
    query.price = { $lte: Number(price) };
  }

  const listings = await Listing.find(query);

  res.render("listings/index.ejs", { listings });
};




  module.exports.renederNewForm=(req, res) => {
 try{
 
    res.render("listings/new.ejs");
 }catch(err){
    console.error("field error",err);
 }
};


module.exports.showListing=async (req, res) => {
 
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
 
};


// module.exports.createListing=async (req, res) => {
//     let url= req.file.path;
//     let filename=req.file.filename;

//     const newListing = new Listing(req.body.listing);
//     newListing.image={url,filename};
//     newListing.owner=req.user._id;
//     await newListing.save();
//     req.flash("success","New Listing created!");
//     res.redirect('/listings');
//   };

module.exports.createListing = async (req, res) => {

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    // ✅ Image
    newListing.image = { url, filename };

    // 🔥 ADD THIS (MAP COORDINATES)
    if (!req.body.listing.coordinates) {
        req.flash("error", "Please select location on map");
        return res.redirect("/listings/new");
    }

    const coords = req.body.listing.coordinates.split(",");

    newListing.geometry = {
        type: "Point",
        coordinates: [
            parseFloat(coords[0]),
            parseFloat(coords[1])
        ]
    };

    // ✅ Owner
    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New Listing created!");
    res.redirect(`/listings/${newListing._id}`);
};

//   module.exports.updateListing=async (req, res) => {
 
//     const { id } = req.params;
    

//     const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });

//     if (!updatedListing) {
//     req.flash("error", "The requested listing could not be found.");
//         return res.redirect("/listings"); 
//     }


//     if(typeof req.file !="undefined"){
//        let url= req.file.path;
//     let filename=req.file.filename;
//       updatedListing.image={url,filename};
//     await updatedListing.save();
//     }


//     req.flash("success", "Listing Updated Successfully  !");
//     res.redirect(`/listings/${updatedListing._id}`);
 
// };


// module.exports.updateListing = async (req, res) => {

//     const { id } = req.params;

//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     if (!req.body.listing) {
//         throw new ExpressError(400, "Listing data missing");
//     }

//     let updatedListing = await Listing.findByIdAndUpdate(
//         id,
//         req.body.listing,
//         { new: true, runValidators: true }
//     );

//     if (!updatedListing) {
//         req.flash("error", "The requested listing could not be found.");
//         return res.redirect("/listings");
//     }

//     // ✅ handle image update safely
//     if (req.file) {
//         updatedListing.image = {
//             url: req.file.path,
//             filename: req.file.filename
//         };
//         await updatedListing.save();
//     }

//     req.flash("success", "Listing Updated Successfully!");
//     res.redirect(`/listings/${updatedListing._id}`);
// };

module.exports.updateListing = async (req, res) => {

  const { id } = req.params;

  let updateData = { ...req.body.listing };

  // 🔥 HANDLE COORDINATES SAFELY
  if (req.body.listing.coordinates && req.body.listing.coordinates !== "") {
    const [lng, lat] = req.body.listing.coordinates.split(",");

    updateData.geometry = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
  } else {
    // ❌ REMOVE coordinates if empty (VERY IMPORTANT)
    delete updateData.coordinates;
  }

  let updatedListing = await Listing.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  // IMAGE UPDATE
  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
    await updatedListing.save();
  }

  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${updatedListing._id}`);
};


module.exports.renderEditListing=async (req, res) => {
  
    const { id } = req.params;
   

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    let originalImageurl=listing.image.url;
   originalImageurl= originalImageurl.replace("/upload","/upload/w_250");
    res.render('listings/edit.ejs', { listing,originalImageurl});
};


module.exports.destroyListing=async (req, res) => {
  
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
 

};