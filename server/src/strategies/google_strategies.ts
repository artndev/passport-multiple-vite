import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from '../db.js'

export default [
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/google/callback',
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        try {
          // console.log(profile)
          const user = db.users.find(user => user.googleId === profile.id)
          if (!user) throw new Error('This user is not found')

          // request goes from client in linking process you are going to be authed via socials
          // add google id to user db
          // get id from response
          return done(null, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
]
