const { check, validationResult, body } = require('express-validator');

module.exports = [
    // check("credit_card_0")
    // .isCreditCard()
    // .withMessage("El número de tarjeta ingresado no es válido"),
    // check("dni")
    //     .isLength({ min: 8, max: 8 })
    //     .withMessage("El DNI debe tener 8 dígitos para ser válido."),
    body("dni")
        .custom(
            function (value) {
                if (value != undefined && value.length != 8) {
                    return false
                }
                return true;
            }
        )
        .withMessage("El DNI debe tener 8 dígitos para ser válido."),
        body("credit_card_0")
        .custom(
            function (value) {
                if (value != undefined && value.length != 16) {
                    return false
                }
                return true;
            }
        )
        .withMessage("El número de tarjeta debe tener 16 dígitos para ser válido."),
        body("credit_card_1")
        .custom(
            function (value) {
                if (value != undefined && value.length != 16) {
                    return false
                }
                return true;
            }
        )
        .withMessage("El número de tarjeta debe tener 16 dígitos para ser válido."),
        body("credit_card_2")
        .custom(
            function (value) {
                if (value != undefined && value.length != 16) {
                    return false
                }
                return true;
            }
        )
        .withMessage("El número de tarjeta debe tener 16 dígitos para ser válido."),
];