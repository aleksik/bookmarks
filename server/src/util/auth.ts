import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { USERNAME, AUTH_SECRET } from "./constants";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: AUTH_SECRET
};

export default new JwtStrategy(opts, (jwtPayload, done) => {
  if (jwtPayload.username === USERNAME) {
    return done(undefined, true);
  }
  return done(undefined, false);
});
