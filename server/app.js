const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const auth = require('./auth');
const routes = require('./routes/routes');

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConnect = require("./db/dbConnect");
const Customer = require("./db/models/customer");

dbConnect();

app.use('/api', routes);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

//register endpoint 
app.post('/register', (req,res) => {
  bcrypt
  .hash(req.body.password, 10)
  .then((hashedPassword) => {
    const customer = new Customer({
      email: req.body.email,
      password: hashedPassword
    });

    customer.save().then((result) => {
      res.status(201).send({
        message: "Customer created Successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating customer",
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
    Customer.findOne({email: req.body.email})
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
                    customer_id: customer._id,
                    customer_email: customer.email
                },
                "RANDOM-TOKEN",
                {expiresIn: "24h"}
            );

            return res.status(200).send({
                message: "Login Successfull!",
                email: customer.email,
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
  app.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
  });
  

// SERVE SETUP
  const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  
  const port = normalizePort(process.env.PORT || '3001');
  app.set('port', port);

module.exports = app;