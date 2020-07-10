module.exports = {
    usersIndex: function (req,res,next) {
        res.send("Acá no se bien que va a ir, deberíamos esperar a ver que pasa con eso de session en clase");
    },
    register: function(req, res, next) {
        res.render('register');
    }
    
};