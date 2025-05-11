import dotenv from 'dotenv'
import path from 'path'
import * as pathes from '../pathes.js'
const envPath = path.join(pathes.__dirname, '../..', '.env')
dotenv.config({ path: envPath })

import { Request } from 'express'
import passport from 'passport'
import { Strategy as GithubStrategy, Profile } from 'passport-github2'
import { VerifyCallback } from 'passport-google-oauth20'
import config from '../config.json' with { type: 'json' }
import db from '../db.js'

export default [
  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: `${config.SERVER_URL}/api/github/callback`,
        passReqToCallback: true,
      },
      (
        req: Request,
        _accessToken: string,
        _refreshToken: string | undefined,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          // console.log(profile)
          // console.log(req.query.state)
          let user = db.users.find(user => user.githubId === profile.id)
          if (req.query.state) {
            const index = db.users.findIndex(
              user => user.id === Number(req.query.state)
            )

            //console.log(index, db.users[index])
            if (index === -1) throw new Error('This user is not found')

            db.users[index]!.githubId = profile.id
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
