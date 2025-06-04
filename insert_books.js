// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Task 2: Basic CRUD Operations
// Sample book data
db.books.insertMany([
  {
    title: "Shadows of Soweto",
    author: "Naledi Khumalo",
    genre: "Historical Fiction",
    published_year: 2022,
    price: 180.00,
    in_stock: true,
    pages: 320,
    publisher: "Ubuntu Press"
  },
  {
    title: "Voices in the Karoo",
    author: "Thabo Mokoena",
    genre: "Literary Fiction",
    published_year: 2019,
    price: 150.00,
    in_stock: true,
    pages: 290,
    publisher: "Karoo Books"
  },
  {
    title: "The Township Code",
    author: "Ayanda Mthembu",
    genre: "Thriller",
    published_year: 2021,
    price: 200.00,
    in_stock: false,
    pages: 340,
    publisher: "Mzansi House"
  },
  {
    title: "Rain Over Table Mountain",
    author: "Sipho Ndlovu",
    genre: "Romance",
    published_year: 2020,
    price: 170.00,
    in_stock: true,
    pages: 310,
    publisher: "Cape Reads"
  },
  {
    title: "Ubuntu Rising",
    author: "Zanele Dlamini",
    genre: "Political Drama",
    published_year: 2023,
    price: 190.00,
    in_stock: true,
    pages: 365,
    publisher: "Mandela Literary Co."
  },
  {
    title: "Sheep Among Lions",
    author: "Kagiso Molefe",
    genre: "Mystery",
    published_year: 2018,
    price: 145.00,
    in_stock: false,
    pages: 280,
    publisher: "Jozi Stories"
  },
  {
    title: "Dust of Durban",
    author: "Lindiwe Majozi",
    genre: "Young Adult",
    published_year: 2021,
    price: 160.00,
    in_stock: true,
    pages: 300,
    publisher: "KwaZulu Reads"
  },
  {
    title: "Echoes from Robben Island",
    author: "Bongani Sithole",
    genre: "Biography",
    published_year: 2017,
    price: 210.00,
    in_stock: true,
    pages: 400,
    publisher: "Freedom Ink"
  },
  {
    title: "The Beadwork Diaries",
    author: "Nomvula Cele",
    genre: "Cultural Fiction",
    published_year: 2022,
    price: 175.00,
    in_stock: true,
    pages: 270,
    publisher: "Zulu Gold Publishers"
  },
  {
    title: "Hustle in Hillbrow",
    author: "Tshepo Lekganyane",
    genre: "Urban Fiction",
    published_year: 2020,
    price: 160.00,
    in_stock: false,
    pages: 350,
    publisher: "Egoli Press"
  }
]);

// Find books that are both in stock and published after 2010, with projection
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
);

// Sort books by price – ascending
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: 1 });

// Sort books by price – descending
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    _id: 0,
    title: 1,
    author: 1,
    price: 1
  }
).sort({ price: -1 });

//Pagination – 5 books per page using limit() and skip ()
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
)
.sort({ price: 1 })
.limit(5)
.skip(0); 

db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { _id: 0, title: 1, author: 1, price: 1 }
)
.sort({ price: 1 })
.limit(5)
.skip(5);

// Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      totalBooks: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      genre: "$_id",
      averagePrice: { $round: ["$averagePrice", 2] },
      totalBooks: 1
    }
  }
]);

// Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      author: "$_id",
      totalBooks: 1
    }
  }
]);

// Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      author: "$_id",
      totalBooks: 1
    }
  }
]);

// Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  },
  {
    $project: {
      _id: 0,
      decade: "$_id",
      totalBooks: 1
    }
  }
]);

//Create an index on the title field
db.books.createIndex({ title: 1 });

db.books.find({ title: "Shadows of Soweto" });

//Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

db.books.find({ author: "Naledi Khumalo" }).sort({ published_year: -1 });

// Use explain() to analyze query performance
db.books.find({ title: "Shadows of Soweto" }).explain("executionStats");
db.books.find({ title: "Shadows of Soweto" }).explain("executionStats");
