//requireing mongoose
const mongoose = require("mongoose");

//creating schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
});

//exporting model
module.exports = User = mongoose.model("user", userSchema);
