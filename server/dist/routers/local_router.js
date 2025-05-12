import express from 'express';
import passport from 'passport';
import { isNotAuthenticated } from '../middlewares.js';
const router = express.Router();
router.post('/login', isNotAuthenticated, passport.authenticate('local-login'), (req, res) => {
    res.status(200).json({
        message: 'You have successfully logged in',
        answer: req.user,
    });
});
router.post('/register', isNotAuthenticated, passport.authenticate('local-register'), (req, res) => {
    res.status(200).json({
        message: 'You have successfully registered',
        answer: req.user,
    });
});
export default router;
