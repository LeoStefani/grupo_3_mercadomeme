const { check, validationResult, body } = require('express-validator');

let stringRegEx =  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
let numberRegEx = /^[0-9]+([,.][0-9]+)?$/g;


module.exports = [
    body("productEditName")
        .custom( value => {
            return (value.match(stringRegEx) && (value.length > 4) )
        })
        .withMessage("El nombre de producto debe tener al menos 5 caracteres y ser de tipo texto"),

    body("productEditPrice")
        .custom( value => {
            return (value.match(numberRegEx) && (value.length > 0) )
        })
        .withMessage("Debes ingresar un precio de producto numérico"),

    body("productEditDescription")
        .custom( value => {
            return ( (value.length > 19) && (value.length < 501) )
        })
        .withMessage("Debés ingresar una descripción del producto de entre 20 y 500 caracteres"),
    body("imgProduct0")
        .custom( (value, {req}) => {
            if (typeof req.files[0] != 'undefined') {
                if(typeof req.files[0].error != 'undefined') {
                    throw new Error('Solo puedes subir imágenes en formato jpeg, jpg, png o gif')
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }),
];

