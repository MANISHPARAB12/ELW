const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        author: String,
        category: String,
        price: String,
        rating: Number,
        language: String,
        stock: Number,
        image: String,
        description: String
    },
    {
        collection: "books"
    }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;