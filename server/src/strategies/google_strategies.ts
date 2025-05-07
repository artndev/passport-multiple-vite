import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from '../db.js'

// REDIRECT TO LOCAL LOGIN PAGE WITH PARAMS SET WHERE IS EMAIL AND OTHER STUFF ARE DESCRIBED
// IN THE CALLBACK SET THE FAILURE REDIRECT TO REDIRECT TO LOCAL AUTH FORM
export default [
  passport.use(
    'google-login',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/google/login/callback',
        state: '',
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          const { email } = profile._json
          console.log(profile)

          const user = db.users.find(user => user.email === email)
          if (!user) throw new Error('User is not found')

          return done(undefined, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
  passport.use(
    'google-register',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/google/register/callback',
        state: '',
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          const { email } = profile._json

          const user = db.users.find(user => user.email === email)
          if (!user) throw new Error('User is not found')

          return done(undefined, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
]
