const fs = require('fs');
const path = require('path');

// Aca lee los usuarios del JSON. Si no llega a existir ningun usuario, lo inicializa vacio.
let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users;
if (usersJSON == "") {
            users=[];
            }else{
            users = JSON.parse(usersJSON)};
// Aca lee los usuarios del JSON. Si no llega a existir ningun usuario, lo inicializa vacio.

function cookieMW (req,res,next) {
// Si existe cookie y si no hay session iniciada
    if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
// Recorre los usuarios y se fija si el email de cada usuario coincide con el almacenado en la cookie.
//  La cookie esta configurada para solo almacenar el email del usuario loggeado.
// Cuando encuentra el usuario, lo guarda en userToLogin. Luego del for, guarda los datos del userToLogin en el loggedUser de la session.
        for (let i=0; i<users.length;i++) {   
            if (users[i].email == req.cookies.rememberMe) {
                userToLogin = users[i];
                    break;  
            }               
        }
        req.session.loggedUser = userToLogin;
    }
next();
};
module.exports = cookieMW;