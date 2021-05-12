const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //MATCHING USER
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "email not registered" });
          }
          //MATCHING PASSWORD
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log("the error in verifying password is", err);
            }
            if (isMatch) {
              //   console.log("correct password");
              return done(null, user);
            } else {
              done(null, false, { message: "password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
