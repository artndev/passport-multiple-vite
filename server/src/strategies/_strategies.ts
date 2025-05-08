import passport from 'passport'
import db from '../db.js'
import localStrategies from './local_strategies.js'
import googleStrategies from './google_strategies.js'
import githubStrategies from './github_strategies.js'

passport.serializeUser((user, done) => {
  return done(undefined, (user as IUser).id)
})

passport.deserializeUser((id, done) => {
  try {
    const user = db.users.find(user => user.id === id)
    if (!user) throw new Error('Current user is not found')

    return done(undefined, user)
  } catch (err) {
    return done(err, undefined)
  }
})

export default [...localStrategies, ...googleStrategies, ...githubStrategies]
