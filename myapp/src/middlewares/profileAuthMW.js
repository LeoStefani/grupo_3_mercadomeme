function profileAuthMW (req, res, next) {
    if(req.session.loggedUser.id == req.params.userId) {
            next()
    } else {
            res.redirect('/');
    }
};

module.exports = profileAuthMW;