window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let shopCartIcon = qs("#shopCartIcon");
    
    
    shopCartIcon.addEventListener('click', event => {
        event.preventDefault();
        // Hacer el fetch y pasarle todo lo de localStorage
        // productToCart = {
        //     id: document.documentURI.substring(document.documentURI.lastIndexOf('/') + 1),
        //     color: qs('#selectedColor').value,
        //     size: qs('#selectedSize').value
        // }
        // console.log(productToCart);
        // alert('Clickeaste el carrito');

        let data = localStorage;


        fetch(shopCartIcon.href, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }}).then(function(response) {
                return response.json();
            })
        
        
        // location.href = shopCartIcon.href;


    })
    
    
    });