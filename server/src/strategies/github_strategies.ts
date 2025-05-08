import dotenv from 'dotenv'
dotenv.config()

import passport, { DoneCallback } from 'passport'
import { Strategy as GithubStrategy, Profile } from 'passport-github2'
import db from '../db.js'

export default [
  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/github/callback',
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: DoneCallback
      ) => {
        try {
          // console.log(profile)
          const user = db.users.find(user => user.githubId === profile.id)
          if (!user) throw new Error('This user is not found')

          return done(null, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
]
