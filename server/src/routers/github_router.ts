import express from 'express'
import passport from 'passport'
import config from '../config.json' with { type: 'json' }

const router = express.Router()

router.get('/login', (req, res, next) => {
  return passport.authenticate('github', {
    scope: ['profile', 'email'],
    state: req.query.id as string | undefined,
  })(req, res, next)
})

router.get('/callback', (req, res, next) => {
  return passport.authenticate(
    'github',
    {
      successReturnToOrRedirect: `${config.CLIENT_URL}/register`,
      failureRedirect: `${config.CLIENT_URL}`,
    },
    (err: Error | null) => {
      if (err) return res.redirect(`${config.CLIENT_URL}/register`)

      return res.redirect(`${config.CLIENT_URL}`)
    }
  )(req, res, next)
})

export default router
