const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
    craft: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
