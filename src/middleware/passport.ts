import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

passport.use(
    new JwtStrategy(options, async function (jwt_payload, done){

        try {
            if (jwt_payload) {
                return done(null, jwt_payload);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }

    })
);

export default passport;