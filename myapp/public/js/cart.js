window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    //En los qsa, capturo todos los precios y cantidades sin importar cuantos productos tenga en el carrito.
    let everyPrice = qsa("input.everyPrice");
    let everyQty = qsa("input.everyQty");
    let plusButtons = qsa("button.plusButton");
    let minusButtons = qsa("button.minusButton");
    let finalPrice = qs("#finalPrice");

    //Para usar reduce tengo que hacer del nodelist una array con los values.
    let pricesArray = Array.from(everyPrice, element => Number(element.value));
    let qtysArray = Array.from(everyQty, element => parseInt(element.value));
    //Ahora puedo hacer un reduce, pero multiplicando el precio por la cantidad haciendo uso del indicador "i", considerando que siempre tendremos un precio para una cantidad.
    let totalPrice = pricesArray.reduce((a, b, i) => a + b*qtysArray[i], 0);

    finalPrice.innerText = `Precio Final: $${totalPrice}`;


    //Aca hago eventos onChange para cada input de cantidad, y vuelvo a calcular el precio final.
    everyQty.forEach(item => {
        item.addEventListener('change', event => {
            let qtysArray = Array.from(everyQty, element => parseInt(element.value));
            let totalPrice = pricesArray.reduce((a, b, i) => a + b*qtysArray[i], 0);

            finalPrice.innerText = `Precio Final: $${totalPrice}`;
        });
    });


    plusButtons.forEach((item, i) => {
        item.addEventListener('click', event => {
            everyQty[i].value++;
            let qtysArray = Array.from(everyQty, element => parseInt(element.value));
            let totalPrice = pricesArray.reduce((a, b, i) => a + b*qtysArray[i], 0);

            finalPrice.innerText = `Precio Final: $${totalPrice}`;
        });
    });

    minusButtons.forEach((item, i) => {
        item.addEventListener('click', event => {
            if(everyQty[i].value>1) {
                everyQty[i].value--;
                let qtysArray = Array.from(everyQty, element => parseInt(element.value));
                let totalPrice = pricesArray.reduce((a, b, i) => a + b*qtysArray[i], 0);
                finalPrice.innerText = `Precio Final: $${totalPrice}`;
            } else {
                everyQty[i].value = 1;
            }

        });
    });

});