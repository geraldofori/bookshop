const mongoose = require("mongoose");

const BookModelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book has no title"],
        unique: [true, "Book already exists"]
    },
    author: {
        type: String,
        required: [true, "Book has no author"],
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    price: {
        type: Number,
        required: [true, "Book has no price"],
        unique: false
    },
    quantity: {
        type: Number,
        required: false,
        unique: false
    },
    status : {
        type: String,
        required: true,
        unique: false
    }
    
});

module.exports = mongoose.model.Books || mongoose.model("Book", bookSchema);