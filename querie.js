// Task 3: Advanced Queries
// find all books in a specific genre
db.books.find({ genre: "Young Adult" });

//Find books published after a certain year
db.books.find({ published_year: { $gt: 2021 } });

//Find books by a specific author
db.books.find({ author: "Ayanda Mthembu" });

// Update the price of a specific book
db.books.updateOne(
  { title: "Shadows of Soweto" },
  { $set: { price: 199.99 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "The Township Code" });