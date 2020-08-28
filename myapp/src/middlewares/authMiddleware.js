function authMiddleware (req, res, next) {
        if(req.session.loggedUser != undefined) {
                next()
        } else {
                res.redirect('/users/login');
        }
};

module.exports = authMiddleware;