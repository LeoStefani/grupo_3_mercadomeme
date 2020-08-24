const { slice } = require("./profileValidations");

let tarjeta = 5547302373315927;

console.log(tarjeta.toString().split('')[0])
    
// let ultimo = tarjeta.slice(-1);
// let primeros = tarjeta.slice(0,-1);

// let splitReverse = primeros.split("").reverse();

// console.log(splitReverse);


// for (let i=0; i<splitReverse.length; i++) {

//     if (i%2==0) {

//         splitReverse[i] = splitReverse[i]*2 ;

//         if (splitReverse[i]>=9) {
//             splitReverse[i] = splitReverse[i] - 9;
//         }

//     }
// }

// let suma = 0

// for (let i=0; i<splitReverse.length; i++) {

//     suma += parseFloat(splitReverse[i]);


// }
// console.log(ultimo);
// console.log(primeros);
// console.log(splitReverse);
// console.log(suma);

// if (suma%10 == 10 - parseFloat(ultimo)) {

//     console.log("cumple perfecto");
// }else {
//     console.log("no cumple");
// }





