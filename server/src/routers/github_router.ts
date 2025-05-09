import express from 'express'
import passport from 'passport'
import config from '../config.json' with { type: 'json' }
import { isNotAuthenticated } from '../middlewares'

const router = express.Router()

router.get('/login', isNotAuthenticated, (req, res, next) => {
  return passport.authenticate('github', {
    scope: ['profile', 'email'],
    state: req.query.id as string | undefined,
  })(req, res, next)
})

router.get('/callback', (req, res, next) => {
  return passport.authenticate(
    'github',
    {
      failureRedirect: `${config.CLIENT_URL}/fallback`,
    },
    (
      err: Error | null | unknown,
      user: Express.User | false,
      _info: object
    ) => {
      if (err) return res.redirect(`${config.CLIENT_URL}/register`)
      if (!user) return res.redirect(`${config.CLIENT_URL}/fallback`)

      req.logIn(user, err2 => {
        if (err2) return res.redirect(`${config.CLIENT_URL}/fallback`)

        return res.redirect(`${config.CLIENT_URL}`)
      })
    }
  )(req, res, next)
})

export default router
