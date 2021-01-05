const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField : "email" }, (email, password, done) => {
      
      User.findOne({
        email: email,
      })
        .then((user) => {
          if (!user) {
            console.log("Email incorrect");
            return done(null, false, { "message": "no user found" });
          } else {    
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                console.log("Matched");
                return done(null, user);
              } else {
                console.log("Password incorrect");
                return done(null, false, { "message": "Password not matched" });
              }
            });
          }
        })
        .catch((err) => {
          console.log("Error");
          console.log(err);
        });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        //console.log(user);
      done(err, user);
    });
  });
};
