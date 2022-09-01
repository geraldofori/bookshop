const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

//login endpoint 
app.post('/login',(req, res) => {
    User.findOne({email: req.body.email})
    .then((user) => {
        bcrypt.compare(req.body.password, user.password)
        .then((passwordCheck) => {
            if(!passwordCheck){
                return res.status(400).send({
                    message: "Passwords do not match",
                    error
                });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    userEmail: user.email
                },
                "RANDOM-TOKEN",
                {expiresIn: "24h"}
            );

            return res.status(200).send({
                message: "Login Successfull!",
                email: user.email,
                token
            });
        })
        .catch((e)=> {
            res.status(400).send({
                message: "Passwords do not match",
                e
            })
        })
    })
    .catch((e)=> {
        res.status(404).send({
            message: "Email not found",
            e,
          });

    });

});

// free endpoint
app.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
  });
  
  // authentication endpoint
  app.get("/auth-endpoint", (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  

module.exports = app;