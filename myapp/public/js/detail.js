window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let addToCart = qs("#addToShopCart");
    let myButtonCart = qs("#myButtonCart");
    
    addToCart.addEventListener('submit', event => {
        event.preventDefault();
        
        productToCart = {
            id: Number(document.documentURI.substring(document.documentURI.lastIndexOf('/') + 1)),
            color: qs('#selectedColor').value,
            size: qs('#selectedSize').value,
        };

        let cart = [];
        
        let cartStorage = localStorage.getItem('cart');

        if(cartStorage != null) {
            cartStorage = JSON.parse(cartStorage);
            cartStorage.push(productToCart);
            localStorage.setItem('cart', JSON.stringify(cartStorage));
            myButtonCart.innerText = cartStorage.length;

        } else {
            cart.push(productToCart);
            localStorage.setItem('cart', JSON.stringify(cart));
            myButtonCart.innerText = cart.length;
        };
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado con éxito!!',
            showConfirmButton: false,
            timer: 1500
          }).then( results => {
                window.location.href = "/products/index";
          })
          
    });
    
});