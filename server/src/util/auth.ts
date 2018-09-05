import passport from "passport";
import {Strategy as LocalStrategy } from "passport-local";
import { USERNAME, PASSWORD } from "./secrets";

type User = {
  _id: number;
  username: string;
  password: string;
};

const user: User = {
  _id: 1,
  username: USERNAME,
  password: PASSWORD
};

passport.use("login", new LocalStrategy((username, password, done) => {
  if (username === user.username && password === user.password) {
    return done(undefined, user);
  }
  done(undefined, false);
}));

passport.serializeUser((user: User, done) => {
  done(undefined, user._id);
});

passport.deserializeUser((id, done) => {
  if (id === user._id) {
    return done(undefined, user);
  }
  done(undefined, false);
});

export default passport;


