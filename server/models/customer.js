const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      }
})

module.exports = mongoose.model.Customers || mongoose.model("Customer", CustomerSchema);