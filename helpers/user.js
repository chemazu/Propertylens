const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
  registerHandler: async (req, res, next) => {
    const { name, email, password, accountType } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    let errors = [];

    if (!name || !email || !password) {
      errors.push({ msg: "Please fill all the fields" });
      res.status(200).json(errors);
    }
    if (password.length < 8) {
      errors.push({ msg: "password should be more than 8 characters" });
    }
    if (errors.length > 0) {
      res.status(200).json(errors);
    } else {
      try {
        await User.findOne({ email: email }).then((user) => {
          if (user) {
            errors.push({ msg: "Email already Linked to an account" });
            res.status(200).json(errors);
          } else {
            const newUSer = new User({
              name,
              email,
              password: hashedpassword,
              accountType,
            });
            newUSer.save().then((user) => {
              res.status(200).json("user sucessfully added");
              console.log(user);
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    next();
  },
  loginHandler: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  },
};

const User = require("../models/user.model");
