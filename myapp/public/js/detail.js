window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let addToCart = qs("#addToShopCart");
    
    addToCart.addEventListener('submit', event => {
        event.preventDefault();
        let dateTag = {tag: Date.now()};

        fetch('/memes/rename', {
            method: 'POST',
            body: JSON.stringify(dateTag),
            headers: {
                'Content-Type' : 'application/json'
                },
            }).then(function(response) {
                // console.log('11');
                console.log(response);
                // location.href = shopCartIcon.href;
            }).then(function(info){
                productToCart = {
                    id: document.documentURI.substring(document.documentURI.lastIndexOf('/') + 1),
                    color: qs('#selectedColor').value,
                    size: qs('#selectedSize').value,
                    meme: "memeUser"+dateTag.tag+".png",
                }
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
            //     console.log('22');
            //     console.log(info);
            }).catch(function (error) {
                // console.log('33');
                console.log(error);
            });
        



        // let items = allStorage(localStorage);
       
    });
    
});