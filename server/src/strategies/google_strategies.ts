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
          // console.log(req.query.state)
          let user = db.users.find(user => user.googleId === profile.id)
          if (req.query.state) {
            const index = db.users.findIndex(
              user => user.id === Number(req.query.state)
            )

            //console.log(index, db.users[index])
            if (index === -1) throw new Error('This user is not found')

            db.users[index]!.googleId = profile.id
            user = db.users[index]
          }

          if (!user) throw new Error('This user is not found')

          return done(null, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
]
