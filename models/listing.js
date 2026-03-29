const { ref } = require('joi');
const mongoose = require('mongoose');
const Review=require('./review.js');
const  User=require('./user.js');
const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: { type: String ,required: true },
//     description: { type: String },
    
//     image: {
//         url:{
//             type:String
//         },
//         filename:{
//             type:String
//         }
//     },

//     price: { type: Number ,default: 0 },
//     location: { type: String, required: true },
//     country: { type: String, required: true },
//     reviews:[
//         {
//             type:Schema.Types.ObjectId,
//             ref:"Review"
//         },
//     ],
//     owner:{
//         type:Schema.Types.ObjectId,
//         ref:"User",
//     },
// });

const listingSchema = new Schema({
    title: { type: String ,required: true },
    description: { type: String },

    image: {
        url: { type: String },
        filename: { type: String }
    },

    price: { type: Number ,default: 0 },
    location: { type: String, required: true },
    country: { type: String, required: true },

    
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true
        }
    },
    category: {
  type: String,
  enum: ["Trending", "Beach", "Mountain", "City", "Camping", "Luxury", "Budget"],
  default: "Trending"
},

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (!listing) return;

  await Review.deleteMany({
    _id: { $in: listing.reviews }
  });
});

const listing = mongoose.model('listing', listingSchema);
module.exports = listing;
