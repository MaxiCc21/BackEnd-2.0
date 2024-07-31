const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const UserModel = require("../models/user.model");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const cookieExtrator = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCoder"];
  }
  return token;
};
const optionsJWT = {};

optionsJWT.jwtFromRequest = ExtractJWT.fromExtractors([cookieExtrator]);
//!! Token secreto
optionsJWT.secretOrKey = "llave";

const initPassportJWT = () => {
  passport.use(
    "jwt",
    new JWTStrategy(optionsJWT, async (jwt_payload, done) => {
      try {
        done(null, jwt_payload);
      } catch (err) {
        return done(err);
      }
    })
  );
};

passport.use(
  new JwtStrategy(optionsJWT, (jwt_payload, done) => {
    UserModel.findById(jwt_payload.id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  let user = await UserModel.findOne({ _id: id });
  done(null, user);
});

module.exports = passport;
