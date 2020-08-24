const { check, validationResult, body } = require('express-validator');

module.exports = [
    body("firstName")
    .custom(
        function (value) {
            if (value != undefined && value.length > 70) {
                return false
            }
            return true;
        }
    )
    .withMessage("El nombre admite un máximo de 70 caracteres."),
    body("lastName")
    .custom(
        function (value) {
            if (value != undefined && value.length > 70) {
                return false
            }
            return true;
        }
    )
    .withMessage("El apellido admite un máximo de 70 caracteres."),
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

                if (value != undefined && value != "") {


            let ultimo = value.slice(-1);
            let primeros = value.slice(0,-1);
            
            let splitReverse = primeros.split("").reverse();
             
            for (let i=0; i<splitReverse.length; i++) {
            
                if (i%2==0) {          
                    splitReverse[i] = splitReverse[i]*2 ;           
                    if (splitReverse[i]>=9) {
                        splitReverse[i] = splitReverse[i] - 9;
                    }         
                }
            }
            
            let suma = 0           
            for (let i=0; i<splitReverse.length; i++) {          
                suma += parseFloat(splitReverse[i]);           
            }
          
            if (suma%10 == 10 - parseFloat(ultimo)) {    
                return true;
            }else {
                return false;
            }}
            else{ return true}

            }
        )
        .withMessage("El número de tarjeta no es válido."),
        body("credit_card_1")
        .custom(
            function (value) {

                // solo si no viene vacio
                if (value != undefined && value != "") {

                let ultimo = value.slice(-1);
                let primeros = value.slice(0,-1);
                
                let splitReverse = primeros.split("").reverse();
                 
                for (let i=0; i<splitReverse.length; i++) {
                
                    if (i%2==0) {          
                        splitReverse[i] = splitReverse[i]*2 ;           
                        if (splitReverse[i]>=9) {
                            splitReverse[i] = splitReverse[i] - 9;
                        }         
                    }
                }
                
                let suma = 0           
                for (let i=0; i<splitReverse.length; i++) {          
                    suma += parseFloat(splitReverse[i]);           
                }
              
                if (suma%10 == 10 - parseFloat(ultimo)) {    
                    return true;
                }else {
                    return false;
                }}
                else{ return true}
                
    
                }
            )
        .withMessage("El número de tarjeta no es válido."),
        body("credit_card_2")
        .custom(
            function (value) {

                if (value != undefined && value != "") {
                let ultimo = value.slice(-1);
                let primeros = value.slice(0,-1);
                
                let splitReverse = primeros.split("").reverse();
                 
                for (let i=0; i<splitReverse.length; i++) {
                
                    if (i%2==0) {          
                        splitReverse[i] = splitReverse[i]*2 ;           
                        if (splitReverse[i]>=9) {
                            splitReverse[i] = splitReverse[i] - 9;
                        }         
                    }
                }
                
                let suma = 0           
                for (let i=0; i<splitReverse.length; i++) {          
                    suma += parseFloat(splitReverse[i]);           
                }
            
                if (suma%10 == 10 - parseFloat(ultimo)) {    
                    return true;
                }else {
                    return false;
                }}
                else{ return true}
    
                }
            )
        .withMessage("El número de tarjeta no es válido"),
];