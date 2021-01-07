const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

/*module.exports = function (passport) {
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
*/

var GoogleStrategy = require('passport-google-oauth20').Strategy;
module.exports=function(passport){  
  passport.use(new GoogleStrategy({
    clientID: require('./keys').googleClientID,
    clientSecret: require('./keys').googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile);
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    */

      User.findOne({googleId:profile.id})
        .then(user=>{
          if(user){
            cd(null,user )
          }
          else{
            const newUser={
              googleId:profile.id,
              email:profile.emails[0].value,
              name:profile.displayName,
              password:"1234",
            }
           new User(newUser).save()
            .then(user=>{
              cb(null,user)
            })
            .catch(err=>{
              console.log(err);
            })
          }
        })
        .catch(err=>{
          console.log(err)
        })

  }
));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      //console.log(user);
    done(err, user);
  });
});
}
