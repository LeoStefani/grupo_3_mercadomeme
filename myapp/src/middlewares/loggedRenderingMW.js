function loggedRenderingMw (req, res, next) {
        if(req.session.loggedUser) {
                res.locals.loggedUser = req.session.loggedUser;
                next()
        } else {
                res.locals.loggedUser = '';
                next();
        }
};

module.exports = loggedRenderingMw;