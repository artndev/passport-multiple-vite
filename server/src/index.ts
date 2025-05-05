import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import config from './config.json' with { type: 'json' }
import passport from 'passport'
import './strategies/local_strategies'

const app = express()
app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// app.use((_, res, next) => {
//   res.append('Access-Control-Allow-Headers', '*')
//   next()
// })

app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 3600000, // 1h
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.post('/api/login', passport.authenticate('local-login'), (_, res) => {
  res.status(200).json({
    message: 'You have successfully logged in',
    answer: true,
  })
})

app.post('/api/register', passport.authenticate('local-register'), (_, res) => {
  res.status(200).json({
    message: 'You have successfully registered',
    answer: true,
  })
})

app.get('/api/auth/status', (req, res) => {
  if (!req.user) {
    res.status(401).json({
      message: 'You are not authorized',
      answer: true,
    })
    return
  }

  res.status(200).json({
    message: 'You are authorized',
    answer: req.user,
  })
})

app.post('/api/auth/logout', (req, res) => {
  if (!req.user) {
    res.status(401).json({
      message: 'You are not authorized',
      answer: true,
    })
    return
  }

  req.logout(err => {
    if (err) {
      res.status(500).json({
        message: 'Server is not responding',
        answer: null,
      })
      return
    }

    res.status(200).json({
      message: 'You have successfully logged out',
      answer: true,
    })
  })
})

const port = config.SERVER_PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))
