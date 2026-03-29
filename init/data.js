




// const sampleListings = [
//   {
//     title: "Cozy Beachfront Cottage",
//     description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
//     },
//     price: 1500,
//     location: "Malibu",
//     country: "United States",
//     geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
//   },
//   {
//     title: "Modern Loft in Downtown",
//     description: "Stay in the heart of the city in this stylish loft apartment.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
//     },
//     price: 1200,
//     location: "New York City",
//     country: "United States",
//     geometry: { type: "Point", coordinates: [-74.0060, 40.7128] }
//   },
//   {
//     title: "Mountain Retreat",
//     description: "Unplug and unwind in this peaceful mountain cabin.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
//     },
//     price: 1000,
//     location: "Aspen",
//     country: "United States",
//     geometry: { type: "Point", coordinates: [-106.8370, 39.1911] }
//   },
//   {
//     title: "Historic Villa in Tuscany",
//     description: "Experience the charm of Tuscany in this villa.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
//     },
//     price: 2500,
//     location: "Florence",
//     country: "Italy",
//     geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
//   },
//   {
//     title: "Secluded Treehouse Getaway",
//     description: "Live among the treetops in this unique treehouse.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
//     },
//     price: 800,
//     location: "Portland",
//     country: "United States",
//     geometry: { type: "Point", coordinates: [-122.6765, 45.5231] }
//   },
//   {
//     title: "Beachfront Paradise",
//     description: "Step out onto the sandy beach from your condo.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
//     },
//     price: 2000,
//     location: "Cancun",
//     country: "Mexico",
//     geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
//   },
//   {
//     title: "Rustic Cabin by the Lake",
//     description: "Spend your days fishing and kayaking.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
//     },
//     price: 900,
//     location: "Lake Tahoe",
//     country: "United States",
//     geometry: { type: "Point", coordinates: [-120.0440, 39.0968] }
//   },
//   {
//     title: "Luxury Penthouse with City Views",
//     description: "Indulge in luxury living with panoramic views.",
//     image: {
//       filename: "listingimage",
//       url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd"
//     },
//     price: 3500,
//     location: "Los Angeles",
//     country: "United States",
//     geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
//   }
// ];

// module.exports = { data: sampleListings };

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Ocean view cottage with direct beach access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Beach",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stylish loft in the heart of the city.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "City",
    geometry: { type: "Point", coordinates: [-74.0060, 40.7128] }
  },
  {
    title: "Mountain Retreat",
    description: "Peaceful cabin surrounded by mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountain",
    geometry: { type: "Point", coordinates: [-106.8370, 39.1911] }
  },
  {
    title: "Luxury Villa Tuscany",
    description: "Premium villa with vineyard views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    price: 3000,
    location: "Florence",
    country: "Italy",
    category: "Luxury",
    geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
  },
  {
    title: "Camping Escape",
    description: "Nature camping experience with tents.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
    },
    price: 700,
    location: "Colorado",
    country: "United States",
    category: "Camping",
    geometry: { type: "Point", coordinates: [-105.7821, 39.5501] }
  },
  {
    title: "Budget Stay Apartment",
    description: "Affordable stay in prime location.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 800,
    location: "Delhi",
    country: "India",
    category: "Budget",
    geometry: { type: "Point", coordinates: [77.1025, 28.7041] }
  },
  {
    title: "Beachfront Paradise",
    description: "Relax at the sandy beaches of Cancun.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Beach",
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
  },
  {
    title: "Luxury Penthouse LA",
    description: "City skyline views with luxury amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd"
    },
    price: 4000,
    location: "Los Angeles",
    country: "United States",
    category: "Luxury",
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
  },
  {
    title: "Hilltop Cabin",
    description: "Quiet mountain cabin with scenic views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
    },
    price: 900,
    location: "Manali",
    country: "India",
    category: "Mountain",
    geometry: { type: "Point", coordinates: [77.1892, 32.2432] }
  },
  {
    title: "City Studio Bangalore",
    description: "Compact modern studio in tech hub.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
    },
    price: 1300,
    location: "Bangalore",
    country: "India",
    category: "City",
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] }
  },
  {
  title: "Beach Shack Goa",
  description: "Relax in a cozy beach shack with sunset views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  price: 1800,
  location: "Goa",
  country: "India",
  category: "Beach",
  geometry: { type: "Point", coordinates: [73.8278, 15.4989] }
},

{
  title: "Luxury Desert Resort",
  description: "Experience royal luxury in the desert.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1518684079-3c830dcef090"
  },
  price: 5000,
  location: "Dubai",
  country: "UAE",
  category: "Luxury",
  geometry: { type: "Point", coordinates: [55.2708, 25.2048] }
},

{
  title: "Budget Hostel Mumbai",
  description: "Affordable stay in the heart of Mumbai.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5"
  },
  price: 600,
  location: "Mumbai",
  country: "India",
  category: "Budget",
  geometry: { type: "Point", coordinates: [72.8777, 19.0760] }
},

{
  title: "Camping Site Rishikesh",
  description: "Enjoy riverside camping with adventure sports.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
  },
  price: 900,
  location: "Rishikesh",
  country: "India",
  category: "Camping",
  geometry: { type: "Point", coordinates: [78.2676, 30.0869] }
},

{
  title: "Hill View Stay Ooty",
  description: "Stay with a beautiful tea garden view.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  price: 1200,
  location: "Ooty",
  country: "India",
  category: "Mountain",
  geometry: { type: "Point", coordinates: [76.6950, 11.4102] }
},

{
  title: "City Apartment Hyderabad",
  description: "Modern apartment near tech parks.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  price: 1400,
  location: "Hyderabad",
  country: "India",
  category: "City",
  geometry: { type: "Point", coordinates: [78.4867, 17.3850] }
},

{
  title: "Lake View Cottage Udaipur",
  description: "Romantic stay near lake with palace view.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
  },
  price: 2000,
  location: "Udaipur",
  country: "India",
  category: "Luxury",
  geometry: { type: "Point", coordinates: [73.7125, 24.5854] }
},

{
  title: "Treehouse Kerala",
  description: "Stay in a treehouse surrounded by forest.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7"
  },
  price: 1700,
  location: "Wayanad",
  country: "India",
  category: "Camping",
  geometry: { type: "Point", coordinates: [76.1320, 11.6854] }
},

{
  title: "Beach Resort Phuket",
  description: "Luxury beach resort with private pool.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210b3"
  },
  price: 3500,
  location: "Phuket",
  country: "Thailand",
  category: "Beach",
  geometry: { type: "Point", coordinates: [98.3381, 7.8804] }
},

{
  title: "Mountain Cabin Switzerland",
  description: "Snowy mountain retreat with stunning views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500534623283-312aade485b7"
  },
  price: 4500,
  location: "Zermatt",
  country: "Switzerland",
  category: "Mountain",
  geometry: { type: "Point", coordinates: [7.7491, 46.0207] }
}
];



 module.exports = { data: sampleListings };