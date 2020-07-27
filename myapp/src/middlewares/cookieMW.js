const fs = require('fs');
const path = require('path');

let usersJSON = fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8');
let users;
if (usersJSON == "") {
            users=[];
            }else{
            users = JSON.parse(usersJSON)}; 

function cookieMW (req,res,next) {

    if (req.cookies.rememberMe != undefined && req.session.loggedUser == undefined) {
console.log(req.cookies.rememberMe);
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