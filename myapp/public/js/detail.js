window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let addToCart = qs("#addToShopCart");
    
    function allStorage() {
        let values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while ( i-- ) {
            values.push( JSON.parse(localStorage.getItem(keys[i])) );
        }
        return values;
    };

    addToCart.addEventListener('submit', event => {
        event.preventDefault();
        productToCart = {
            id: document.documentURI.substring(document.documentURI.lastIndexOf('/') + 1),
            color: qs('#selectedColor').value,
            size: qs('#selectedSize').value
        }
        // console.log(productToCart); 
        localStorage.setItem('addedProduct' + productToCart.id ,JSON.stringify(productToCart));
        alert('Producto agregado con éxito!!');
        console.log(alert);
        let items = allStorage(localStorage);
        // console.log(localStorage);
        console.log(items);
        // localStorage.clear();
    })
    
    
    });