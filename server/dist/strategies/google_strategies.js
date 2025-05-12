import dotenv from 'dotenv';
import path from 'path';
import * as paths from '../paths.js';
const envPath = path.join(paths.__dirname, '../..', '.env');
dotenv.config({ path: envPath });
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config.json' with { type: 'json' };
import db from '../db.js';
export default [
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.SERVER_URL}/api/google/callback`,
        passReqToCallback: true,
    }, (req, _accessToken, _refreshToken, profile, done) => {
        try {
            // console.log(profile)
            // console.log(req.query.state)
            let user = db.users.find(user => user.googleId === profile.id);
            if (req.query.state) {
                const index = db.users.findIndex(user => user.id === Number(req.query.state));
                //console.log(index, db.users[index])
                if (index === -1)
                    throw new Error('This user is not found');
                db.users[index].googleId = profile.id;
                user = db.users[index];
            }
            if (!user)
                throw new Error('This user is not found');
            return done(null, user);
        }
        catch (err) {
            return done(err, undefined);
        }
    })),
];
