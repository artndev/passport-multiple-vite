import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/login',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req, res) => {
    res.status(200).json({
      message: 'You have successfully logged in',
      answer: req.user,
    })
  }
)

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:3000/fallback',
    successReturnToOrRedirect: 'http://localhost:3000',
  })
)

export default router
