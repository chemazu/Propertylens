const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const app = express();
const PORT = process.env.PORT || PORT;

require("./config/passport")(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());

const db = process.env.mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongodb running"))
  .catch((err) => console.log("the error is", err));

app.use("/", require("./routes/routes"));
app.listen(PORT, () => {
  console.log("currently running on", PORT);
});
