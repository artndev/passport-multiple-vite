import express from 'express'
import passport from 'passport'

const router = express.Router()

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  res.status(200).json({
    message: 'You have successfully logged in',
    answer: req.user,
  })
})

router.post(
  '/register',
  passport.authenticate('local-register'),
  (req, res) => {
    res.status(200).json({
      message: 'You have successfully registered',
      answer: req.user,
    })
  }
)

export default router
