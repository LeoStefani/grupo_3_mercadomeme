function authMiddleware (req, res, next) {
        if(req.session.loggedUser) {
                next()
        } else {
                res.redirect('/users/login');
        }
};

module.exports = authMiddleware;