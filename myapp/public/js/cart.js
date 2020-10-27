window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    //En los qsa, capturo todos los precios y cantidades sin importar cuantos productos tenga en el carrito.
    let fullCartItem = qsa("div.fullCartItem");
    let everyPrice = qsa("input.everyPrice");
    let everyTag = qsa("input.everyTag");
    let everyQty = qsa("input.everyQty");
    let plusButtons = qsa("button.plusButton");
    let minusButtons = qsa("button.minusButton");
    let deleteButtons = qsa("button.deleteButton");
    let finalPrice = qs("#finalPrice");
    let myButtonCart = qs("#myButtonCart");

    //Tags arrays, para el delete
    let tagsArray = Array.from(everyTag, element => Number(element.value));

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

    //Eliminador de productos
    deleteButtons.forEach((item, i) => {
        item.addEventListener('click', event => {
            Swal.fire({
                title: 'Eliminar producto',
                text: "Estás seguro que deseas eliminar este producto?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    'Este producto fue eliminado.',
                    'success'
                  );
                    //Cambio la clase para que no lo siga mostrando
                    fullCartItem[i].classList.remove('d-flex');
                    fullCartItem[i].classList.add('d-none');
                    //Cambio parametros para que no afecte mas al precio y recalculo precio
                    pricesArray[i] = 0;
                    qtysArray[i] = 0;
                    let totalPrice = pricesArray.reduce((a, b, i) => a + b*qtysArray[i], 0);
                    finalPrice.innerText = `Precio Final: $${totalPrice}`;
                    //lo elimino de localstorage para el proximo fetch
                    let cartStorage = JSON.parse(localStorage.getItem('cart'));
                    cartStorage = cartStorage.filter(e => e.tag != tagsArray[i]);
                    localStorage.setItem('cart', JSON.stringify(cartStorage));
                    //Cambio el numerito en el incono del carrito
                    myButtonCart.innerText = cartStorage.length;
                    if(cartStorage.length == 0) {
                        window.location.href = "/products/index";
                    };
                };
              });
        });
    });

});