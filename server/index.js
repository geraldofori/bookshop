const express = require("express");
const bcrypt = require("bcrypt");


const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel")

dbConnect();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});