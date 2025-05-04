import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import config from './config.json' with { type: 'json' }
import passport from 'passport'
import './strategies/local_strategy'

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

app.post('/api/auth', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200)
})

app.get('/api/auth/status', (req, res) => {
  if (!req.user) {
    res.sendStatus(401)
    return
  }

  res.send(req.user)
})

app.post('/api/auth/logout', (req, res) => {
  if (!req.user) {
    res.sendStatus(401)
    return
  }

  req.logout(err => {
    if (err) {
      res.sendStatus(400)
      return
    }

    res.sendStatus(200)
  })
})

const port = config.SERVER_PORT || 8000
app.listen(port, () => console.log(`Server listening on port ${port}`))
