window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let addToCart = qs("#addToShopCart");
    
    addToCart.addEventListener('submit', event => {
        event.preventDefault();
        
        productToCart = {
            id: Number(document.documentURI.substring(document.documentURI.lastIndexOf('/') + 1)),
            color: qs('#selectedColor').value,
            size: qs('#selectedSize').value
        };

        let cart = [];
        
        let cartStorage = localStorage.getItem('cart');

        if(cartStorage != null) {
            cartStorage = JSON.parse(cartStorage);
            cartStorage.push(productToCart);
            localStorage.setItem('cart', JSON.stringify(cartStorage));
        } else {
            cart.push(productToCart);
            localStorage.setItem('cart', JSON.stringify(cart));
        }; 

        alert('Producto agregado con éxito!!');
       
    });
    
});