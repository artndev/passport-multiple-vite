export const isAuthenticated = (req, res, next) => {
    if (req.isUnauthenticated()) {
        res.status(401).json({
            message: 'You have not been authorized yet',
            answer: null,
        });
        return;
    }
    next();
};
export const isNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(403).json({
            message: 'You have already been authorized',
            answer: null,
        });
        return;
    }
    next();
};
