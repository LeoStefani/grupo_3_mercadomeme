const db = require("../database/models");


function cookieMW (req,res,next) {

// Si existe cookie y si no hay session iniciada
    if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
    
    db.User.findByPk(req.cookies.rememberMe)
    .then(function(user){
        req.session.loggedUser = user.dataValues;
    }
    )
    .catch(function(error){
    })}

    setTimeout(next,100);
};
module.exports = cookieMW