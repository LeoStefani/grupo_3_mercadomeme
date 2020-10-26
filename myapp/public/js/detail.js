window.addEventListener("load", function () {

    let qs = element => { return document.querySelector(element) };
    let qsa = element => { return document.querySelectorAll(element) };

    let addToCart = qs("#addToShopCart");
    let myButtonCart = qs("#myButtonCart");
    let buttonUp = qs("#buttonUp");
    let buttonDown = qs("#buttonDown");
    let buttonLeft = qs("#buttonLeft");
    let buttonRight = qs("#buttonRight");
    let buttonPlus = qs("#buttonPlus");
    let buttonMinus = qs("#buttonMinus");
    let memePreview = qs("img#memePreview")

    let initialLeft = 50;
    let initialTop = 50;
    let initialWidth = 50;
    let initialHeight = 50;


    buttonUp.addEventListener("click", function (event) {
        initialTop -= 2
        if (initialTop > 0) { memePreview.style.top = initialTop + "%" }
        else { initialTop = 0 }
    })

    buttonDown.addEventListener("click", function (event) {
        initialTop += 2
        if (initialTop < 100) { memePreview.style.top = initialTop + "%" }
        else { initialTop = 100 }

        upperText.style.top = upperTextInitialPosition + "%"
    })

    buttonLeft.addEventListener("click", function (event) {
        initialLeft -= 2
        if (initialLeft > 30) { memePreview.style.left = initialLeft + "%" }
        else { initialLeft = 30 }
    })

    buttonRight.addEventListener("click", function (event) {
        initialLeft += 2
        if (initialLeft < 70) { memePreview.style.left = initialLeft + "%" }
        else { initialLeft = 70 }
    })

    buttonPlus.addEventListener("click", function (event) {
        initialWidth += 2;
        initialHeight += 2;
        if (initialWidth < 100) {
            memePreview.style.width = initialWidth + "%";
            memePreview.style.height = initialHeight + "%";
        }
        else {
            initialWidth = 100;
            initialHeight = 100
        }
    })

    buttonMinus.addEventListener("click", function (event) {
        initialWidth -=2;
        initialHeight -= 2;

        if (initialWidth > 0) {
            memePreview.style.width = initialWidth + "%";
            memePreview.style.height = initialHeight + "%"
        }
        else {
            initialWidth = 0;
            initialHeight = 0
        }
    })


    addToCart.addEventListener('submit', event => {
        event.preventDefault();

        let dateTag = { tag: Date.now() };

        fetch('/memes/rename', {
            method: 'POST',
            body: JSON.stringify(dateTag),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function (response) {
            // console.log('11');
            console.log(response);
        }).then(function (info) {
            productToCart = {
                id: Number(document.documentURI.substring(document.documentURI.lastIndexOf('/') + 1)),
                color: qs('#selectedColor').value,
                size: qs('#selectedSize').value,
                meme: "memeUser" + dateTag.tag + ".png",
                tag: dateTag.tag
            }
            let cart = [];

            let cartStorage = localStorage.getItem('cart');

            if (cartStorage != null) {
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
            }).then(results => {
                window.location.href = "/products/index";
            });
        }).catch(function (error) {
            // console.log('33');
            console.log(error);
        });

    });

});