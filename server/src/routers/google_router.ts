import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/login',
  passport.authenticate('google-login', { scope: ['email', 'profile'] }),
  (req, res) => {
    res.status(200).json({
      message: 'You have successfully logged in',
      answer: req.user,
    })
  }
)

router.get(
  '/login/callback',
  passport.authenticate('google-login', {
    failureRedirect: 'http://localhost:3000/google-fallback',
    successRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    if (!req.user) return

    console.log(req.user)
  }
)

router.get(
  '/register/callback',
  passport.authenticate('google-register', {
    successReturnToOrRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/google-fallback',
  })
)

export default router
