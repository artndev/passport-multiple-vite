import passport from 'passport'
import db from '../db.js'
import localStrategies from './local_strategies.js'
import googleStrategies from './google_strategies.js'

passport.serializeUser((user, done) => {
  done(undefined, (user as IUser).id)
})

passport.deserializeUser((id, done) => {
  try {
    const user = db.users.find(user => user.id === id)
    if (!user) throw new Error('User is not found')

    done(undefined, user)
  } catch (err) {
    done(err, undefined)
  }
})

export default [...localStrategies, ...googleStrategies]
