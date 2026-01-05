const mongoose = require('mongoose');
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main().then(() => console.log('Connected to MongoDB')
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/wanderlustDB');
}

main().catch(err => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Database initialized with sample data.");
    mongoose.connection.close();
}
initDB();