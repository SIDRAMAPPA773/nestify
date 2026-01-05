const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String ,required: true },
    description: { type: String },
    
    image: {
        filename: { type: String, default: "default" },
        url: { 
            type: String,
            default: "https://unsplash.com/photos/photo-of-brown-bench-near-swimming-pool-Koei_7yYtIo"
        }
    },

    price: { type: Number ,default: 0 },
    location: { type: String, required: true },
    country: { type: String, required: true },
});

const listing = mongoose.model('listing', listingSchema);
module.exports = listing;
