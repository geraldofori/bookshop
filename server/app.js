const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel")

dbConnect();

//register endpoint 
app.post('/register', (req,res) => {
  bcrypt
  .hash(req.body.password, 10)
  .then((hashedPassword) => {
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });

    user.save().then((result) => {
      res.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    });

  })
  .catch((e) => {
    res.status(500).send({
      message: "Password was not hashed succesfully",
      e
    });

  });

});

module.exports = app;