import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isUnauthenticated()) {
    res.status(401).json({
      message: 'You have not been authorized yet',
      answer: null,
    })
    return
  }

  next()
}

export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    res.status(403).json({
      message: 'You have already been authorized',
      answer: null,
    })
    return
  }

  next()
}
