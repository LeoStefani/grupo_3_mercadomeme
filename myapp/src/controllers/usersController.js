const fs = require('fs');
const path = require('path');

let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'));


module.exports = {
    usersIndex: function (req,res,next) {
        res.send("Acá no se bien que va a ir, deberíamos esperar a ver que pasa con eso de session en clase");
    },
    register: function(req,res,next) {
        res.render('register', { title: "Registro" });
    },
    cart: function (req,res,next) {
        res.render("cart", { title: "Carrito" });
    }
};