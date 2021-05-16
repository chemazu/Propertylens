const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

module.exports = {
  registerHandler: async (req, res, next) => {
    const { name, email, password, accountType, craft } = req.body;
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
            const newUser = new User({
              name,
              email,
              password,
              accountType,
              craft,
            });
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    console.log(user);
                  })
                  .catch((err) => console.log(err));
              });
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
    console.log("logged In");
  },
};
