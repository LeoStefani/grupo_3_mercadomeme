const { check, validationResult, body } = require('express-validator');
const db = require("../database/models");

let stringRegEx =  /^[a-z\s]+$/i;
let numberRegEx = /^[0-9]+([,.][0-9]+)?$/g;


module.exports = [
    body("productNewName")
        .custom( value => {
            return (value.match(stringRegEx) && (value.length > 4) )
        })
        .withMessage("El nombre de producto debe tener al menos 5 caracteres y ser de tipo texto"),

    body("productNewPrice")
        .custom( value => {
            return (value.match(numberRegEx) && (value.length > 0) )
        })
        .withMessage("Debes ingresar un precio de producto numérico"),

    body("productNewDescription")
        .custom( value => {
            return ( (value.length > 19) && (value.length < 501) )
        })
        .withMessage("Debés ingresar una descripción del producto de entre 20 y 500 caracteres"),
    
    body("productNewDescription")
        .custom( value => {
            return ( (value.length > 19) && (value.length < 501) )
        })
        .withMessage("Debés ingresar una descripción del producto de entre 20 y 500 caracteres"),
    
    
];

