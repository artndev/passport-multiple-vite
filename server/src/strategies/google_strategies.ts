import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import config from '../config.json' with { type: 'json' }
import { userController } from '../controllers/_controllers.js'

export default [
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: `${config.SERVER_URL}/api/google/callback`,
        passReqToCallback: true,
      },
      async (req, _accessToken, _refreshToken, profile, done) => {
        return await userController
          .AttachGoogleId({
            id: req.query?.state as string | undefined,
            googleId: profile.id,
          })
          .then(res => {
            return done(null, res.answer)
          })
          .catch(err => {
            console.log(err)

            return done(err, undefined)
          })
      }
    )
  ),
]
