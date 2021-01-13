//requiring express and mongoose
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// configuring .env file
require("dotenv").config({ path: "./config/.env" });
const url = process.env.MONGO_URI;

// connecting to mongo database
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) =>
    err ? console.error(err.message) : console.log("Database is connected")
);

// importing user model
const User = require("./models/User");

// body parse middleware
app.use(express.json());

// GET :  RETURN ALL USERS
app.get("/allUsers", (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => console.error(err.message));
});

// POST :  ADD A NEW USER TO THE DATABASE
app.post("/addUser", (req, res) => {
  const { name, email, phone } = req.body;
  let newUser = new User({ name, email, phone });
  newUser
    .save()
    .then(() => res.json({ msg: "User added successfully!" }))
    .catch((err) => console.error(err.message));
});

// PUT : EDIT A USER BY ID
app.put("/editUser/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, (err) =>
    console.error(err)
  );
  User.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => console.error(err.message));
});

// DELETE : REMOVE A USER BY ID
app.delete("/deleteUser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "User has been deleted!" }))
    .catch((err) => console.error(err.message));
});

//setting up server
app.listen(5000, (err) =>
  err ? console.error(err.message) : console.log(`server is running on 5000`)
);
