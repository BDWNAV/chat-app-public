const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userSchema = require("../db/user");
const { url, devMode } = require("../app");

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const userDetails = await userSchema.findById(id);

    return done(null, userDetails);
  } catch (error) {
    console.log(error)
    return done(error, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3001/api/auth/google/redirect",
  scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {

  const userCheck = await userSchema.exists({ googleId: profile.id });

  try {
    if(userCheck) {
      const updatedUser = await userSchema.findOneAndUpdate({ googleId: profile.id  }, {
        email: profile.emails[0].value,
        displayName: profile.displayName,
        profileUrl: profile.photos[0].value
      });
  
      return done(null, updatedUser);
    } else {
      const newUser = await userSchema.create({
        email: profile.emails[0].value,
        googleId: profile.id,
        displayName: profile.displayName,
        profileUrl: profile.photos[0].value
      })
  
      newUser.save();
  
      return done(null, newUser);
    }
  } catch (error) {
    console.error(error);
    return done(null, error);
  }
}))