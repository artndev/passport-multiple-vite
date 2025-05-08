import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import db from '../db.js'

export default [
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        try {
          const user = db.users.find(
            user => user.username === username || user.email === username
          )
          if (!user) throw new Error('This user is not found')
          if (user.password !== password)
            throw new Error('Your credentials are invalid')

          return done(null, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
  passport.use(
    'local-register',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        try {
          const isUsername = db.users.find(user => user.username === username)
          if (isUsername)
            throw new Error('This username has already been taken')

          const isEmail = db.users.find(user => user.email === req.body.email)
          if (isEmail) throw new Error('This email has already been taken')

          const user = {
            id: db.users.length + 1,
            username: username,
            password: password,
            email: req.body.email,
            googleId: '',
            githubId: '',
          }
          db.users.push(user)

          return done(null, user)
        } catch (err) {
          return done(err, undefined)
        }
      }
    )
  ),
]
