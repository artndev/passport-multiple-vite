import dotenv from 'dotenv'
dotenv.config()

import passport, { DoneCallback } from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from '../db.js'
import { Profile } from 'passport-github2'

export default [
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          // console.log(profile)
          const user = db.users.find(user => user.googleId === profile.id)
          if (!user) throw new Error('This user is not found')

          done(undefined, user)
        } catch (err) {
          done(err, undefined)
        }
      }
    )
  ),
]
