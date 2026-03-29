

const mongoose = require('mongoose');
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main().then(() => console.log('Connected to MongoDB')
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://sidram:sig0lZfii3hxbK91@cluster1.d3x0trc.mongodb.net/?appName=cluster1');
}



const initDB = async () => {
    await Listing.deleteMany({});
    const updateddata=initdata.data.map((obj)=>({...obj,owner:'69c97f56baae5430bbedabe2'}));
    await Listing.insertMany(updateddata);
    console.log("Database initialized with sample data.");
    mongoose.connection.close();
}
initDB();