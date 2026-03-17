const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);

main().then(() => console.log('Connected to MongoDB')
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/wanderlustDB');
}

main().catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hi I am ROOT');
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



app.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.render("./listings/index.ejs", { listings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/listings/new', (req, res) => {
 try{
   res.render("listings/new.ejs");
 }catch(err){
    console.error("field error",err);
 }
}
);
app.get('/listings/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
   

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('listings/edit.ejs', { listing });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render('./listings/show.ejs', { listing });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.post('/listings/new', wrapAsync(async (req, res) => {
    
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
  
  }
));


app.put('/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true });
    res.redirect(`/listings/${updatedListing._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.delete('/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


app.use((err,req,res,next)=>{
  res.status(500).message("something went wrong !!!!!");
})